import { BrandCard } from "@/components/brands/brand-card"
import { Brand } from "@/models/brand";
import { listBrands } from "@/api";
import Header from "@/components/layouts/header";

export const metadata = {
  title: "Marcas | Bloom Reuse",
  description: "Explora todas las marcas disponibles en nuestra plataforma de moda sustentable",
}
export default async function MarcasPage() {
  let brands: Brand[] = [];

  try {
    brands = await listBrands();
  } catch (error) {
    console.error("Error al cargar marcas:", error);
  }

  return (
    <div className="min-h-screen bg-background">  
        <Header/>
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Nuestras Marcas</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubre moda sustentable de segunda mano de las mejores marcas
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      </main>
      </div>
  )
}
