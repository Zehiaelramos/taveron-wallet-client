import axios from 'axios';

/**
 * Instancia base de Axios configurada para comunicarse con el backend de Taveron Wallet.
 * Utiliza la variable de entorno VITE_API_URL definida en el archivo .env.
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para inyectar el token en cada petición
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores globales de respuesta
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Aquí podemos centralizar el manejo de errores (ej: 401 Unauthorized, 500 Server Error)
    console.error('API Error:', error.response?.data || error.message);
    
    const customError = {
      message: error.response?.data?.detail || 'Ha ocurrido un error inesperado en el servidor.',
      status: error.response?.status,
      data: error.response?.data,
    };

    return Promise.reject(customError);
  }
);

export default apiClient;
