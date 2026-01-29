const { Schema, model } = require("mongoose")

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },

    surname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["ADMIN", "CUSTOMER"],
        default: "CUSTOMER"
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = model("User", UserSchema)