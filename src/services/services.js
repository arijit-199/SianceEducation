import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios";
import { BASE_URL } from "./apiManager";
import { apiErrorHandler } from "../helper";

export const logout = async () => {
    try {
        const refreshToken = JSON.parse(await AsyncStorage.getItem("refreshToken"));

        const response = await axios.post(`${BASE_URL}/logout/`, { refresh_token: refreshToken });
        return response
        
    } catch (error) {
        return error
    }
}