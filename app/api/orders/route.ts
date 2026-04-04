import sql from "@/lib/db";

type OrderItemPayload = {
  menuItemId: string;
  quantity: number;
};

type OrderPayload = {
  tableNumber: number;
  items: OrderItemPayload[];
};

export async function POST(request: Request) {
  let body: OrderPayload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "不正なリクエストです" }, { status: 400 });
  }

  const { tableNumber, items } = body;

  if (!tableNumber || !Array.isArray(items) || items.length === 0) {
    return Response.json(
      { error: "卓番号と注文内容を指定してください" },
      { status: 400 }
    );
  }

  for (const item of items) {
    if (!item.menuItemId || !item.quantity || item.quantity < 1) {
      return Response.json(
        { error: "注文内容が不正です" },
        { status: 400 }
      );
    }
  }

  // DB から正しい価格と品切れ状態を取得
  const menuItemIds = items.map((i) => i.menuItemId);
  const dbItems = await sql`
    SELECT id, name, price, is_sold_out
    FROM menu_items
    WHERE id = ANY(${menuItemIds})
  `;

  // 存在チェック
  if (dbItems.length !== menuItemIds.length) {
    return Response.json(
      { error: "存在しないメニューが含まれています" },
      { status: 400 }
    );
  }

  // 品切れチェック
  const soldOutItem = dbItems.find((d) => d.is_sold_out);
  if (soldOutItem) {
    return Response.json(
      { error: `「${soldOutItem.name}」は現在品切れです` },
      { status: 400 }
    );
  }

  // DB の価格で合計を計算（クライアントの価格を信用しない）
  const dbItemMap = new Map(dbItems.map((d) => [d.id, d]));
  const totalPrice = items.reduce((sum, i) => {
    const dbItem = dbItemMap.get(i.menuItemId)!;
    return sum + dbItem.price * i.quantity;
  }, 0);

  // トランザクションで注文を保存
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = await sql.begin(async (tx: any) => {
    const [order] = await tx`
      INSERT INTO orders (table_number, total_price)
      VALUES (${tableNumber}, ${totalPrice})
      RETURNING id, created_at
    `;

    for (const item of items) {
      const dbItem = dbItemMap.get(item.menuItemId)!;
      await tx`
        INSERT INTO order_items (order_id, menu_item_id, menu_item_name, price, quantity)
        VALUES (${order.id}, ${dbItem.id}, ${dbItem.name}, ${dbItem.price}, ${item.quantity})
      `;
    }

    return order;
  });

  return Response.json({
    orderId: result.id,
    totalPrice,
    createdAt: result.created_at,
  });
}
