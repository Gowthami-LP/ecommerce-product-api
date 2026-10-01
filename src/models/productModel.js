const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
	{
		sku: {
			type: String,
			required: true,
			unique: true,
			trim: true
		},

		name: {
			type: String,
			required: true,
			minlength: 3,
			maxlength: 100,
			trim: true
		},

		description: {
			type: String,
			required: true,
			minlength: 10
		},

		brand: {
			type: String,
			required: true,
			trim: true
		},

		category: {
			type: String,
			required: true,
			trim: true
		},

		price: {
			type: Number,
			required: true,
			min: 0
		},

		discount: {
			type: Number,
			default: 0,
			min: 0,
			max: 100
		},

		stock: {
			type: Number,
			required: true,
			min: 0
		},

		status: {
			type: String,
			enum: ["ACTIVE", "INACTIVE", "OUT_OF_STOCK"],
			default: "ACTIVE"
		},

		images: [
			{
				type: String
			}
		],

		rating: {
			type: Number,
			min: 0,
			max: 5,
			default: 0
		},

		specifications: {
			type: Map,
			of: String
		}
	},

	{
		timestamps: true
	}
);

module.exports = mongoose.model("Product", productSchema);
