import { Request, Response } from 'express'
import { DeleteUserService } from '../service/DeleteUserService'

class DeleteUserController {
    async handle (req:Request, res:Response) {
        const userId = req.userId
        const { password } = req.body

        console.log(userId + " >> " + password)
        

        const deleteUserService = new DeleteUserService()

        const deletedUser = await deleteUserService.execute(userId, password)

        return res.status(200).json({
            status: 'Deleted',
            userId,
            username: deletedUser.username
        })
    }
}

export default new DeleteUserController()