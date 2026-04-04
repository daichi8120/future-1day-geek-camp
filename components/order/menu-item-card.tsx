"use client";

import Image from "next/image";
import type { MenuItem } from "@/lib/menu-data";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "@/components/order/quantity-selector";

export function MenuItemCard({ item }: { item: MenuItem }) {
  const { addItem, removeItem, getQuantity } = useCart();
  const quantity = getQuantity(item.id);

  return (
    <div
      className={`flex gap-3 rounded-xl border bg-card p-3 shadow-sm transition-all ${
        quantity > 0 ? "ring-2 ring-primary/30" : ""
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
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <h3 className="text-sm font-semibold leading-tight">{item.name}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
            {item.description}
          </p>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm font-bold">
            &yen;{item.price.toLocaleString()}
          </span>
          {quantity === 0 ? (
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
