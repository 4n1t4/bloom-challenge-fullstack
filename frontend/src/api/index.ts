/**
 * Exportaciones centralizadas de la API
 */

// Config y funciones base
export { get, post, put, patch, del, API_BASE_URL, ApiException } from "@/api/config";

// Tipos
export type { ApiError, FetchOptions } from "@/api/types";

// Funciones de API específicas para marcas
export { listBrands, getBrandById, getFAQsByBrandId } from "@/api/brands/brands";
export type { FAQQuestion } from "@/api/brands/brands";


// Es posible agregar mas funciones para otros endpoints...