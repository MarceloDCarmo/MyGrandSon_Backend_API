import { Request, Response } from 'express'
import { DeleteUserService } from '../service/DeleteUserService'

class DeleteUserController {
    async handle (req:Request, res:Response) {
        const { id, password } = req.body

        const deleteUserService = new DeleteUserService()

        const deletedUser = await deleteUserService.execute(id, password)

        return res.status(200).json({
            status: 'Deleted',
            id,
            username: deletedUser.username
        })
    }
}

export default new DeleteUserController()