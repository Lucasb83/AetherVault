import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg text-center px-4">
      <h1 className="font-serif text-6xl mb-4">404</h1>
      <p className="text-ink-dim mb-6">Esta página no existe, o todavía no la escribí.</p>
      <Link href="/" className="text-accent hover:text-accent-glow underline">
        Volver al inicio
      </Link>
    </div>
  );
}
