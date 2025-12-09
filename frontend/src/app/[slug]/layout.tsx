import type React from "react"
import { BrandThemeProvider } from "@/components/providers/brand-theme-provider"
import { notFound } from "next/navigation"
import { getBrandById, listBrands } from "@/api"
import Header from "@/components/layouts/header"

export interface BrandLayoutProps {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const brands = await listBrands()
  return brands.map((brand) => ({
    slug: brand.id,
  }))
}


export default async function BrandLayout({ children, params }: BrandLayoutProps) {
  const { slug } = await params
  const brand = await getBrandById(slug)

  if (!brand) {
    notFound()
  }

  return (
    <BrandThemeProvider brand={brand}>
      <div className="min-h-screen bg-background">  
        <Header/>
        {children}
      </div>
    </BrandThemeProvider>
  )
}
