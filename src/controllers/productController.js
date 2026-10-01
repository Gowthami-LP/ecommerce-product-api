const productService = require("../services/productService");

// CREATE PRODUCT
const createProduct = async (req, res, next) => {
	try {
		const product = await productService.createProduct(req.body);

		res.status(201).json({
			success: true,
			data: product
		});
	} catch (error) {
		next(error);
	}
};

// GET ALL PRODUCTS
const getProducts = async (req, res, next) => {
	try {
		const result = await productService.getProducts(req.query);

		res.status(200).json({
			success: true,
			data: result.products,
			pagination: result.pagination
		});
	} catch (error) {
		next(error);
	}
};

// GET PRODUCT BY ID
const getProductById = async (req, res, next) => {
	try {
		const product = await productService.getProductById(
			req.params.productId
		);

		if (!product) {
			return res.status(404).json({
				success: false,
				error: {
					code: "PRODUCT_NOT_FOUND",
					message: "Product not found"
				}
			});
		}

		res.status(200).json({
			success: true,
			data: product
		});
	} catch (error) {
		next(error);
	}
};

// UPDATE PRODUCT
const updateProduct = async (req, res, next) => {
	try {
		const product = await productService.updateProduct(
			req.params.productId,
			req.body
		);

		if (!product) {
			return res.status(404).json({
				success: false,
				error: {
					code: "PRODUCT_NOT_FOUND",
					message: "Product not found"
				}
			});
		}

		res.status(200).json({
			success: true,
			data: product
		});
	} catch (error) {
		next(error);
	}
};

// PATCH PRODUCT
const patchProduct = async (req, res, next) => {
	try {
		const product = await productService.updateProduct(
			req.params.productId,
			req.body
		);

		if (!product) {
			return res.status(404).json({
				success: false,
				error: {
					code: "PRODUCT_NOT_FOUND",
					message: "Product not found"
				}
			});
		}

		res.status(200).json({
			success: true,
			data: product
		});
	} catch (error) {
		next(error);
	}
};

// DELETE PRODUCT
const deleteProduct = async (req, res, next) => {
	try {
		const product = await productService.deleteProduct(
			req.params.productId
		);

		if (!product) {
			return res.status(404).json({
				success: false,
				error: {
					code: "PRODUCT_NOT_FOUND",
					message: "Product not found"
				}
			});
		}

		res.status(204).send();
	} catch (error) {
		next(error);
	}
};

module.exports = {
	createProduct,
	getProducts,
	getProductById,
	updateProduct,
	patchProduct,
	deleteProduct
};
