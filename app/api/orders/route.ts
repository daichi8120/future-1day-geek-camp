import sql from "@/lib/db";

type OrderItemPayload = {
  menuItemId: string;
  menuItemName: string;
  price: number;
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

  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const [order] = await sql`
    INSERT INTO orders (table_number, total_price)
    VALUES (${tableNumber}, ${totalPrice})
    RETURNING id, created_at
  `;

  for (const item of items) {
    await sql`
      INSERT INTO order_items (order_id, menu_item_id, menu_item_name, price, quantity)
      VALUES (${order.id}, ${item.menuItemId}, ${item.menuItemName}, ${item.price}, ${item.quantity})
    `;
  }

  return Response.json({
    orderId: order.id,
    totalPrice,
    createdAt: order.created_at,
  });
}
