import axios from "axios";




const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    withCredentials: true,
})

const fetchCsrfToken = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/csrf-token/');
    const data = await response.json();
    console.log("data in fetchcsrftoekn: ",data)
    return data.CSRFToken;
};



export default axiosInstance;