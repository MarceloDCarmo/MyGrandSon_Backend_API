import { compare, hash } from 'bcryptjs'
import { UserRepository } from '../repositories/UserRepository'

export class ChangePasswordService {
    async execute(id: string, password: string, newPassword: string) {
        if(!newPassword){
            throw new Error("Invalid password")
        }

        const user = await UserRepository.findFirst({ where: { id } })

        if(!user){
            throw new Error("User do not exists")
        }

        const isPasswordValid = await compare(password, user.password)

        if(!isPasswordValid){
            throw new Error("Wrong user or password");
        }

        if(newPassword == password){
            throw new Error("The new password must be different from the old one");
        }

        const hashedNewPassword = await hash(newPassword, parseInt(process.env.SALT!))

        const updatedUser = await UserRepository.update({
            where: {
                id
            },
            data: {
                password: hashedNewPassword
            }
        })

        return updatedUser
    }
}