"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import type { Category } from "@/lib/menu-data";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function CategorySidebar({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState(false);

  const handleCategoryClick = (categoryId: string) => {
    setOpen(false);
    setTimeout(() => {
      document
        .getElementById(categoryId)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon-sm">
          <Menu className="size-5" />
          <span className="sr-only">メニュー</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <SheetHeader>
          <SheetTitle>カテゴリ</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors hover:bg-muted active:bg-muted/80"
            >
              <span className="text-lg">{cat.emoji}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
