import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Bloom Reuse",
  description: "Moda sustentable circular",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}
