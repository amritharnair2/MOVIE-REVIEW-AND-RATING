
import { userInstance } from "../axios/axiosInstance"



export const userLogin = (data) => {
    return userInstance.post("/user/login", data)
}

export const userSignup = (data) => {
    return userInstance.post("/user/register",data )
}

export const userLogout = (data) => {
    return userInstance.post("/user/logout",data )
}

export const userProfile = (data) => {
    return userInstance.post("/user/profile",data )
}

export const userUpdate = (data) => {
    return userInstance.patch("/user/update",data )
}


