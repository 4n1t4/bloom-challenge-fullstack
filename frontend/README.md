# API Client

Configuración y funciones helper para realizar llamadas a la API del backend.

## Configuración

La URL base de la API se configura mediante la variable de entorno `NEXT_PUBLIC_API_URL` o por defecto usa `http://localhost:8000`.

## Uso Básico

### Importar funciones

```typescript
import { listBrands, getBrandById, ApiException } from "@/api";
// o importar desde archivos específicos
import { get, post } from "@/api/config";
import type { Brand } from "@/models/brand";
```

### Ejemplo: Obtener todas las marcas

```typescript
import { listBrands, ApiException } from "@/api";

async function fetchBrands() {
  try {
    const brands = await listBrands();
    console.log(brands);
  } catch (error) {
    if (error instanceof ApiException) {
      console.error(`Error ${error.status}: ${error.message}`);
    }
  }
}
```

### Ejemplo: Obtener una marca por ID

```typescript
import { getBrandById, ApiException } from "@/api";

async function fetchBrand(id: string) {
  try {
    const brand = await getBrandById(id);
    console.log(brand.name, brand.settings);
  } catch (error) {
    if (error instanceof ApiException) {
      console.error(`Error ${error.status}: ${error.message}`);
    }
  }
}
```

### Ejemplo: Uso directo de funciones HTTP

```typescript
import { get, post, ApiException } from "@/api";

// GET con query parameters
const data = await get<MyType>("/endpoint", {
  params: { page: 1, limit: 10 }
});

// POST
const result = await post<ResponseType>("/endpoint", {
  name: "Example",
  value: 123
});

// Con headers personalizados
const custom = await get<MyType>("/endpoint", {
  headers: {
    "Authorization": "Bearer token"
  }
});
```

## Modelos

Los modelos TypeScript están disponibles en `@/models`:

```typescript
import type { Brand, BrandSettings, ShippingOption, PaymentOption } from "@/models";

const brand: Brand = {
  id: "karyn_coo",
  name: "Karyn Coo",
  url: "https://www.karyncoo.com",
  settings: {
    brandId: "karyn_coo",
    shipping: {
      options: ["home_pickup", "blue_express"]
    },
    payment: {
      options: ["credits", "bank_transfer"],
      creditsPercentage: 100,
      bankTransferPercentage: 80
    }
  }
};
```

## Manejo de Errores

Todas las funciones lanzan `ApiException` en caso de error:

```typescript
import { ApiException } from "@/api";

try {
  const brands = await listBrands();
} catch (error) {
  if (error instanceof ApiException) {
    // Error de la API
    console.error(`Status: ${error.status}`);
    console.error(`Message: ${error.message}`);
    console.error(`Errors:`, error.errors);
  } else {
    // Error inesperado
    console.error("Error desconocido:", error);
  }
}
```

