import { Router } from 'express'

import {
    addChild,
    createTransaction
} from '../conterollers/user.controller.js'

const router = Router()

router.post('/addChild', addChild)
router.post('/send', createTransaction)

export default router