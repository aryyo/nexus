const getApiBaseUrl = () => {
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  return 'http://localhost:3000';
};

export const API_BASE_URL = getApiBaseUrl();

export const endpoints = {
  auth: {
    base: `${API_BASE_URL}`,
  },
  user: {
    profile: `${API_BASE_URL}/user`,
    settings: `${API_BASE_URL}/settings`,
    changePassword: `${API_BASE_URL}/user/change-password`,
    profilePicture: `${API_BASE_URL}/user/profile-picture`,
  },
  products: {
    base: `${API_BASE_URL}/products`,
    byId: (id) => `${API_BASE_URL}/products/${id}`,
  },
  orders: {
    base: `${API_BASE_URL}/orders`,
    byId: (id) => `${API_BASE_URL}/orders/${id}`,
    bulkDelete: `${API_BASE_URL}/orders/bulk-delete`,
  },
  invoices: {
    base: `${API_BASE_URL}/invoices`,
    byId: (id) => `${API_BASE_URL}/invoices/${id}`,
    bulkDelete: `${API_BASE_URL}/invoices/bulk/delete`,
  },
}; 