"use client";

import Image from "next/image";
import { Flame } from "lucide-react";
import type { MenuItem } from "@/lib/menu-data";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QuantitySelector } from "@/components/order/quantity-selector";

export function MenuItemCard({ item }: { item: MenuItem }) {
  const { addItem, removeItem, getQuantity } = useCart();
  const quantity = getQuantity(item.id);

  return (
    <div
      className={`flex gap-3 rounded-xl border bg-card p-3 shadow-sm transition-all ${
        item.isSoldOut
          ? "opacity-50"
          : quantity > 0
            ? "ring-2 ring-primary/30"
            : ""
      }`}
    >
      <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="80px"
          className="object-cover"
        />
        {item.isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="text-xs font-bold text-white">売切</span>
          </div>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-semibold leading-tight truncate">
              {item.name}
            </h3>
            {item.isPopular && (
              <Badge variant="destructive" className="shrink-0 gap-0.5 px-1.5 py-0 text-[10px]">
                <Flame className="size-2.5" />
                人気
              </Badge>
            )}
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
            {item.description}
          </p>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm font-bold">
            &yen;{item.price.toLocaleString()}
          </span>
          {item.isSoldOut ? (
            <span className="text-xs font-medium text-muted-foreground">
              品切れ
            </span>
          ) : quantity === 0 ? (
            <Button size="xs" onClick={() => addItem(item)}>
              追加
            </Button>
          ) : (
            <QuantitySelector
              quantity={quantity}
              onIncrement={() => addItem(item)}
              onDecrement={() => removeItem(item.id)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
