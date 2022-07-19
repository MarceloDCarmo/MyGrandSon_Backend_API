import { Request, Response } from 'express'
import { AuthenticateService } from '../service/AuthenticateService'

class AuthenticateController {
    async handle (req:Request, res:Response) {
        const { username, password } = req.body

        const authenticateService = new AuthenticateService()
        const token = await authenticateService.execute(username, password)

        return res.status(200).json(token)
    }
}

export default new AuthenticateController()