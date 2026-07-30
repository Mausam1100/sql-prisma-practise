import type { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['authorization']
        if (!token) {
            return res.status(411).json({
                msg: "JWT is not included!"
            })
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as {userId: number}
        if (!decodedToken) {
            return res.status(411).json({
                msg: "JWT is not correct"
            })
        }

        req.userId = decodedToken.userId
        next()
    } catch (error) {
        console.log(`Error in authMiddleware ${error}`)
    }
}