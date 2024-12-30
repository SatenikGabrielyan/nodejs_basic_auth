require("dotenv").config()
const path = require("node:path")
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const {register} = require("./auth/userController")
const {login, logout} = require("./auth/authController")
const {secure} = require("./auth/secureController")
const {authenticate} = require("./middleware/ jwtMiddleware")

const PORT = process.env.PORT || 3001


const app = express()
app.use(bodyParser.json())
 
app.use(cors({
    credentials:true,
    origin:["http://localhost:5173", "http://localhost:5174"]
  }))



const usersFile = path.resolve(__dirname, "data", "users.json")
const logsFile = path.resolve(__dirname, "data", "logs.json")


app.post("/register", register)

app.post("/login", login)

app.post("/logout", logout)

app.get("/secure", authenticate, secure)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})