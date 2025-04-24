import { adminInstance } from "../axios/adminAxiosInstance"

//admin login
export const adminLogin = (data) => {
    return adminInstance.post("/admin/login", data)
}

//add movie
export const addMovie = (data) => {
    return adminInstance.post("/movie/create", data)
}

//update movie
export const updateMovie = (id, updatedMovie) => {
    return adminInstance.patch(`/movie/updatemovie/${id}`, updatedMovie)
}

//delete movie
export const deleteMovie = (id) => {
    return adminInstance.delete(`/movie/deletemovie/${id}`)
}

//delete a user
export const deleteUser = (id) => {
    return adminInstance.delete(`/user/deleteuser/${id}`)
}

//list all users
export const listUsers = (data) => {
    return adminInstance.get("/user/listusers", data)
}

//list all reviews
export const listReviews = () => {
    return adminInstance.get("/review/listreviews")
}