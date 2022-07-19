import { NextFunction, Request, Response } from 'express'
import { verify } from "jsonwebtoken";

type JWTPayload = {
    id: string,
    email: string,
    iat: number,
    exp: number
}

export function authenticateMiddleware(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers

    if(!authorization){
        return res.status(401).json({
            status: "Error",
            message: "Token not provided"
        })
    }

    const token = authorization.split(" ")[1]

    try {
        const { id } = verify(token, process.env.SECRET!) as JWTPayload
        req.userId = id
        next()
    } catch (error) {
        return res.status(401).json({
            status: "Error",
            message: "Invalid or expired token"
        })
    }
}