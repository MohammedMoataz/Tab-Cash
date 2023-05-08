/**
 * @swagger
 * components:
 *   schemas:
 *     Parent:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - username
 *         - email
 *         - password
 *         - age
 *         - address
 *         - gender
 *         - phone
 *         - dob
 *         - accessToken
 *       properties:
 *         firstName:
 *           type: string
 *           description: the first name for the user
 *         lastName:
 *           type: string
 *           description: the last name for the user
 *         username:
 *           type: string
 *           description: a unique name for the user
 *         email:
 *           type: string
 *           description: user's email
 *         password:
 *           type: string
 *           description: user's password
 *         age:
 *           type: string
 *           description: user's age
 *         address:
 *           type: string
 *           description: user's address
 *         gender:
 *           type: string
 *           description: user's gender
 *         phone:
 *           type: string
 *           description: user's phone
 *         nationalId:
 *           type: string
 *           description: user's national id
 *         dob:
 *           type: datetime
 *           description: user's date of birth
 *         accessToken:
 *           type: string
 *           description: user's access token
 *       example:
 *         firstName: Mohammed
 *         lastName: Moataz
 *         username: mohammedmoataz
 *         email: mohammedmoataz@gmail.com
 *         password: "123456"
 *         age: 22
 *         address: Egypt
 *         gender: Male
 *         phone: "01234567890"
 *         nationalId: "01234567890123"
 *         dob: 2000-01-01
 *         accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJtb2hhbW1lZGlicmFoaW0iLCJpYXQiOjE2ODMwNTA3NzQsImV4cCI6MTY4MzEzNzE3NH0.ICGD8WejvrcSHKv0b7gqZeuSUy1aEE05AJHZqKIRmeU
 *     Child:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - username
 *         - password
 *         - age
 *         - address
 *         - gender
 *         - dob
 *         - accessToken
 *       properties:
 *         firstName:
 *           type: string
 *           description: the first name for the user
 *         lastName:
 *           type: string
 *           description: the last name for the user
 *         username:
 *           type: string
 *           description: a unique name for the user
 *         password:
 *           type: string
 *           description: user's password
 *         age:
 *           type: string
 *           description: user's age
 *         address:
 *           type: string
 *           description: user's address
 *         gender:
 *           type: string
 *           description: user's gender
 *         dob:
 *           type: string
 *           description: user's date of birth
 *         accessToken:
 *           type: string
 *           description: user's access token
 *       example:
 *         firstName: Adam
 *         lastName: Mohammed
 *         username: adammohammed
 *         email: adammohammed@gmail.com
 *         password: "123456"
 *         age: 5
 *         address: Egypt
 *         gender: Male
 *         dob: 2018-01-01
 *         accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJtb2hhbW1lZGlicmFoaW0iLCJpYXQiOjE2ODMwNTA3NzQsImV4cCI6MTY4MzEzNzE3NH0.ICGD8WejvrcSHKv0b7gqZeuSUy1aEE05AJHZqKIRmeU
 *     Card:
 *       type: object
 *       required:
 *         - creditCardNum
 *         - creditCardPass
 *         - creditCardExpirationDate
 *         - restrictions
 *         - balance
 *       properties:
 *         creditCardNum:
 *           type: string
 *           description: credit card number
 *         creditCardPass:
 *           type: string
 *           description: credit card password
 *         creditCardExpirationDate:
 *           type: string
 *           description: credit card expiration date
 *         restrictions:
 *           type: string
 *           description: categories to buy from child - null for parent
 *         balance:
 *           type: integer
 *           description: balance of user
 *       example:
 *         creditCardNum: "0123456789012345"
 *         creditCardPass: 0123
 *         creditCardExpirationDate: 2023-01-01
 *         restrictions: Food, Drinks - or null for parent
 *         balance: 1000.0
 *     LoginInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: Parent email
 *         password:
 *           type: string
 *           description: Parent password
 *       example:
 *         email: mohammedmoataz@gmail.com
 *         password: "123456"
 */
/** 
 * @swagger
 * 
 * /registration:
 *   post:
 *     summary: Parent registration
 *     tags: [Registration]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Parent'
 *     responses:
 *       200:
 *         description: The registered Parent.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Parent'
 *       500:
 *         description: Some server error
 * 
 * /login:
 *   post:
 *     summary: User's Login
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: User Login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginInput'
 *       404:
 *         description: The user was not found
 */

import { Router } from 'express'

import {
    register,
    login,
} from '../conterollers/auth.controller.js'

const router = Router()

router.post('/registration', register)
router.post('/login', login)

export default router