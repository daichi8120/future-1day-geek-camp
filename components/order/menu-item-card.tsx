"use client";

import { useState } from "react";
import Image from "next/image";
import type { MenuItem } from "@/lib/menu-data";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "@/components/order/quantity-selector";

export function MenuItemCard({ item }: { item: MenuItem }) {
  const [quantity, setQuantity] = useState(0);

  return (
    <div className="flex gap-3 rounded-xl border bg-card p-3 shadow-sm">
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
            <Button size="xs" onClick={() => setQuantity(1)}>
              追加
            </Button>
          ) : (
            <QuantitySelector
              quantity={quantity}
              onIncrement={() => setQuantity((q) => q + 1)}
              onDecrement={() => setQuantity((q) => Math.max(0, q - 1))}
            />
          )}
        </div>
      </div>
    </div>
  );
}
