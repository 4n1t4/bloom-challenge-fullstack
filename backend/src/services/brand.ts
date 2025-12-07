import { Brand } from "@/models/brand";
import brands from "@/data/brands";
import brandSettings from "@/data/brands-settings";
import { BrandSettings } from "@/models/brand-setting";


const BrandService = {
  /**
   * Obtiene una marca por su ID
   * @param id - ID de la marca
   * @returns Promise con la marca
   */
  retrieve(id: string): Promise<Brand> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const brand = brands.find((brand) => brand.id === id);
        const brandSetting = brandSettings.find(
          (setting) => setting.brandId === id
        );
        if (!brand || !brandSetting) {
          reject(new Error("Brand not found"));
          return;
        }
        const brandWithSettings: Brand = {
          ...brand,
          settings: brandSetting,
        };
        resolve(brandWithSettings);
      }, 1000);
    });
  },

  /**
   * Obtiene todas las marcas
   * @returns Promise con las marcas
   */
  list(): Promise<Brand[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(brands as Brand[]);
      }, 1000);
    });
  },
};

export default BrandService;
