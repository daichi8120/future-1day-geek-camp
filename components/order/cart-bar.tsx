"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function CartBar({ onOpen }: { onOpen: () => void }) {
  const { totalCount, totalPrice } = useCart();
  const isEmpty = totalCount === 0;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 px-4 py-3 backdrop-blur">
      <Button
        className="w-full gap-2"
        size="lg"
        variant={isEmpty ? "outline" : "default"}
        onClick={onOpen}
      >
        <ShoppingCart className="size-4" />
        {isEmpty ? (
          "カートは空です"
        ) : (
          <>
            カートを見る
            <Badge variant="secondary" className="ml-1">
              {totalCount}
            </Badge>
            <span className="ml-auto">
              &yen;{totalPrice.toLocaleString()}
            </span>
          </>
        )}
      </Button>
    </div>
  );
}
