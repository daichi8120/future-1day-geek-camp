"use client";

import { useState } from "react";
import Image from "next/image";
import { Users, Loader2, CheckCircle2 } from "lucide-react";
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
  const { items, addItem, removeItem, clearCart, totalPrice } = useCart();
  const [splitCount, setSplitCount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [orderResult, setOrderResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const parsedSplit = parseInt(splitCount, 10);
  const perPerson =
    parsedSplit > 0 ? Math.ceil(totalPrice / parsedSplit) : null;

  const handleOrder = async () => {
    setSubmitting(true);
    setOrderResult(null);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tableNumber: 12,
          items: items.map(({ item, quantity }) => ({
            menuItemId: item.id,
            quantity,
          })),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setOrderResult({
          success: false,
          message: data.error || "注文に失敗しました",
        });
        return;
      }

      setOrderResult({ success: true, message: "注文が確定しました！" });
      clearCart();
      setSplitCount("");
    } catch {
      setOrderResult({
        success: false,
        message: "通信エラーが発生しました",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <CartBar onOpen={() => setOpen(true)} />
      <Sheet
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (!v) setOrderResult(null);
        }}
      >
        <SheetContent side="bottom" className="max-h-[85dvh] rounded-t-2xl">
          <SheetHeader>
            <SheetTitle>注文内容</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-4">
            {/* 注文結果メッセージ */}
            {orderResult && (
              <div
                className={`mb-3 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                  orderResult.success
                    ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                    : "bg-destructive/10 text-destructive"
                }`}
              >
                {orderResult.success && <CheckCircle2 className="size-4" />}
                {orderResult.message}
              </div>
            )}

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
              disabled={items.length === 0 || submitting}
              onClick={handleOrder}
            >
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  送信中...
                </>
              ) : (
                "注文する"
              )}
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
