import { compare, hash } from 'bcryptjs'
import { ValidationError } from '../errors/ValidationError'
import { UserRepository } from '../repositories/UserRepository'

export class ChangePasswordService {
    async execute(id: string, password: string, newPassword: string) {
        if(!newPassword || !password || !id){
            throw new ValidationError("Invalid or null fields", 422)            
        }

        const user = await UserRepository.findFirst({ where: { id } })

        if(!user){
            throw new ValidationError("User do not exists", 400)
        }

        const isPasswordValid = await compare(password, user.password)

        if(!isPasswordValid){
            throw new ValidationError("Wrong user or password", 400);
        }

        if(newPassword == password){
            throw new ValidationError("The new password must be different from the old one", 400);
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