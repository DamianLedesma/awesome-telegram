"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/app", label: "Today", icon: "🏠" },
  { href: "/app/calendar", label: "Calendar", icon: "📅" },
  { href: "/app/learn", label: "Learn", icon: "📚" },
  { href: "/app/settings", label: "Settings", icon: "⚙️" },
];

export function Nav() {
  const path = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-bloom-100 bg-white/95 backdrop-blur sm:static sm:border-0 sm:bg-transparent">
      <div className="mx-auto flex max-w-md justify-around px-2 py-2 sm:max-w-none sm:flex-col sm:justify-start sm:gap-1 sm:px-0 sm:py-0">
        {links.map((l) => {
          const active = path === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 text-xs font-medium transition sm:flex-row sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm ${
                active ? "bg-bloom-50 text-bloom-700" : "text-ink/60 hover:bg-bloom-50/60"
              }`}
            >
              <span className="text-base">{l.icon}</span>
              {l.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
