/**
 * Tipos para las respuestas de la API
 */

/**
 * Respuesta estándar de la API
 */
export type ApiResponse<T> = {
  data: T;
  message?: string;
};

/**
 * Error de la API
 */
export type ApiError = {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
};

/**
 * Opciones para las peticiones fetch
 */
export type FetchOptions = RequestInit & {
  params?: Record<string, string | number | boolean>;
};

