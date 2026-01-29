const isAdmin = (req, res, next) => {
    if (req.user.role !== "ADMIN") {
        return res.status(403).json({
            status: "error",
            message: "Acceso denegado"
        })
    }

    next()
}

module.exports = isAdmin