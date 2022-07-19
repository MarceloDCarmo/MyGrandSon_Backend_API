import { hash } from 'bcryptjs'
import process from 'process'
import { UserRepository } from '../repositories/UserRepository'

export class CreateUserService {

    async execute(username: string, password: string) {
        if(!username || !password){
            throw new Error("Invalid username or password")
        }

        const usernameAlreadyExists = await UserRepository.findFirst({ where: { username } })

        if (usernameAlreadyExists) {
            throw new Error("Username already in use");
        }

        const hashedPassword = await hash(password, parseInt(process.env.SALT!))

        const user = await UserRepository.create({
            data: {
                username,
                password: hashedPassword
            }
        })
        
        return user
    }
}