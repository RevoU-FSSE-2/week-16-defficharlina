const { Router } = require('express')
const { register, login, logout, passwordResetRequest, passwordReset } = require('../controller/userController')

const authRouter = Router()

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/logout', logout)

module.exports = authRouter