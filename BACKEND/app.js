import express from  "express"
import dotenv from "dotenv"
import cors from "cors" //To connect frontend with backend
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload"
import userRouter from "./routes/userRouter.js"
import jobRouter from "./routes/jobRouter.js"
import applicationRouter from "./routes/applicationRouter.js"
import dbConnection from "./database/dbConnection.js"
import { errorMiddleware } from "./middlewares/error.js"


const app=express()
dotenv.config({path:'./config/config.env'})

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    method:['GET','POST','DELETE','PUT'],
    credentails:true
})
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));//uses to convert stringify to json

app.use(
    fileUpload({
        useTEmpFiles:true,
        tempFileDir:'/tmp/'
    })
)

app.use('api/v1/user',userRouter);
app.use('api/v1/application',applicationRouter);
app.use('api/v1/job',jobRouter);

dbConnection();


app.use(errorMiddleware)

export default app;