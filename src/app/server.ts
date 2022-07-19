import * as dotenv from "dotenv";
import "express-async-errors"
import express, { NextFunction, Request, Response } from "express"
import router from "./routes"


const app = express()

dotenv.config({path: '../../.env'})

app.use(express.json())
app.use(router)

app.use((err: Error, req: Request, res: Response, next:NextFunction) => {
    if(err instanceof Error){
        return res.status(500).json({
            message: err.message
        })
    }
})

app.listen(process.env.PORT, () => console.log(`Server running on http://localhost:${process.env.PORT}`))