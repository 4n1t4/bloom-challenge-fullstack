"use client"

import { Brand } from "@/models/brand"
import { createContext, useContext, type ReactNode } from "react"

interface BrandThemeContextType {
  brand: Brand | null
}

const BrandThemeContext = createContext<BrandThemeContextType>({ brand: null })

export function useBrandTheme() {
  return useContext(BrandThemeContext)
}

interface BrandThemeProviderProps {
  brand: Brand | null
  children: ReactNode
}

export function BrandThemeProvider({ brand, children }: BrandThemeProviderProps) {
  return (
    <BrandThemeContext.Provider value={{ brand }}>
      <div data-brand={brand?.id} id="layout-brand">
        {children}
      </div>
    </BrandThemeContext.Provider>
  )
}
