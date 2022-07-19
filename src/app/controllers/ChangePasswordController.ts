import { Request, Response } from 'express'
import { ChangePasswordService } from '../service/ChangePasswordService'

class ChangePasswordController {
    async handle (req:Request, res:Response) {
        const userId = req.userId
        const { password, newPassword } = req.body

        const changePasswordService = new ChangePasswordService()

        const updatedUser = await changePasswordService.execute(userId, password, newPassword)

        return res.status(200).json({
            status: 'success',
            message: 'password changed',
            userId: updatedUser.id
        })
    }
}

export default new ChangePasswordController()