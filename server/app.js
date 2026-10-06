const express = require('express')
const db = require('./db')
const cors = require('cors')
const cookieParse = require('cookie-parser')

const userModule = require('./modules/userModule')
const taskModule = require('./modules/taskModule')

userModule()
taskModule()

const userRoute = require('./routers/user.route')
const taskRoute = require('./routers/task.route')

const app = express()
app.use(cookieParse())
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/user' , userRoute)
app.use('/task' , taskRoute)

app.listen(5555 , ()=> {
    console.log("App Started");
})