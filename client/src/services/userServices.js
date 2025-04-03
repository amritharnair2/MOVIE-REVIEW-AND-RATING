import { axiosInstance } from "../axios/axiosInstance"



export const listMovies = () => {
    return axiosInstance.get("/movie/listmovies")
}

export const userSignup = (data) => {
    return axiosInstance.post("/user/register",data )
}

export const userLogin = (data) => {
    return axiosInstance.post("/user/login",data )
}

export const userLogout = (data) => {
    return axiosInstance.post("/user/logout",data )
}