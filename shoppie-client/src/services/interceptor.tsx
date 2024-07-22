import axios from "axios";

const apiEndPoint = process.env.NEXT_PUBLIC_API_URL

console.log("apiendpoint :",apiEndPoint);


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
      console.log("token :",token);
      
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
const axiosPrivate = axiosInstance

export {axiosPrivate}