import type { Category } from "@/lib/menu-data";
import { Separator } from "@/components/ui/separator";

export function MenuSection({
  category,
  children,
}: {
  category: Category;
  children: React.ReactNode;
}) {
  return (
    <section id={category.id} className="scroll-mt-14 px-4 py-4">
      <h2 className="mb-1 text-base font-bold">
        {category.emoji} {category.name}
      </h2>
      <Separator className="mb-3" />
      <div className="grid grid-cols-1 gap-3">{children}</div>
    </section>
  );
}
