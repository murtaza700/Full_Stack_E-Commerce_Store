import axios from 'axios';
import toast from 'react-hot-toast';

const BASE_API = import.meta.env.VITE_BASE_API;

const api = axios.create({
    baseURL: BASE_API,
    withCredentials: true
});

api.interceptors.response.use(
    (responseNode) => {
        return responseNode;
    },
    (networkErrorObj) => {
        if (networkErrorObj.response) {
            const serverStatusResponseCode = networkErrorObj.response.status;
            const backendCustomMessageData = networkErrorObj.response.data?.message;

            if (serverStatusResponseCode === 429) {
                const finalLimiterText = backendCustomMessageData || 'Too many requests. Please try again after 15 minutes.';

                toast.error(finalLimiterText, {
                    id: 'rate-limit-toast-lock',
                    duration: 5000,
                    style: {
                        fontFamily: 'Poppins',
                        fontSize: '13px',
                        borderRadius: '8px',
                        background: '#111111',
                        color: '#ffffff',
                    }
                });

                if (networkErrorObj.response.data) {
                    networkErrorObj.response.data.message = finalLimiterText;
                }
                networkErrorObj.message = finalLimiterText;
            }
        }

        return Promise.reject(networkErrorObj);
    }
);

export default api;