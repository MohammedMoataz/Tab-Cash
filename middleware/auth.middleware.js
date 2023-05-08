import { verify } from 'jsonwebtoken'

const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error('No token provided')
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = verify(token, process.env.JWT_SECRET)
        console.log({ decoded })
        const { id, username } = decoded
        req.user = { id, username }
        next()
    } catch (error) {
        throw new Error('Not authorized to access this route')
    }
}

export default authenticationMiddleware
