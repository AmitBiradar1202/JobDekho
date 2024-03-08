
import mongoose from "mongoose"

const dbConnection =()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"MERN_JOBDEKHO"
    }).then(()=>{
        console.log("DB Connected")
    }).catch((err)=>{
        console.log(`Server issues ${err}`)
    })
}

export default dbConnection;