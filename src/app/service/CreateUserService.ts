import { hash } from 'bcryptjs'
import process from 'process'
import { ValidationError } from '../errors/ValidationError'
import { UserRepository } from '../repositories/UserRepository'

export class CreateUserService {

    async execute(username: string, password: string) {
        if(!username || !password){
            throw new ValidationError("Invalid username or password", 422)
        }

        const usernameAlreadyExists = await UserRepository.findFirst({ where: { username } })

        if (usernameAlreadyExists) {
            throw new ValidationError("Username already in use", 400);
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