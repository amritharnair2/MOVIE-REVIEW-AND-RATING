import { axiosInstance } from "../axios/axiosInstance"

export const AdminLogin = (data) => {
    return axiosInstance.post("/admin/login",data )
}

export const AdminLogout = (data) => {
    return axiosInstance.post("/admin/logout",data )
}
