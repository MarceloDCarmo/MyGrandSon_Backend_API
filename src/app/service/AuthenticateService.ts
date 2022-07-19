import { compare } from 'bcryptjs'
import dayjs from 'dayjs'
import { sign } from 'jsonwebtoken'
import { UserRepository } from '../repositories/UserRepository'

export class AuthenticateService {
    async execute(username: string, password: string) {

        if (!username || !password) {
            throw new Error("Invalid username or password")
        }

        const user = await UserRepository.findFirst({ where: { username } })

        if(!user) {
            throw new Error("Wrong username or password");
        }

        const isPasswordValid = compare(password, user.password)

        if(!isPasswordValid){
            throw new Error("Wrong username or password");
        }

        const token = sign({ id: user.id }, process.env.SECRET!, { expiresIn: "1d", subject: user.id })

        return {
            token,
            expires_in: dayjs().add(1, 'day')
        }
    }
}