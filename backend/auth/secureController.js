const path = require("node:path")
const usersFile = path.resolve(__dirname, "..","data", "users.json")

const {getAllUsers} = require("../utils/utils")

async function secure(req, res){
    try {
        const users = await getAllUsers(usersFile)
        const usernames = users.map(user => (user.username))
        return res.json(usernames)

    } catch(err){
        return res.json({status:500, message: "Error fetching data"})
    }

}

module.exports = {secure}