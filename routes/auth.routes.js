/**
 * @swagger
 * components:
 *   schemas:
 *     User:
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
 *         dob:
 *           type: string
 *           description: user's date of birth
 *         accessToken:
 *           type: string
 *           description: user's access token
 *       example:
 *         firstName: Mohammed
 *         lastName: Moataz
 *         username: mohammedmoataz
 *         email: mohammedmoataz@gmail.com
 *         password: 123456
 *         age: 22
 *         address: Egypt
 *         gender: Male
 *         phone: 01234567890
 *         dob: 2000-01-01
 *         accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJtb2hhbW1lZGlicmFoaW0iLCJpYXQiOjE2ODMwNTA3NzQsImV4cCI6MTY4MzEzNzE3NH0.ICGD8WejvrcSHKv0b7gqZeuSUy1aEE05AJHZqKIRmeU
 */
/** 
 * @swagger
 * tags:
 *   name: Registration
 *   description: The Registration managing API
 * /registration:
 *   post:
 *     summary: User registration
 *     tags: [Registration]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The registered user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 * 
 * /login:
 *   get:
 *     summary: User's Login
 *     tags: [Login]
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: User's email
 *       - in: query
 *         name: password
 *         schema:
 *           type: string
 *         required: true
 *         description: User's password
 *     responses:
 *       200:
 *         description: User Login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */

import { Router } from 'express'

import {
    register,
    login,
    refreshToken
} from '../conterollers/auth.controller.js'

const router = Router()

router.post('/registration', register)
router.get('/login', login)
router.get('/refreshToken', refreshToken)

export default router