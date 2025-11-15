/**
 * Environment variables configuration
 * Vite automatically loads .env files and provides them via import.meta.env
 */

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const ENV = {
  apiUrl: API_URL,
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  mode: import.meta.env.MODE,
};
