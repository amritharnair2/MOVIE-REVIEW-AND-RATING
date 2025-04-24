const { adminLogin } = require('../controllers/adminController')

const adminRouter = require('express').Router()

adminRouter.post("/login", adminLogin ) //admin login

module.exports = {
    adminRouter
}