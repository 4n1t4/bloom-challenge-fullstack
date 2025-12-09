import { BrandSettings } from "@/models/brand-setting";

export type Brand = {
  id: string;
  name: string;
  url: string;
  logo_url?:string;
  settings?: BrandSettings;
};

export type Brands = Brand[];
