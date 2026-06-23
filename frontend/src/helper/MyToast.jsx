import toast from "react-hot-toast";

export const showSuccessToast = (message) => {
    toast.success(message, {
        style: {
            fontFamily: 'Poppins',
            fontSize: '13px',
            borderRadius: '8px',
            background: '#111111',
            color: '#ffffff',
        },
        iconTheme: {
            primary: '#D4AF37',
            secondary: '#111111',
        },
    });
};

export const showErrorToast = (message) => {
    toast.error(message, {
        style: {
            fontFamily: 'Poppins',
            fontSize: '13px',
            borderRadius: '8px',
        }
    });
};