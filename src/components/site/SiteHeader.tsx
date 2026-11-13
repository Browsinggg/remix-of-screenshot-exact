import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Monogram } from "./Monogram";
import { Ornament } from "./Ornament";
import { navItems } from "./nav";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        scrolled ? "border-b border-gold/40 bg-background/90 backdrop-blur" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link to="/" aria-label="#SaRang home" className="pt-1">
          <Monogram size="sm" className="text-3xl" />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="whitespace-nowrap rounded-full px-2.5 py-2 text-[0.68rem] uppercase tracking-[0.16em] text-foreground/80 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: true }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="quiet" size="icon" className="lg:hidden" aria-label="Open menu">
              <Menu className="size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[85vw] max-w-sm border-gold/40 bg-paper">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <div className="mt-8 flex flex-col items-center">
              <Monogram size="md" />
              <Ornament className="mt-4" />
              <nav className="mt-6 flex w-full flex-col" aria-label="Mobile">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="border-b border-border/60 py-4 text-center font-display text-2xl text-foreground transition-colors hover:text-primary"
                    activeProps={{ className: "text-primary" }}
                    activeOptions={{ exact: true }}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
