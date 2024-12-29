const path = require("node:path")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const usersFile = path.resolve(__dirname, "..", "data", "users.json")
const {getUserByUserName} = require("../utils/utils")
const {logEntry} = require("../utils/logger")

async function login(req, res){
    try {
        const {username, password} = req.body
             if(!username || !password){
                await logEntry("LOGIN", "Missing username or password")
                return res.json({status:400, message: "Username and password are required!"})
           }
        const found = await getUserByUserName(usersFile, username)
        if(!found){
             await logEntry("LOGIN", `Login failed. User '${username}' not found`)
             return res.json({status:401, message: "Username or password are invalid"})
          }
        const compared = await bcrypt.compare(password, found.password)
    
        if(!compared){
            await logEntry("LOGIN", `Login failed. Incorrect password for '${username}'.`)
            return res.json({status:401, message: "Username or password are invalid"})
         }
        const loginUser = {username, password}
        const token = jwt.sign(loginUser, process.env.SECRET_KEY, {expiresIn:"120s"})
        await logEntry("LOGIN", `User '${username}' logged in successfully`)
        return res.status(200).json({token,message: "User login successfully"})
    } catch (err) {
        console.error(err)
        await logEntry("ERROR", `Login failed for '${username}': ${err.message}`)
        return res.json({status:500, message: "Server error" })
    }

}

async function logout(req, res) {
    try {
        const { username } = req.body
        if (!username) {
            await logEntry("LOGOUT", "Missing username in logout request")
            return res.json({status:400, message: "Username is required!" })
        }
        await logEntry("LOGOUT", `User '${username}' logged out successfully`)
        return res.json({status:200, message: "User logged out successfully" })
    } catch (err) {
        console.error(err)
        await logEntry("ERROR", `Logout failed: ${err.message}`)
        return res.status(500).json({ message: "Server error" })
    }
}
module.exports = {login, logout}