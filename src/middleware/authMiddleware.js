const jwt = require("jsonwebtoken");

// ==========================================
// AUTHENTICATION MIDDLEWARE
// ==========================================

const authenticate = (req, res, next) => {

	try {

		const authHeader = req.headers.authorization;

		// Check Authorization header
		if (!authHeader) {

			return res.status(401).json({
				success: false,
				error: {
					code: "AUTHENTICATION_REQUIRED",
					message: "Authentication token is required"
				}
			});
		}

		// Expected format:
		// Authorization: Bearer TOKEN

		const parts = authHeader.split(" ");

		if (
			parts.length !== 2 ||
			parts[0] !== "Bearer"
		) {

			return res.status(401).json({
				success: false,
				error: {
					code: "INVALID_AUTH_HEADER",
					message: "Authorization header must use Bearer token"
				}
			});
		}

		const token = parts[1];

		// Verify token
		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET
		);

		// Store authenticated user information
		// in request object
		req.user = decoded;

		next();

	} catch (error) {

		return res.status(401).json({
			success: false,
			error: {
				code: "INVALID_TOKEN",
				message: "Invalid or expired token"
			}
		});
	}
};

// ==========================================
// AUTHORIZATION MIDDLEWARE
// ==========================================

const authorize = (...allowedRoles) => {

	return (req, res, next) => {

		if (!req.user) {

			return res.status(401).json({
				success: false,
				error: {
					code: "AUTHENTICATION_REQUIRED",
					message: "Authentication required"
				}
			});
		}

		if (!allowedRoles.includes(req.user.role)) {

			return res.status(403).json({
				success: false,
				error: {
					code: "FORBIDDEN",
					message: "You do not have permission to perform this action"
				}
			});
		}

		next();
	};
};

module.exports = {
	authenticate,
	authorize
};
