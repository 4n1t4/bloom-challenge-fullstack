import BrandService from "@/services/brand";
import { Request, Response, NextFunction } from "express";

/**
 * Controlador para listar todas las marcas
 * @description Obtiene todas las marcas desde el servicio de marcas y las devuelve en formato JSON.
 * @param req - Request
 * @param res - Response
 * @param next - NextFunction
 * @returns Promise con el array de marcas
 * @example
 * ```ts
 * const brands = await listBrands(req, res, next);
 * res.status(201).json(brands);
 * ```
 */
const listBrands = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const brands = await BrandService.list();
    res.status(201).json(brands);
  } catch (error) {
    console.error("Error fetching brands:", error);
    res.status(500).json(error);
  }
  next();
};

/**
 * Controlador para obtener una marca por su ID
 * @description Obtiene una marca desde el servicio de marcas y la devuelve en formato JSON.
 * @param req - Request
 * @param res - Response
 * @param next - NextFunction
 * @returns Promise con la marca
 * @example
 * ```ts
 * const brand = await getBrandById(req, res, next);
 * res.status(200).json(brand);
 * ```
 */
const getBrandById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const brand = await BrandService.retrieve(id);
    res.status(200).json(brand);
  } catch (error) {
    console.error("Error fetching brand:", error);
    res.status(500).json(error);
  }
  next();
};

export { listBrands, getBrandById };
