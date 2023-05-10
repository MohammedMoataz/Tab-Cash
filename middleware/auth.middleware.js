import { verify } from 'jsonwebtoken'

const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.json({ error: 'No token provided' })

    } else {
        const token = authHeader.split(' ')[1]

        try {
            const decoded = verify(token, process.env.JWT_SECRET)
            console.log({ decoded })

            const { parentId, username } = decoded
            req.user = { parentId, username }

            next()

        } catch (error) {
            res.json({ error: 'Not authorized to access this route' })
        }
    }
}

const parentAuthenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.json({ error: 'No token provided' })

    } else {
        const token = authHeader.split(' ')[1]

        try {
            const decoded = verify(token, process.env.JWT_SECRET)
            console.log({ decoded })

            const { parentId, username } = decoded

            parentId === "root"
                ? next()
                : res.json({ error: 'Not authorized to access this route' })

        } catch (error) {
            res.json({ error: 'Not authorized to access this route' })
        }
    }
}

export default {
    authenticationMiddleware,
    parentAuthenticationMiddleware,
}
