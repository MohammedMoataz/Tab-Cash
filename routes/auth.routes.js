import { Router } from 'express'

import {
    register,
    login,
    refrshAccessToken
} from '../conterollers/auth.controller.js'

const router = Router()

router.post('/registration', register)
router.get('/login', login)
router.get('/refreshToken', refrshAccessToken)

export default router