import { Router } from 'express'

import {
    addChild,
    createTransaction,
    getTransactions,
    searchByUsername
} from '../conterollers/user.controller.js'

const router = Router()

router.post('/addChild', addChild)
router.post('/send', createTransaction)

router.get('/getTransactions', getTransactions)

router.get('/search', searchByUsername)


export default router