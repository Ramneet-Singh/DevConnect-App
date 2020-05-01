const express = require("express")
const router = express.Router()
const auth = require("../../middleware/auth.js")
const User = require("../../models/User")
const { check, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")

// @route GET api/auth
// @desc Get user credentials (after verifying token through middleware)
// @access Private
router.get("/", auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password")
		res.json(user)
	} catch (err) {
		console.log(err.message)
		res.status(500).json({ errors: [{ msg: "Server error" }] })
	}
})

// @route POST api/auth
// @desc Authenticate user and get token
// @access Public
router.post(
	"/",
	[
		check("email", "Please enter a valid email").isEmail(),
		check("password", "Password is required").exists(),
	],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const { email, password } = req.body

		try {
			// See if user doesn't exist
			let user = await User.findOne({
				email: email,
			})

			if (!user) {
				return res
					.status(400)
					.json({ errors: [{ msg: "Invalid credentials" }] })
			}

			//Compare passwords
			const isMatch = await bcrypt.compare(password, user.password)
			if (!isMatch) {
				return res
					.status(400)
					.json({ errors: [{ msg: "Invalid credentials" }] })
			}

			// Send jsonwebtoken
			const payload = {
				user: {
					id: user.id,
				},
			}

			jwt.sign(
				payload,
				config.get("jwtSecret"),
				{
					expiresIn: 360000,
				},
				(err, token) => {
					if (err) throw err
					res.json({ token })
				}
			)
		} catch (error) {
			console.error(error.message)
			res.status(500).send("Server error")
		}
	}
)

module.exports = router
