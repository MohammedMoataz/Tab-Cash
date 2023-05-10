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
 * 
 * /user/get:
 *   get:
 *     summary: Get User
 *     tags: [Get User]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User's id
 *     responses:
 *       200:
 *         description: Get User
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 *
 * /user/getChildren:
 *   get:
 *     summary: Get Children
 *     tags: [Get Children]
 *     parameters:
 *       - in: query
 *         name: parentId
 *         schema:
 *           type: string
 *         required: true
 *         description: Parent's id
 *     responses:
 *       200:
 *         description: Get Parent
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: user was not found
 * 
 * /user/search:
 *   get:
 *     summary: Search by username
 *     tags: [Search by username]
 *     parameters:
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: username to search
 *     responses:
 *       200:
 *         description: successful search
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: user was not found
 * 
 * /user/getTransactions:
 *   get:
 *     summary: Get user transactions
 *     tags: [Get user transactions]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id of the user
 *     responses:
 *       200:
 *         description: successful process
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: user was not found
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

import middleware from '../middleware/auth.middleware.js'

const router = Router()

// add user routes
router.post('/addChild', middleware.parentAuthenticationMiddleware, addChild)
router.post('/addCard', middleware.parentAuthenticationMiddleware, addCard)

// transactions routes
router.post('/send', middleware.authenticationMiddleware, createTransaction)
router.get('/getTransactions', middleware.authenticationMiddleware, getTransactions)

// search routes
router.get('/search', middleware.parentAuthenticationMiddleware, searchByUsername)

// get users routes
router.get('/get', middleware.parentAuthenticationMiddleware, getUser)
router.get('/getChildren', middleware.parentAuthenticationMiddleware, getAllChildren)

export default router