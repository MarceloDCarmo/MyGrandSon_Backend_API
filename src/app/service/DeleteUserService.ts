import { compare } from 'bcryptjs'
import { UserRepository } from '../repositories/UserRepository'

export class DeleteUserService {
    async execute (id:string, password:string){

        if(!id || !password){
            throw new Error("Invalid user or password")
        }

        const user = await UserRepository.findFirst({ where: { id } })

        if(!user){
            throw new Error("Wrong user or password")
        }

        const isPasswordValid = await compare(password, user.password)

        if(!isPasswordValid){
            throw new Error("Wrong user or password")
        }

        return await UserRepository.delete({
            where: {
                id
            }
        })
    }
}