const mongoose = require("mongoose")

const connection = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/E-commerce")

        console.log("Conectado a la base de datos correctamente")
    } catch (error) {
        console.error(error)

        throw new Error("No se ha podido conectar a la base de datos")
    }
}

module.exports = {
    connection
}