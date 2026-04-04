import sql from "@/lib/db";
import type { Category, MenuItem } from "@/lib/menu-data";

export async function getCategories(): Promise<Category[]> {
  const rows = await sql`SELECT id, name, emoji FROM categories`;
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    emoji: r.emoji,
  }));
}

export async function getMenuItems(): Promise<MenuItem[]> {
  const rows = await sql`
    SELECT id, name, price, description, image, category_id, is_sold_out, is_popular
    FROM menu_items
  `;
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    price: r.price,
    description: r.description,
    image: r.image,
    categoryId: r.category_id,
    isSoldOut: r.is_sold_out,
    isPopular: r.is_popular,
  }));
}
