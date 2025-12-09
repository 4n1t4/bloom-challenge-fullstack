import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import type { Brand } from "@/models/brand"
import placeholder from '../../../public/images/placeholder.png'

interface BrandCardProps {
  brand: Brand
}

export function BrandCard({ brand }: BrandCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-card shadow-md hover:shadow-xl transition-all duration-300">
      <Link href={`/${brand.id}`} className="block">
        <div className="aspect-[4/5] relative overflow-hidden bg-muted">
        <Image
            src={brand.logo_url|| placeholder}
            alt={brand.name}
            fill
            sizes="(max-width: 640px) 100vw,
                   (max-width: 1024px) 50vw,
                   25vw"
            className="object-cover rounded-xl"
      
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
      </Link>

      <div className="p-6 text-center">
        <h3 className="text-xl font-semibold mb-2">{brand.name}</h3>
        <Button asChild className="w-full" variant="default">
          <Link href={`/${brand.id}`}>Visitar</Link>
        </Button>
      </div>
    </div>
  )
}
