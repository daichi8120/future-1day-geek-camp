import { getCategories, getMenuItems } from "@/lib/menu-queries";
import { CartProvider } from "@/lib/cart-context";
import { Header } from "@/components/order/header";
import { CategorySidebar } from "@/components/order/category-sidebar";
import { MenuSection } from "@/components/order/menu-section";
import { MenuItemCard } from "@/components/order/menu-item-card";
import { CartSheet } from "@/components/order/cart-sheet";

export default async function Home() {
  const [categories, menuItems] = await Promise.all([
    getCategories(),
    getMenuItems(),
  ]);

  return (
    <CartProvider>
      <div className="flex min-h-dvh flex-col bg-background">
        <Header
          onMenuToggle={<CategorySidebar categories={categories} />}
        />
        <main className="flex-1 pb-20">
          {categories.map((cat) => {
            const items = menuItems.filter((i) => i.categoryId === cat.id);
            return (
              <MenuSection key={cat.id} category={cat}>
                {items.map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </MenuSection>
            );
          })}
        </main>
        <CartSheet />
      </div>
    </CartProvider>
  );
}
