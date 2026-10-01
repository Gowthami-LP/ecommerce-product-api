const Product = require("../models/productModel");

// Create product
const createProduct = async (productData) => {
	const product = await Product.create(productData);

	return product;
};

// Get all products
const getProducts = async (query) => {
	const {
		page = 1,
		limit = 20,
		search,
		category,
		brand,
		minPrice,
		maxPrice,
		status,
		sortBy = "createdAt",
		sortOrder = "desc"
	} = query;

	const filter = {};

	// Search by product name or description
	if (search) {
		filter.$or = [
			{ name: { $regex: search, $options: "i" } },
			{ description: { $regex: search, $options: "i" } }
		];
	}

	// Category filter
	if (category) {
		filter.category = category;
	}

	// Brand filter
	if (brand) {
		filter.brand = brand;
	}

	// Status filter
	if (status) {
		filter.status = status;
	}

	// Price filtering
	if (minPrice !== undefined || maxPrice !== undefined) {
		filter.price = {};

		if (minPrice !== undefined) {
			filter.price.$gte = Number(minPrice);
		}

		if (maxPrice !== undefined) {
			filter.price.$lte = Number(maxPrice);
		}
	}

	const skip = (page - 1) * limit;

	const sort = {
		[sortBy]: sortOrder === "asc" ? 1 : -1
	};

	const products = await Product.find(filter)
		.sort(sort)
		.skip(skip)
		.limit(Number(limit));

	const totalItems = await Product.countDocuments(filter);

	const totalPages = Math.ceil(totalItems / limit);

	return {
		products,
		pagination: {
			page: Number(page),
			limit: Number(limit),
			totalItems,
			totalPages
		}
	};
};

// Get product by ID
const getProductById = async (productId) => {
	return await Product.findById(productId);
};

// Update product
const updateProduct = async (productId, productData) => {
	return await Product.findByIdAndUpdate(
		productId,
		productData,
		{
			new: true,
			runValidators: true
		}
	);
};

// Delete product
const deleteProduct = async (productId) => {
	return await Product.findByIdAndDelete(productId);
};

module.exports = {
	createProduct,
	getProducts,
	getProductById,
	updateProduct,
	deleteProduct
};
