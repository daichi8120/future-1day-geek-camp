import sql from "@/lib/db";

type OrderItemPayload = {
  menuItemId: string;
  quantity: number;
};

type OrderPayload = {
  tableNumber: number;
  items: OrderItemPayload[];
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tableNumber = searchParams.get("table");

  let orders;
  if (tableNumber) {
    orders = await sql`
      SELECT o.id, o.table_number, o.total_price, o.status, o.created_at,
        json_agg(json_build_object(
          'menuItemName', oi.menu_item_name,
          'price', oi.price,
          'quantity', oi.quantity
        )) as items
      FROM orders o
      JOIN order_items oi ON oi.order_id = o.id
      WHERE o.table_number = ${parseInt(tableNumber, 10)}
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `;
  } else {
    orders = await sql`
      SELECT o.id, o.table_number, o.total_price, o.status, o.created_at,
        json_agg(json_build_object(
          'menuItemName', oi.menu_item_name,
          'price', oi.price,
          'quantity', oi.quantity
        )) as items
      FROM orders o
      JOIN order_items oi ON oi.order_id = o.id
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `;
  }

  return Response.json(orders);
}

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
