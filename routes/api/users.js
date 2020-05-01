const express = require("express")
const router = express.Router()
const { check, validationResult } = require("express-validator")
const User = require("../../models/User")
const gravatar = require("gravatar")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")
const normalize = require("normalize-url")

// @route POST api/users
// @desc Register user
// @access Public
router.post(
	"/",
	[
		check("name", "Name is required").notEmpty(),
		check("email", "Please enter a valid email").isEmail(),
		check(
			"password",
			"Please input a password of 6 or more characters"
		).isLength({
			min: 6,
		}),
	],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const { name, email, password } = req.body

		try {
			// See if user exists
			let user = await User.findOne({
				email: email,
				name: name,
			})

			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: "User already exists." }] })
			}

			// Set avatar image
			const avatar = normalize(
				gravatar.url(email, {
					s: "200",
					r: "pg",
					d: "mm",
				}),
				{ forceHttps: true }
			)

			user = new User({
				name,
				password,
				email,
				avatar,
			})

			// Encrypt password
			const salt = await bcrypt.genSalt(10)
			user.password = await bcrypt.hash(password, salt)

			await user.save()

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
