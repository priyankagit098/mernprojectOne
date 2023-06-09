// import { axiosInstance } from "./axiosInstance";
import axios from "axios";
const axiosUrl = "http://localhost:5000";

// signup
const config = { headers: { "Content-Type": "multipart/form-data" } };

export const RegisterUser = async(payload) => {
    try {
        const response = await axios.post(`${axiosUrl}/api/signup`, payload, config)
        return response.data;
        
    } catch (error) {
        return error.message
    }
}


export const LoginUser = async(payload) => {
    try {
        const response = await axios.post(`${axiosUrl}/api/login`, payload)

        return response.data;
    } catch (error) {
        return error.message
    }
}