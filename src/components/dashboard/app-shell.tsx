"use client";

import { BookOpen, CalendarDays, FileText, GraduationCap, LayoutDashboard, LineChart, Map, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "#children", label: "Children", icon: GraduationCap },
  { href: "#calendar", label: "Calendar", icon: CalendarDays },
  { href: "#growth", label: "Growth", icon: LineChart },
  { href: "#roadmap", label: "Roadmap", icon: Map },
  { href: "#resources", label: "Resources", icon: FileText }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="hidden border-r bg-white/75 px-4 py-5 backdrop-blur lg:block">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold">Family Education</p>
            <p className="text-xs text-muted-foreground">Tanaka workspace</p>
          </div>
        </div>
        <Separator className="my-5" />
        <nav className="space-y-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950",
                item.href === "#dashboard" && "bg-slate-100 text-slate-950"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </a>
          ))}
        </nav>
        <div className="mt-8 rounded-lg border bg-slate-950 p-4 text-white">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Sparkles className="h-4 w-4 text-cyan-300" />
            Monthly report
          </div>
          <p className="mt-2 text-xs leading-5 text-slate-300">Draft AI-assisted family summaries after learning records mature.</p>
          <Button size="sm" variant="secondary" className="mt-4 w-full">
            Preview
          </Button>
        </div>
      </aside>
      <div className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-30 border-b bg-white/85 px-4 py-3 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <BookOpen className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold">Family Education</p>
                <p className="text-xs text-muted-foreground">This week</p>
              </div>
            </div>
            <Button size="sm">Add</Button>
          </div>
        </header>
        <main className="min-w-0 px-4 py-5 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
