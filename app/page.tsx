import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 py-16 px-4 dark:bg-black">
      <div className="w-full max-w-2xl space-y-12">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          shadcn/ui Components
        </h1>

        {/* Button Variants */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Button</h2>
          <div className="flex flex-wrap gap-3">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>

          <h3 className="text-sm font-medium text-muted-foreground">Sizes</h3>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="xs">XS</Button>
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>

          <h3 className="text-sm font-medium text-muted-foreground">
            Disabled
          </h3>
          <div className="flex flex-wrap gap-3">
            <Button disabled>Disabled</Button>
            <Button variant="outline" disabled>
              Disabled
            </Button>
          </div>
        </section>

        {/* Input */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Input</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Input placeholder="Default input" />
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
            <Input disabled placeholder="Disabled" />
          </div>
        </section>

        {/* Card */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Card</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>
                  This is a card description with some details.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Card content goes here. You can put any elements inside.
                </p>
              </CardContent>
              <CardFooter>
                <Button size="sm">Action</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Enter your credentials below.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Input type="email" placeholder="Email" />
                  <Input type="password" placeholder="Password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Sign In</Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
