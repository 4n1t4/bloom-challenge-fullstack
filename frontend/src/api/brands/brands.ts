import { get, ApiException } from "@/api/config";
import type { Brand, Brands } from "@/models/brand";

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

