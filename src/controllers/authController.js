const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Generate JWT
const generateToken = (user) => {

	return jwt.sign(
		{
			userId: user._id,
			role: user.role
		},

		process.env.JWT_SECRET,

		{
			expiresIn: process.env.JWT_EXPIRES_IN || "1h"
		}
	);
};

// ==========================================
// REGISTER
// ==========================================

const register = async (req, res, next) => {

    try {

        const {
            name,
            email,
            password
        } = req.body;

        console.log("REGISTER REQUEST:", {
            name,
            email,
            passwordReceived: !!password
        });

        // Check whether user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(409).json({
                success: false,
                error: {
                    code: "USER_ALREADY_EXISTS",
                    message: "User already exists"
                }
            });
        }

        // Create user
        // Every public registration creates CUSTOMER
        const user = await User.create({
            name,
            email,
            password,
            role: "CUSTOMER"
        });

        console.log("USER CREATED:", user._id);

        res.status(201).json({

            success: true,

            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }

        });

    } catch (error) {

        console.error("================================");
        console.error("REGISTER ERROR:", error);
        console.error("ERROR MESSAGE:", error.message);
        console.error("ERROR STACK:", error.stack);
        console.error("================================");

        next(error);
    }
};
// ==========================================
// LOGIN
// ==========================================

const login = async (req, res, next) => {

	try {

		const {
			email,
			password
		} = req.body;

		// Find user
		const user = await User.findOne({ email });

		if (!user) {

			return res.status(401).json({
				success: false,
				error: {
					code: "INVALID_CREDENTIALS",
					message: "Invalid email or password"
				}
			});
		}

		// Compare password
		const isPasswordCorrect =
			await user.comparePassword(password);

		if (!isPasswordCorrect) {

			return res.status(401).json({
				success: false,
				error: {
					code: "INVALID_CREDENTIALS",
					message: "Invalid email or password"
				}
			});
		}

		// Generate JWT
		const token = generateToken(user);

		res.status(200).json({

			success: true,

			data: {
				accessToken: token,
				tokenType: "Bearer",
				expiresIn: process.env.JWT_EXPIRES_IN || "1h"
			}

		});

	} catch (error) {

		next(error);
	}
};

module.exports = {
	register,
	login
};
