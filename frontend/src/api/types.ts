/**
 * Tipos para las respuestas de la API
 */

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

// notar que tambien es posible realizar el tipo de la respuesta de la api, por ejemplo con data y message
