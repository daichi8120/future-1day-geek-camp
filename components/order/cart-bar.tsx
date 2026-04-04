"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function CartBar({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 px-4 py-3 backdrop-blur">
      <Button className="w-full gap-2" size="lg" onClick={onOpen}>
        <ShoppingCart className="size-4" />
        カートを見る
        <Badge variant="secondary" className="ml-1">
          0
        </Badge>
      </Button>
    </div>
  );
}
