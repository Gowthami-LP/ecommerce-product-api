const express = require("express");

const {
	createProduct,
	getProducts,
	getProductById,
	updateProduct,
	patchProduct,
	deleteProduct
} = require("../controllers/productController");

const {
	authenticate,
	authorize
} = require("../middleware/authMiddleware");

const router = express.Router();

// Anyone can view products
router.get("/", getProducts);

router.get("/:productId", getProductById);

// Only ADMIN can create
router.post(
	"/",
	authenticate,
	authorize("ADMIN"),
	createProduct
);

// Only ADMIN can replace
router.put(
	"/:productId",
	authenticate,
	authorize("ADMIN"),
	updateProduct
);

// Only ADMIN can partially update
router.patch(
	"/:productId",
	authenticate,
	authorize("ADMIN"),
	patchProduct
);

// Only ADMIN can delete
router.delete(
	"/:productId",
	authenticate,
	authorize("ADMIN"),
	deleteProduct
);

module.exports = router;
