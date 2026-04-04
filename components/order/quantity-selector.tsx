"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function QuantitySelector({
  quantity,
  onIncrement,
  onDecrement,
}: {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon-xs"
        onClick={onDecrement}
        disabled={quantity <= 0}
      >
        <Minus />
      </Button>
      <span className="w-5 text-center text-sm font-medium tabular-nums">
        {quantity}
      </span>
      <Button variant="outline" size="icon-xs" onClick={onIncrement}>
        <Plus />
      </Button>
    </div>
  );
}
