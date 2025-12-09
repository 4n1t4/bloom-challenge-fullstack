import { BrandSettings } from "@/models/brands-settings";

export type Brand = {
  id: string;
  name: string;
  url: string;
  settings?: BrandSettings;
  logo_url?:string;
};

export type Brands = Brand[];
