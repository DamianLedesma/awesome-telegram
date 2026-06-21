import Link from "next/link";
import { AppProvider } from "@/components/AppProvider";
import { Nav } from "@/components/Nav";
import { Brand } from "@/components/Brand";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col sm:flex-row">
        {/* Sidebar (desktop) / hidden on mobile */}
        <aside className="hidden w-56 shrink-0 flex-col gap-6 border-r border-bloom-100 p-5 sm:flex">
          <Brand />
          <Nav />
          <Link href="/pricing" className="mt-auto text-sm text-bloom-600 hover:underline">
            ✨ Upgrade to Premium
          </Link>
        </aside>

        {/* Mobile top bar */}
        <header className="flex items-center justify-between border-b border-bloom-100 px-4 py-3 sm:hidden">
          <Brand />
          <Link href="/pricing" className="text-sm font-semibold text-bloom-600">
            ✨ Premium
          </Link>
        </header>

        <main className="flex-1 px-4 pb-24 pt-5 sm:px-8 sm:pb-10">{children}</main>

        {/* Mobile bottom nav */}
        <div className="sm:hidden">
          <Nav />
        </div>
      </div>
    </AppProvider>
  );
}
