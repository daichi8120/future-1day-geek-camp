import sql from "@/lib/db";

const VALID_STATUSES = [
  "pending",
  "cooking",
  "ready",
  "served",
  "cancelled",
] as const;

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const orderId = parseInt(id, 10);

  if (isNaN(orderId)) {
    return Response.json({ error: "不正な注文IDです" }, { status: 400 });
  }

  let body: { status: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "不正なリクエストです" }, { status: 400 });
  }

  if (!VALID_STATUSES.includes(body.status as (typeof VALID_STATUSES)[number])) {
    return Response.json(
      { error: `ステータスは ${VALID_STATUSES.join(", ")} のいずれかを指定してください` },
      { status: 400 }
    );
  }

  const [updated] = await sql`
    UPDATE orders SET status = ${body.status}
    WHERE id = ${orderId}
    RETURNING id, status
  `;

  if (!updated) {
    return Response.json({ error: "注文が見つかりません" }, { status: 404 });
  }

  return Response.json(updated);
}
