import * as dotenv from "dotenv";
import "express-async-errors"
import express, { NextFunction, Request, Response } from "express"
import router from "./routes"

import swaggerUi from "swagger-ui-express"
import swaggerDocument from "../../swagger.json"
import { ValidationError } from './errors/ValidationError'

const app = express()

dotenv.config({path: '../../.env'})

app.use(express.json())

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(router)

app.use((err: Error, req: Request, res: Response, next:NextFunction) => {
    if(err instanceof ValidationError){
        let statusCode = 500

        if(err instanceof ValidationError) statusCode = err.statusCode

        return res.status(statusCode).json({
            status: "Error",
            message: err.message
        })
    }
})

app.listen(process.env.PORT, () => console.log(`Server running on http://localhost:${process.env.PORT}`))