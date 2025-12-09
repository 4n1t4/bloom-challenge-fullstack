import { notFound } from "next/navigation"
import Link from "next/link"
import { getBrandById, getFAQsByBrandId, listBrands } from "@/api"
import { FAQSection } from "@/components/faq/faq-section"

interface BrandPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const brands = await listBrands()
  return brands.map((brand) => ({
    slug: brand.id,
  }))
}

export async function generateMetadata({ params }: BrandPageProps) {
  const { slug } = await params
  const brand = await getBrandById(slug)

  if (!brand) {
    return { title: "Marca no encontrada" }
  }

  return {
    title: `${slug} | Bloom Reuse`,
    description: slug,
  }
}


export default async function BrandPage({ params }: BrandPageProps) {
  const { slug } = await params
  const brand = await getBrandById(slug)
  const faqs = await getFAQsByBrandId(brand.id);

  if (!brand) {
    notFound()
  }

  return (
    <main className="container mx-auto bg-background px-4 py-12">
      <div className="mb-8">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Volver a Marcas
        </Link>
      </div>

      <FAQSection
        title={`Preguntas Frecuentes - ${brand.name}`}
        subtitle="Todo lo que necesitas saber sobre vender en esta marca"
        faqs={faqs.map(faq => ({
          question: faq.question,
          answer: faq.answer,
          defaultOpen: faq.order === 1,
        }))}
      />
    </main>
  )
}
