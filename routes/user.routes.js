/** 
 * @swagger
 * 
 * /user/addChild:
 *   post:
 *     summary: Parent add his child
 *     tags: [Add Child]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Child'
 *     responses:
 *       200:
 *         description: add child.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Child'
 *       500:
 *         description: Some server error
 * 
 * /user/addCard:
 *   post:
 *     summary: Add Card
 *     tags: [Add Card]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Card'
 *     responses:
 *       200:
 *         description: User Login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Card'
 *       404:
 *         description: The user was not found
 */

import { Router } from 'express'

import {
    addChild,
    createTransaction,
    getTransactions,
    searchByUsername,
    addCard,
    getUser,
    getAllChildren,
} from '../conterollers/user.controller.js'

const router = Router()

// add user routes
router.post('/addChild', addChild)
router.post('/addCard', addCard)

// transactions routes
router.post('/send', createTransaction)
router.get('/getTransactions', getTransactions)

// search routes
router.get('/search', searchByUsername)

// get users routes
router.get('/get', getUser)
router.get('/getChildren', getAllChildren)

export default router