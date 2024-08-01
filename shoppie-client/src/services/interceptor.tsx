import axios from 'axios';
import Swal from 'sweetalert2';

const apiEndPoint = process.env.NEXT_PUBLIC_API_URL;


const axiosInstance = axios.create({
  baseURL: apiEndPoint,
  headers: {
    'Content-Type': 'application/json',
  },
});


axiosInstance.interceptors.request.use(
  (config) => {
    const authTokens = JSON.parse(localStorage.getItem('token')!);
    const token = authTokens?.accessToken;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(new Error(error))
);


axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const tokens = JSON.parse(localStorage.getItem('token') !);

    if (error.response?.status === 401 && tokens.refreshToken && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAccessToken();
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        const errorMessage = refreshError instanceof Error ? refreshError.message : String(refreshError);
        return Promise.reject(new Error(errorMessage));
      }
    }

    return Promise.reject(new Error(error));
  }
);

const refreshAccessToken = async () => {
  const authTokens = JSON.parse(localStorage.getItem('token') !);
  const refreshToken = authTokens.refreshToken;

  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  try {
    const response = await axios.post(`${apiEndPoint}/users/refresh/`, { token: refreshToken });
    const accessToken = response?.data?.access;

    
    authTokens.accessToken = accessToken;
    localStorage.setItem('token', JSON.stringify(authTokens));

    return accessToken;
  } catch (error) {
  
    await Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Session Expired',
      text: 'Please login again',
      showConfirmButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
    });

    localStorage.clear();
    window.location.replace('/login');
    throw error; 
  }
};


const axiosPrivate = axiosInstance;
export { axiosPrivate };
