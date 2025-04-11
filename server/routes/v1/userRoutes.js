const { register, login, logout, updateUser, deleteUser, userProfile } = require('../../controllers/userController')
const AuthMiddleware = require('../../middlewares/AuthMiddleware')

const userRouter = require('express').Router()

userRouter.post("/register", register) //Register
userRouter.post("/login", login) //login
userRouter.patch("/update", AuthMiddleware, updateUser) //user update
userRouter.get("/profile", AuthMiddleware, userProfile)
userRouter.delete("/deleteuser/:userId", deleteUser) //delete user
userRouter.post("/logout", logout) //logout

module.exports = {
    userRouter
}