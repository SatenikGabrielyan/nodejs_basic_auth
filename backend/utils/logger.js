const fs = require("node:fs").promises
const path = require("node:path")

const logsFile = path.resolve(__dirname, "..", "data", "logs.json")

async function logEntry(eventType, message) {
    const timestamp = new Date().toISOString()
    const logData = { timestamp, eventType, message }

    try {
        let logs = []
        try {
            logs = JSON.parse(await fs.readFile(logsFile, "utf-8"))
        } catch (err) {
            if (err.code !== "ENOENT") throw err
        }
        logs.push(logData)
        await fs.writeFile(logsFile, JSON.stringify(logs, null, 2))
    } catch (err) {
        console.error("Error writing log:", err.message)
    }
}

module.exports = { logEntry }
