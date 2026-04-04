"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { CartBar } from "@/components/order/cart-bar";

export function CartSheet() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CartBar onOpen={() => setOpen(true)} />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="max-h-[85dvh] rounded-t-2xl">
          <SheetHeader>
            <SheetTitle>注文内容</SheetTitle>
          </SheetHeader>
          <div className="flex-1 px-4">
            <p className="py-8 text-center text-sm text-muted-foreground">
              カートは空です
            </p>
            <Separator />
            <div className="flex items-center justify-between py-3">
              <span className="font-semibold">合計</span>
              <span className="text-lg font-bold">&yen;0</span>
            </div>
          </div>
          <SheetFooter>
            <Button className="w-full" size="lg">
              お会計に進む
            </Button>
            <Button variant="outline" className="w-full" size="lg">
              注文履歴
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
