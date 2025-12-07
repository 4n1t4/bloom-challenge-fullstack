import { BrandSettings } from "@/models/brand-setting";

export type Brand = {
  id: string;
  name: string;
  url: string;
  settings?: BrandSettings;
};

export type Brands = Brand[];
