const express = require("express")
const router = express.Router()

const productController = require("../controllers/productController")
const auth = require("../middlewares/auth")
const isAdmin = require("../middlewares/isAdmin")


// Products Routes
//Público
router.get("/", productController.list)
router.get("/:id", productController.getById)

// Admin
router.post("/", [auth, isAdmin], productController.create)
router.put("/:id", [auth, isAdmin], productController.update)
router.delete("/:id", [auth, isAdmin], productController.remove)

module.exports = router