const { Router } = require('express')
const { register, login, logout, passwordResetRequest, passwordReset } = require('../controller/userController')
const { loginLimiter } = require('../middleware/ratelimit')

const authRouter = Router()

authRouter.post('/register', register)
authRouter.post('/login', loginLimiter, login)
authRouter.post('/logout', logout)
authRouter.post('/passwordResetRequest', passwordResetRequest)
authRouter.post('/passwordReset', passwordReset)

module.exports = authRouter