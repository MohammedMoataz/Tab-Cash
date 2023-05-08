import { Router } from 'express'

import {
    addChild,
    createTransaction
} from '../conterollers/user.controller.js'
[{"key":"email","value":"mohammedmoataz@gmail.com","equals":true,"description":null,"enabled":true},{"key":"password","value":"123456","equals":true,"description":null,"enabled":true}]
const router = Router()

router.post('/addChild', addChild)
router.post('/send', createTransaction)

export default router