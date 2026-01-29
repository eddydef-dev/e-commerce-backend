const Product = require("../models/Product")
const product = require("../models/Product")

// Crear producto (ADMIN)
const create = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body

        if (!name || price == null || stock == null) {
            return res.status(400).json({
                status: "error",
                message: "Datos Incompletos"
            })
        }

        const product = new Prodruct({
            name,
            description,
            price,
            stock
        })

        await product.save()

        return res.status(201).json({
            status: "success",
            product
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            status: "error",
            message: "Error al crear producto"
        })
    }
}

// listar productos (PUBLICO)
const list = async (req, res) => {
    try {
        const products = await Product.find({ active: true })

        return res.status(200).json({
            status: "success",
            products
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error al listar productos"
        })
    }
}

// Obtener producto  por id (PUBLICO)
const getById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product || !product.active) {
            return res.status(404).json({
                status: "error",
                message: "Producto no encontrado"
            })
        }

        return res.status(200).json({
            status: "success",
            product
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error al obtener producto"
        })
    }
}

// Actualizar producto (ADMIN)
const update = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        if (!product) {
            return res.status(404).json({
                status: "success",
                message: "Producto no encontrado"
            })
        }

        return res.status(200).json({
            status: "success",
            product
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error al actualizar producto"
        })
    }
}


// Eliminar un producto (SOFT DELETE)
const remove = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { active: false },
            { new: true }
        )

        return res.status(200).json({
            status: "success",
            message: "Producto eliminado"
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error al eliminar producto"
        })
    }
}

module.exports = {
    create,
    list,
    getById,
    update,
    remove
}