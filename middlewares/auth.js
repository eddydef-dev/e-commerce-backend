const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            return res.status(401).json({
                status: "error",
                message: "Token no proporcionado"
            })
        }

        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                status: "error",
                message: "Token mal formado"
            })
        }

        const token = authHeader.split(" ")[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded

        next()

    } catch (error) {
        return res.status(401).json({
            status: "error",
            message: "Token inválido o expirado"
        })
    }
}

module.exports = auth
