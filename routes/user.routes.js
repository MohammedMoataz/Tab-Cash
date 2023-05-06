import { Router } from 'express'

import {
    connectMongoDB,
    createTransaction
} from '../conterollers/user.controller.js'

const router = Router()

router.get('/connect', connectMongoDB)
router.post('/send', createTransaction)

export default router