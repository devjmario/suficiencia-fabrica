import jwt from 'jsonwebtoken'
import { configDotenv } from 'dotenv'

function authtoken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader?.split(' ')[1]

    if(!token) return res.sendStatus(401)
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.sendStatus(401)
        req.user = user
        next()
    })
}

export { authtoken }