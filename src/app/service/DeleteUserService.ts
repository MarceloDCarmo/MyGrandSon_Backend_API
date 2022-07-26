import { compare } from 'bcryptjs'
import { ValidationError } from '../errors/ValidationError'
import { UserRepository } from '../repositories/UserRepository'

export class DeleteUserService {
    async execute (id:string, password:string){

        if(!id || !password){
            throw new ValidationError("Invalid user or password", 422)
        }

        const user = await UserRepository.findFirst({ where: { id } })

        if(!user){
            throw new ValidationError("Wrong user or password", 400)
        }

        const isPasswordValid = await compare(password, user.password)

        if(!isPasswordValid){
            throw new ValidationError("Wrong user or password", 400)
        }

        return await UserRepository.delete({
            where: {
                id
            }
        })
    }
}