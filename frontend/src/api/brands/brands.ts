import { get} from "@/api/config";
import { Brand, Brands} from "@/models/brand";
import { BrandSettings} from "@/models/brands-settings";

/**
 * Obtiene todas las marcas disponibles
 * @returns Promise con el array de marcas
 * 
 * @example
 * ```ts
 * try {
 *   const brands = await listBrands();
 *   console.log(brands);
 * } catch (error) {
 *   if (error instanceof ApiException) {
 *     console.error('Error:', error.message, error.status);
 *   }
 * }
 * ```
 */
export async function listBrands(): Promise<Brands> {
  return get<Brands>("/brands");
}

/**
 * Obtiene una marca por su ID
 * @param id - ID de la marca
 * @returns Promise con la marca y su configuración
 * 
 * @example
 * ```ts
 * try {
 *   const brand = await getBrandById("karyn_coo");
 *   console.log(brand.name, brand.settings);
 * } catch (error) {
 *   if (error instanceof ApiException) {
 *     console.error('Error:', error.message, error.status);
 *   }
 * }
 * ```
 */
export async function getBrandById(id: string): Promise<Brand> {
  return get<Brand>(`/brands/${id}`);
}

/**
 * Obtiene las FAQs de una marca por su ID
 * @param id - ID de la marca
 * @returns Promise con el array de FAQs procesadas
 */
export async function getFAQsByBrandId(id: string): Promise<FAQQuestion[]> {
  return get<FAQQuestion[]>(`/brands/${id}/faqs`);
}

export interface FAQQuestion {
  id: string;
  question: string;
  answer: string;
  order: number;
}

