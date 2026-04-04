"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import {
  Clock,
  Flame,
  UtensilsCrossed,
  CheckCircle2,
  XCircle,
  Search,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type OrderItem = {
  menuItemName: string;
  price: number;
  quantity: number;
};

type Order = {
  id: number;
  table_number: number;
  total_price: number;
  status: string;
  created_at: string;
  items: OrderItem[];
};

type Summary = {
  tableNumber: number;
  orderCount: number;
  totalAmount: number;
  items: { menu_item_name: string; total_quantity: number; subtotal: number }[];
};

const STATUS_CONFIG: Record<
  string,
  { label: string; icon: React.ReactNode; color: string }
> = {
  pending: {
    label: "未着手",
    icon: <Clock className="size-3.5" />,
    color:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  },
  cooking: {
    label: "調理中",
    icon: <Flame className="size-3.5" />,
    color:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  },
  ready: {
    label: "提供待ち",
    icon: <UtensilsCrossed className="size-3.5" />,
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  },
  served: {
    label: "提供済み",
    icon: <CheckCircle2 className="size-3.5" />,
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  },
  cancelled: {
    label: "取消済み",
    icon: <XCircle className="size-3.5" />,
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  },
};

const STATUS_ORDER: Record<string, number> = {
  pending: 0,
  cooking: 1,
  ready: 2,
  served: 3,
  cancelled: 4,
};

const NEXT_STATUS: Record<string, string[]> = {
  pending: ["cooking", "cancelled"],
  cooking: ["ready", "cancelled"],
  ready: ["served", "cancelled"],
  served: [],
  cancelled: [],
};

const FILTER_OPTIONS = [
  { key: "all", label: "全て" },
  { key: "pending", label: "未着手" },
  { key: "cooking", label: "調理中" },
  { key: "ready", label: "提供待ち" },
  { key: "served", label: "提供済み" },
  { key: "cancelled", label: "取消済み" },
];

function relativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "たった今";
  if (mins < 60) return `${mins}分前`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}時間前`;
  return `${Math.floor(hours / 24)}日前`;
}

function isOverdue(order: Order): boolean {
  if (order.status !== "pending") return false;
  const diff = Date.now() - new Date(order.created_at).getTime();
  return diff > 15 * 60 * 1000;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [tableInput, setTableInput] = useState("");
  const [summary, setSummary] = useState<Summary | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data);
    } finally {
      setLoading(false);
    }
  }, []);

  // 初回取得 + 10秒ポーリング
  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  // 楽観的UI更新 + 取消確認
  const updateStatus = async (orderId: number, newStatus: string) => {
    if (newStatus === "cancelled") {
      const ok = window.confirm("この注文を取り消しますか？");
      if (!ok) return;
    }

    const prev = orders;
    setOrders((o) =>
      o.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );

    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error();
      setError(null);
    } catch {
      setOrders(prev);
      setError("ステータスの更新に失敗しました");
      setTimeout(() => setError(null), 3000);
    }
  };

  const fetchSummary = async () => {
    if (!tableInput) return;
    const res = await fetch(`/api/orders/summary?table=${tableInput}`);
    const data = await res.json();
    setSummary(data);
  };

  // フィルタ + ソート
  const sortedOrders = useMemo(() => {
    const filtered =
      filter === "all" ? orders : orders.filter((o) => o.status === filter);
    return [...filtered].sort((a, b) => {
      const statusDiff =
        (STATUS_ORDER[a.status] ?? 99) - (STATUS_ORDER[b.status] ?? 99);
      if (statusDiff !== 0) return statusDiff;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [orders, filter]);

  return (
    <div className="min-h-dvh bg-background">
      <header className="sticky top-0 z-40 flex h-12 items-center justify-between border-b bg-background/95 px-4 backdrop-blur">
        <h1 className="text-base font-bold">注文管理</h1>
        <Button variant="ghost" size="icon-sm" onClick={fetchOrders}>
          <RefreshCw className="size-4" />
        </Button>
      </header>

      {/* ステータスフィルタ */}
      <div className="sticky top-12 z-30 flex gap-1.5 overflow-x-auto border-b bg-background px-4 py-2">
        {FILTER_OPTIONS.map((opt) => (
          <Button
            key={opt.key}
            size="xs"
            variant={filter === opt.key ? "default" : "outline"}
            onClick={() => setFilter(opt.key)}
          >
            {opt.label}
          </Button>
        ))}
      </div>

      <div className="mx-auto max-w-2xl px-4 py-4 space-y-6">
        {/* エラー */}
        {error && (
          <div className="rounded-lg bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">
            {error}
          </div>
        )}

        {/* 会計集計 */}
        <Card>
          <CardHeader>
            <CardTitle>会計集計</CardTitle>
            <CardDescription>卓番号から注文の総量を確認</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                type="number"
                min="1"
                placeholder="卓番号"
                value={tableInput}
                onChange={(e) => setTableInput(e.target.value)}
                className="w-24"
              />
              <Button onClick={fetchSummary} disabled={!tableInput}>
                <Search className="size-4" />
                検索
              </Button>
            </div>
            {summary && (
              <div className="mt-4 space-y-3">
                <div className="flex gap-4 text-sm">
                  <span>
                    卓 <strong>{summary.tableNumber}</strong>
                  </span>
                  <span>
                    注文数: <strong>{summary.orderCount}</strong>
                  </span>
                  <span>
                    合計:{" "}
                    <strong>
                      &yen;{summary.totalAmount.toLocaleString()}
                    </strong>
                  </span>
                </div>
                {summary.items.length > 0 && (
                  <div className="space-y-1">
                    {summary.items.map((item) => (
                      <div
                        key={item.menu_item_name}
                        className="flex justify-between text-sm"
                      >
                        <span>
                          {item.menu_item_name} &times; {item.total_quantity}
                        </span>
                        <span>&yen;{item.subtotal.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Separator />

        {/* 注文一覧 */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">受信注文一覧</h2>
          <span className="text-xs text-muted-foreground">
            {sortedOrders.length}件
          </span>
        </div>
        {loading ? (
          <p className="text-sm text-muted-foreground">読み込み中...</p>
        ) : sortedOrders.length === 0 ? (
          <p className="text-sm text-muted-foreground">注文はありません</p>
        ) : (
          <div className="space-y-3">
            {sortedOrders.map((order) => {
              const config =
                STATUS_CONFIG[order.status] ?? STATUS_CONFIG.pending;
              const nextStatuses = NEXT_STATUS[order.status] ?? [];
              const overdue = isOverdue(order);

              return (
                <Card
                  key={order.id}
                  className={
                    overdue
                      ? "ring-2 ring-red-400 dark:ring-red-600"
                      : undefined
                  }
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CardTitle>注文 #{order.id}</CardTitle>
                        {overdue && (
                          <AlertTriangle className="size-4 text-red-500" />
                        )}
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${config.color}`}
                      >
                        {config.icon}
                        {config.label}
                      </span>
                    </div>
                    <CardDescription>
                      卓 {order.table_number} ・{" "}
                      {relativeTime(order.created_at)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span>
                            {item.menuItemName} &times; {item.quantity}
                          </span>
                          <span>
                            &yen;
                            {(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between text-sm font-semibold">
                      <span>合計</span>
                      <span>
                        &yen;{order.total_price.toLocaleString()}
                      </span>
                    </div>
                  </CardContent>
                  {nextStatuses.length > 0 && (
                    <CardFooter>
                      <div className="flex gap-2">
                        {nextStatuses.map((s) => {
                          const sc = STATUS_CONFIG[s];
                          return (
                            <Button
                              key={s}
                              size="sm"
                              variant={
                                s === "cancelled" ? "destructive" : "outline"
                              }
                              onClick={() => updateStatus(order.id, s)}
                            >
                              {sc.icon}
                              {sc.label}
                            </Button>
                          );
                        })}
                      </div>
                    </CardFooter>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
