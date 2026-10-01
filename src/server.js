require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

// --------------------------------------------------
// Middleware
// --------------------------------------------------

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use((req, res, next) => {
	console.log("REQUEST RECEIVED:", req.method, req.originalUrl);
	next();
});

// --------------------------------------------------
// Health Check
// --------------------------------------------------

app.get("/health", (req, res) => {
	res.status(200).json({
		success: true,
		message: "E-Commerce Product API is running"
	});
});

// --------------------------------------------------
// Product Routes
// --------------------------------------------------

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/auth", authRoutes);

// --------------------------------------------------
// Error Handler
// --------------------------------------------------

app.use(errorHandler);

// --------------------------------------------------
// Start Server
// --------------------------------------------------

const PORT = process.env.PORT || 5000;

const startServer = async () => {
	await connectDB();

	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
};

startServer();
