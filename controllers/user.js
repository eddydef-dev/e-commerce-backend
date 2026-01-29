const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { generateToken } = require("../services/jwt")

const register = async (req, res) => {
    try {
        const { name, surname, email, password } = req.body

        // Validacion
        if (!name || !surname || !email || !password) {
            return res.status(400).json({
                status: "Error",
                message: "Faltan datos"
            })
        }

        // Verificar si existen
        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.status(400).json({
                status: "Error",
                message: "El usuario ya existe"
            })
        }

        // Encriptar password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Crear usuario
        const user = new User({
            name,
            surname,
            email,
            password: hashedPassword
        })

        await user.save()

        return res.status(201).json({
            status: "success",
            message: "Usuario creado correctamente"
        })
    } catch (error) {
        console.error(error)

        return res.status(500).json({
            status: "Error",
            message: "Error en el servidor"
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                status: "Error",
                message: "Faltan datos"
            })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({
                status: "Error",
                message: "Usuario no existe"
            })
        }

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(401).json({
                status: "error",
                message: "Credenciales incorrectas"
            })
        }

        const token = generateToken(user)

        return res.status(200).json({
            status: "success",
            message: "Login correcto",
            token
        })
    } catch (error) {
        console.error(error)

        return res.status(500).json({
            status: "error",
            message: "Error en el servidor"
        })
    }
}

module.exports = {
    register,
    login
}