import { Router } from "express";
import { getBrandById, listBrands } from "@/controllers/brand";

/**
 * Router para las marcas
 * @description Contiene los endpoints para las marcas. Debe ser importado en el archivo index.ts para ser usado en la aplicación.
 * @returns Rutas que comienzan con: /brands
 * @example
 * ```ts
 * const routerBrands = Router();
 * routerBrands.get("/", listBrands); -> api/brands/ -> GET -> Lista todas las marcas
 * routerBrands.get("/:id", getBrandById); -> api/brands/:id -> GET -> Obtiene configuración de una marca por su ID
 * export default routerBrands;
 * ```
 */
const routerBrands = Router();

routerBrands.get("/", listBrands);
routerBrands.get("/:id", getBrandById);

export default routerBrands;
