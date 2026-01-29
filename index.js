require("dotenv").config()

const { connection } = require("./database/connection")
const express = require("express")
const cors = require("cors")

console.log("Api arrancado correctamente")

connection()

const app = express()
const puerto = 3990

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const userRoutes = require("./routes/user")
const productRoutes = require("./routes/product")
const orderRoutes = require("./routes/order")

app.use("/api/user", userRoutes)
app.use("/api/product", productRoutes)
app.use("/api/order", orderRoutes)

app.listen(puerto, () => {
    console.log("app iniciada en el puerto: ", puerto)
})