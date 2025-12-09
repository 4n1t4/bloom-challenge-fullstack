import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    //La siguinete configuración la realizo para poder utilizar las url de las imagenes de cada marca
    // esto es solamente una configuración debido a que utilizo la url de ellas en vez de almacenarlas en un storage aparte o de manera local
    // sin emabrgo, dependiendo de como se configure el almacenamiento de las imagenes esto puede variar
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.squarespace-cdn.com",
        pathname: "/content/**",
      },
    ],
  },
};

export default nextConfig;
