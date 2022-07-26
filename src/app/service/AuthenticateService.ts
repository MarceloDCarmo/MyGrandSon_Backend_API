import { compare } from 'bcryptjs'
import dayjs from 'dayjs'
import { sign } from 'jsonwebtoken'
import { ValidationError } from '../errors/ValidationError'
import { UserRepository } from '../repositories/UserRepository'

export class AuthenticateService {
    async execute(username: string, password: string) {

        if (!username || !password) {
            throw new ValidationError("Invalid username or password", 422)
        }

        const user = await UserRepository.findFirst({ where: { username } })

        if(!user) {
            throw new ValidationError("Wrong username or password", 400);
        }

        const isPasswordValid = await compare(password, user.password)

        if(!isPasswordValid){
            throw new ValidationError("Wrong username or password", 400);
        }

        const token = sign({ id: user.id }, process.env.SECRET!, { expiresIn: "1d", subject: user.id })

        return {
            token,
            expires_in: dayjs().add(1, 'day')
        }
    }
}