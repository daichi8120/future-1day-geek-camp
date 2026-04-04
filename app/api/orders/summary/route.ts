import sql from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tableNumber = searchParams.get("table");

  if (!tableNumber) {
    return Response.json(
      { error: "卓番号を指定してください" },
      { status: 400 }
    );
  }

  const table = parseInt(tableNumber, 10);

  const [summary] = await sql`
    SELECT
      COUNT(*)::int as order_count,
      COALESCE(SUM(total_price), 0)::int as total_amount
    FROM orders
    WHERE table_number = ${table}
      AND status != 'cancelled'
  `;

  const items = await sql`
    SELECT
      oi.menu_item_name,
      SUM(oi.quantity)::int as total_quantity,
      SUM(oi.price * oi.quantity)::int as subtotal
    FROM order_items oi
    JOIN orders o ON o.id = oi.order_id
    WHERE o.table_number = ${table}
      AND o.status != 'cancelled'
    GROUP BY oi.menu_item_name
    ORDER BY total_quantity DESC
  `;

  return Response.json({
    tableNumber: table,
    orderCount: summary.order_count,
    totalAmount: summary.total_amount,
    items,
  });
}
