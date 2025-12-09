import Link from "next/link"
import Image from "next/image"

export default function Header() {
  return (
      <header className="border-b border-border backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            <Image
              className="h-14 w-auto self-end"
              src="/images/Logo-Bloom.png"
              alt="Logo"
              width={400}
              height={100}
              sizes=""
            />
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/marcas" className="text-foreground hover:opacity-70 transition-opacity">
                Marcas
              </Link>
            </nav>
          </div>
        </div>
      </header>
  )
}
