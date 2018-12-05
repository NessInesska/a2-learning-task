import { environment } from '../../environments/environment';

const API_PREFIX = '/api';

const BASE_URL = `${environment.baseUrl}`;

export const ENDPOINTS = {
  LOGIN: `${BASE_URL}${API_PREFIX}/login`,
  LOGOUT: `${BASE_URL}${API_PREFIX}/logout`,
  PRODUCTS: `${BASE_URL}${API_PREFIX}/products`,
  ROLES: `${BASE_URL}${API_PREFIX}/roles`,
  USERS: `${BASE_URL}${API_PREFIX}/users`,
  CATEGORIES: `${BASE_URL}${API_PREFIX}/categories`,
};
