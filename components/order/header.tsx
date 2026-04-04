import { ClipboardList } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Header({
  onMenuToggle,
  tableNumber = 12,
}: {
  onMenuToggle: React.ReactNode;
  tableNumber?: number;
}) {
  return (
    <header className="sticky top-0 z-40 flex h-12 items-center justify-between border-b bg-background/95 px-4 backdrop-blur">
      <div className="flex items-center gap-2">
        {onMenuToggle}
        <h1 className="text-base font-bold tracking-tight">OSAKI亭</h1>
        <Badge variant="outline" className="ml-1 text-xs">
          卓 {tableNumber}
        </Badge>
      </div>
      <Button variant="ghost" size="icon-sm">
        <ClipboardList className="size-4" />
        <span className="sr-only">注文履歴</span>
      </Button>
    </header>
  );
}
