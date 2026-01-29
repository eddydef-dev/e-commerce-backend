const express = require("express")
const router = express.Router()
const userController = require("../controllers/user")
const auth = require("../middlewares/auth")
const isAdmin = require("../middlewares/isAdmin")

router.post("/register", userController.register)

router.post("/login", userController.login)

router.get("/profile", auth, (req, res) => {
    return res.json({
        status: "success",
        user: req.user
    })
})

router.get("/admin-test", [auth, isAdmin], (req, res) => {
    return res.json({
        status: "success",
        message: "Prueba admin"
    })
})

module.exports = router