const { register, login, logout, updateUser, deleteUser } = require('../../controllers/userController')

const userRouter = require('express').Router()

userRouter.post("/register", register) //Register
userRouter.post("/login", login) //login
userRouter.put("/updateuser/:id", updateUser) //user update
userRouter.delete("/deleteuser/:id", deleteUser)
userRouter.post("/logout", logout) //logout

module.exports = {
    userRouter
}