import { Brand } from "@/models/brand";
import brands from "@/data/brands";
import brandSettings from "@/data/brands-settings";

const BrandService = {
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
  list(): Promise<Brand[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(brands as Brand[]);
      }, 1000);
    });
  },
};

export default BrandService;
