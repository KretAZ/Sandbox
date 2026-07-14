/**
 * API Service - handles all HTTP requests to the Ofertownik+ backend
 * Base URL: http://localhost:3001/api
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

// Store auth token in localStorage
const getAuthToken = () => localStorage.getItem('authToken');
const setAuthToken = (token) => localStorage.setItem('authToken', token);
const clearAuthToken = () => localStorage.removeItem('authToken');

// Default headers with JWT token
const getHeaders = (includeAuth = true) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    ...options,
    headers: getHeaders(options.auth !== false),
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      // Handle 401 Unauthorized
      if (response.status === 401) {
        clearAuthToken();
        window.location.href = '/login';
      }
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    // Handle empty responses (e.g., DELETE, 204 No Content)
    if (response.status === 204 || response.headers.get('content-length') === '0') {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// ============================================================================
// Authentication API
// ============================================================================

export const authAPI = {
  login: async (email, password) => {
    const response = await apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      auth: false,
    });
    if (response && response.token) {
      setAuthToken(response.token);
    }
    return response;
  },

  logout: async () => {
    await apiCall('/auth/logout', {
      method: 'POST',
    });
    clearAuthToken();
  },

  getCurrentUser: async () => {
    return apiCall('/auth/user', {
      method: 'GET',
    });
  },
};

// ============================================================================
// Cases API
// ============================================================================

export const casesAPI = {
  getAll: async () => {
    return apiCall('/cases', {
      method: 'GET',
    });
  },

  getById: async (id) => {
    return apiCall(`/cases/${id}`, {
      method: 'GET',
    });
  },

  create: async (caseData) => {
    return apiCall('/cases', {
      method: 'POST',
      body: JSON.stringify(caseData),
    });
  },

  update: async (id, caseData) => {
    return apiCall(`/cases/${id}`, {
      method: 'PUT',
      body: JSON.stringify(caseData),
    });
  },

  delete: async (id) => {
    return apiCall(`/cases/${id}`, {
      method: 'DELETE',
    });
  },

  filterByBroker: async (broker) => {
    return apiCall(`/cases/filter/broker?broker=${encodeURIComponent(broker)}`, {
      method: 'GET',
    });
  },

  filterByPriority: async (priority) => {
    return apiCall(`/cases/filter/priority?priority=${encodeURIComponent(priority)}`, {
      method: 'GET',
    });
  },
};

// ============================================================================
// Dashboard API
// ============================================================================

export const dashboardAPI = {
  getStats: async () => {
    return apiCall('/dashboard/stats', {
      method: 'GET',
    });
  },
};

export default {
  authAPI,
  casesAPI,
  dashboardAPI,
  getAuthToken,
  setAuthToken,
  clearAuthToken,
};
