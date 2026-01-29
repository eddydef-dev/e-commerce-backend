const { Schema, model } = require("mongoose")

const OrderItemsSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    quantity: {
        type: Number,
        required: true,
        min: 1
    },

    price: {
        type: Number,
        required: true
    }
})

const OrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    items: [OrderItemsSchema],

    total: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ["CREATED", "PAID", "CANCELLED"],
        default: "CREATED"
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = model("Order", OrderSchema)