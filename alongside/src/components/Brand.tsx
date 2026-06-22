import Link from "next/link";

export function Brand({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 font-bold ${className}`}>
      <span className="grid h-8 w-8 place-items-center rounded-full bg-bloom-500 text-white">A</span>
      <span className="text-lg tracking-tight">Alongside</span>
    </Link>
  );
}
