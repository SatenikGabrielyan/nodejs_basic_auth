const fs = require("node:fs").promises
const path = require("node:path")
const filePath = path.resolve(__dirname, "..", "data", "users.json")

const addUser = async (filePath, user) => {
    const users =  JSON.parse( await fs.readFile(path.resolve(__dirname, "..", "data", "users.json"), "utf-8"))
    users.push(user)
    await fs.writeFile(path.resolve(__dirname, "..", "data", "users.json"), JSON.stringify(users, null, 2))
}

const getUserByUserName = async(filePath, username) => {
    const users =  JSON.parse( await fs.readFile(filePath, "utf-8"))
    const found = users.find(user => user.username === username)
    return found
}

const validatePassword = (password) => {
    return password.trim().length > 5
}

const validateUsername = (username) => {
    return username.trim().length > 3
}

module.exports = {addUser, getUserByUserName, validatePassword, validateUsername}