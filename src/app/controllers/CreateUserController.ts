import { Request, Response } from 'express'
import { CreateUserService } from '../service/CreateUserService'

class CreateUserController {
    async handle (req:Request, res:Response) {
        const { username, password } = req.body

        const createUserService = new CreateUserService()

        const createdUser = await createUserService.execute( username, password )

        return res.status(201).json({
            status: 'Success',
            id: createdUser.id,
            username: createdUser.username
        })
    }
}

export default new CreateUserController()