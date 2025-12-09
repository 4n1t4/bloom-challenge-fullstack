import type { ApiResponse, ApiError, FetchOptions } from "./types";

/**
 * Configuración base de la API
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Clase personalizada para errores de API
 */
export class ApiException extends Error {
  status: number;
  errors?: Record<string, string[]>;

  constructor(message: string, status: number = 500, errors?: Record<string, string[]>) {
    super(message);
    this.name = "ApiException";
    this.status = status;
    this.errors = errors;
  }
}

/**
 * Construye la URL con query parameters
 */
function buildUrl(endpoint: string, params?: Record<string, string | number | boolean>): string {
  const url = new URL(endpoint, API_BASE_URL);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  return url.toString();
}

/**
 * Procesa la respuesta de fetch y maneja errores
 */
async function handleResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type");

  // Si la respuesta no es JSON, lanzar error
  if (!contentType?.includes("application/json")) {
    if (!response.ok) {
      throw new ApiException(
        `Error ${response.status}: ${response.statusText}`,
        response.status
      );
    }
    // Si es OK pero no es JSON, retornar texto vacío
    return "" as T;
  }

  const data = await response.json();

  if (!response.ok) {
    const error: ApiError = {
      message: data.message || data.error || `Error ${response.status}`,
      status: response.status,
      errors: data.errors,
    };
    throw new ApiException(error.message, error.status, error.errors);
  }

  return data;
}

/**
 * Función base para realizar peticiones fetch
 */
async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { params, headers = {}, ...fetchOptions } = options;

  const url = buildUrl(endpoint, params);

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...headers,
    
  };

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers: defaultHeaders,
      cache: "no-store",       
      next: { revalidate: 0 },  
      mode: "cors",
      
    });

    return handleResponse<T>(response);
  } catch (error) {
    if (error instanceof ApiException) {
      throw error;
    }

    // Error de red u otro error
    throw new ApiException(
      error instanceof Error ? error.message : "Error de conexión",
      0
    );
  }
}

/**
 * Realiza una petición GET
 */
export async function get<T>(endpoint: string, options?: FetchOptions): Promise<T> {
  return fetchApi<T>(endpoint, {
    ...options,
    method: "GET",
  });
}

/**
 * Realiza una petición POST
 */
export async function post<T>(
  endpoint: string,
  body?: unknown,
  options?: FetchOptions
): Promise<T> {
  return fetchApi<T>(endpoint, {
    ...options,
    method: "POST",
    body: body ? JSON.stringify(body) : undefined,
  });
}

/**
 * Realiza una petición PUT
 */
export async function put<T>(
  endpoint: string,
  body?: unknown,
  options?: FetchOptions
): Promise<T> {
  return fetchApi<T>(endpoint, {
    ...options,
    method: "PUT",
    body: body ? JSON.stringify(body) : undefined,
  });
}

/**
 * Realiza una petición PATCH
 */
export async function patch<T>(
  endpoint: string,
  body?: unknown,
  options?: FetchOptions
): Promise<T> {
  return fetchApi<T>(endpoint, {
    ...options,
    method: "PATCH",
    body: body ? JSON.stringify(body) : undefined,
  });
}

/**
 * Realiza una petición DELETE
 */
export async function del<T>(endpoint: string, options?: FetchOptions): Promise<T> {
  return fetchApi<T>(endpoint, {
    ...options,
    method: "DELETE",
  });
}

/**
 * Exporta la URL base para uso externo si es necesario
 */
export { API_BASE_URL };

