const Order = require("../models/Order")
const Product = require("../models/Product")

const createOrder = async (req, res) => {
    try {
        const { items } = req.body
        const userId = req.user.id

        if (!items || items.length === 0) {
            return res.status(400).json({
                status: "error",
                message: "El pedido no tiene productos"
            })
        }

        let total = 0
        const orderItems = []

        for (let item of items) {
            const product = await Product.findById(item.productId)

            if (!product || !product.active) {
                return res.status(404).json({
                    status: "error",
                    message: "Producto no válido"
                })
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    status: "error",
                    message: `Stock insuficiente para ${product.name}`
                })
            }

            product.stock -= item.quantity
            await product.save()

            total += product.price * item.quantity

            orderItems.push({
                product: product._id,
                quantity: item.quantity,
                price: product.price
            })
        }

        const order = new Order({
            user: userId,
            items: orderItems,
            total
        })

        await order.save()

        return res.status(200).json({
            status: "success",
            order
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            status: "error",
            message: "Error al crear pedido"
        })
    }
}

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
            .populate("items.product", "name price")

        return res.status(200).json({
            status: "success",
            orders
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error al obtener pedidos"
        })
    }
}

module.exports = {
    createOrder,
    getMyOrders
}