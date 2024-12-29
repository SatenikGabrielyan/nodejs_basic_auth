const bcrypt = require("bcrypt")
const path = require("node:path")
const {getUserByUserName, addUser, validatePassword, validateUsername} = require("../utils/utils")
const {logEntry} = require("../utils/logger")

const usersFile = path.resolve(__dirname, "..","data", "users.json")


async function register(req, res){
    const {username, password} = req.body
    if(!username || !password){
        await logEntry("REGISTER", "Missing username or password")
        return res.send({status:400, message: "Username and password are required!"})
    }
    if(!validatePassword(password)) {
        return res.json({status:400, message: "Password must be at least 6 character"})
    }
    if(!validateUsername(username)) {
        return res.json({status:400, message: "Username must be at least 4 character"})
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const newUser = {username, password:hashedPassword} 
    try {
        const existedUser = await getUserByUserName(usersFile, username)
        if(existedUser) {
            await logEntry("REGISTER", `Username '${username}' already exists`)
            return res.json({status:400, message: "User already exists"})
        }
        await addUser(usersFile, newUser)
        await logEntry("REGISTER", `User '${username}' registered successfully.`)
        return res.json({status:203,message: "User registered successfully!!"})

    } catch (err) {
        console.error(err)
        await logEntry("ERROR", `Registration failed for '${username}': ${err.message}`)
        return res.json({status:500, message: "Server error" })
    }
}


module.exports = {register}