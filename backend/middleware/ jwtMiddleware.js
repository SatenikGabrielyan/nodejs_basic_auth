const jwt = require("jsonwebtoken")

const authenticate = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    if (!authHeader) {
        return res.status(401).json({ message: "No header provided" })
    }
    const [bearer, token] = authHeader.split(" ")
    if (bearer !== "Bearer" || !token) {
        return res.status(401).json({ message: "Invalid token format" })
    }
    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY)
        req.user = verified
        next()
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" })
    }
}

module.exports = { authenticate }
