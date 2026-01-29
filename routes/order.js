const express = require("express")
const router = express.Router()
const auth = require("../middlewares/auth")

const orderController = require("../controllers/orderController")

router.post("/", auth, orderController.createOrder)
router.get("/my-orders", auth, orderController.getMyOrders)

module.exports = router