import axios from "axios";

const axiosWithAuth = () => {
    const instance = axios.create({
        baseURL: 'http://localhost:5000',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token'),
        }
    })

    return instance;
}

export default  axiosWithAuth;