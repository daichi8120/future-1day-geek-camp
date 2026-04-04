"use client";

import { useState } from "react";
import Image from "next/image";
import { Users } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { QuantitySelector } from "@/components/order/quantity-selector";
import { CartBar } from "@/components/order/cart-bar";

export function CartSheet() {
  const [open, setOpen] = useState(false);
  const { items, addItem, removeItem, totalPrice } = useCart();
  const [splitCount, setSplitCount] = useState("");

  const parsedSplit = parseInt(splitCount, 10);
  const perPerson =
    parsedSplit > 0 ? Math.ceil(totalPrice / parsedSplit) : null;

  return (
    <>
      <CartBar onOpen={() => setOpen(true)} />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="max-h-[85dvh] rounded-t-2xl">
          <SheetHeader>
            <SheetTitle>注文内容</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-4">
            {items.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                カートは空です
              </p>
            ) : (
              <div className="space-y-3">
                {items.map(({ item, quantity }) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        &yen;{item.price.toLocaleString()} &times; {quantity}
                      </p>
                      <p className="text-sm font-semibold">
                        &yen;{(item.price * quantity).toLocaleString()}
                      </p>
                    </div>
                    <QuantitySelector
                      quantity={quantity}
                      onIncrement={() => addItem(item)}
                      onDecrement={() => removeItem(item.id)}
                    />
                  </div>
                ))}
              </div>
            )}
            <Separator className="my-3" />
            <div className="flex items-center justify-between py-1">
              <span className="font-semibold">合計</span>
              <span className="text-lg font-bold">
                &yen;{totalPrice.toLocaleString()}
              </span>
            </div>

            {/* 割り勘 */}
            {items.length > 0 && (
              <>
                <Separator className="my-3" />
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Users className="size-4 text-muted-foreground" />
                    <span className="text-sm font-medium">割り勘</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Input
                      type="number"
                      min="1"
                      placeholder="人数"
                      value={splitCount}
                      onChange={(e) => setSplitCount(e.target.value)}
                      className="w-20"
                    />
                    <span className="text-sm text-muted-foreground">人で割ると</span>
                    <span className="text-sm font-bold">
                      {perPerson !== null
                        ? `\u00a5${perPerson.toLocaleString()}/人`
                        : "-"}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
          <SheetFooter>
            <Button
              className="w-full"
              size="lg"
              disabled={items.length === 0}
            >
              注文する
            </Button>
            <div className="flex w-full gap-2">
              <Button variant="outline" className="flex-1" size="lg">
                注文履歴
              </Button>
              <Button variant="secondary" className="flex-1" size="lg">
                お会計
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
