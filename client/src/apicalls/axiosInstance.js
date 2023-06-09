import axios from "axios";
export const axiosInstance = axios.create({
    headers: {
        //  authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        "Content-Type": "multipart/form-data"
    }
})

// Bearer ${JSON.parse(localStorage.getItem('Profile')).token}


