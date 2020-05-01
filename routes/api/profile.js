const express = require("express")
const axios = require("axios")
const config = require("config")
const router = express.Router()
const auth = require("../../middleware/auth")
const { check, validationResult } = require("express-validator")
const normalize = require("normalize-url")
const mongoose = require("mongoose")

const Profile = require("../../models/Profile")
const User = require("../../models/User")

// @route GET api/profile/me
// @desc Get current user's profile
// @access Private
router.get("/me", auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.user.id,
		}).populate("user", ["name", "avatar"])

		if (!profile) {
			return res
				.status(400)
				.json({ errors: [{ msg: "There is no profile for this user" }] })
		}

		res.json(profile)
	} catch (err) {
		console.log(err.message)
		res.status(500).json({ errors: [{ msg: "Server error" }] })
	}
})

// @route POST api/profile
// @desc Create or update user profile
// @access Private

router.post(
	"/",
	[
		auth,
		[
			check("status", "Status is required").notEmpty(),
			check("skills", "Skills are required").notEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const {
			company,
			website,
			location,
			status,
			skills,
			bio,
			githubusername,
			youtube,
			twitter,
			facebook,
			linkedin,
			instagram,
		} = req.body

		//Build profile object
		const profileFields = {
			user: req.user.id,
			company,
			location,
			website:
				website &&
				(website === "" ? "" : normalize(website, { forceHttps: true })),
			status,
			skills: Array.isArray(skills)
				? skills
				: skills.split(",").map((skill) => " " + skill.trim()),
			bio,
			githubusername,
		}

		//Build social object and add to profileFields
		const socialFields = { youtube, twitter, facebook, linkedin, instagram }

		for (const [key, value] of Object.entries(socialFields)) {
			if (value && value.length > 0) {
				socialFields[key] = normalize(value, { forceHttps: true })
			}
		}
		profileFields.social = socialFields

		try {
			let profile = await Profile.findOneAndUpdate(
				{ user: req.user.id },
				{ $set: profileFields },
				{ new: true, upsert: true }
			)
			res.json(profile)
		} catch (error) {
			console.error(error.message)
			res.status(500).json({ errors: [{ msg: "Server error" }] })
		}
	}
)

// @route GET api/profile
// @desc Get all profiles
// @access Public

router.get("/", async (req, res) => {
	try {
		const profiles = await Profile.find({}).populate("user", ["name", "avatar"])
		res.json(profiles)
	} catch (err) {
		console.error(err.message)
		res.status(500).json({ errors: [{ msg: "Server Error" }] })
	}
})

// @route GET api/profile/user/:user_id
// @desc Get profile by user id
// @access Public

router.get("/user/:user_id", async (req, res) => {
	try {
		const valid = mongoose.Types.ObjectId.isValid(req.params.user_id)
		if (!valid) {
			return res.status(400).json({ errors: [{ msg: "Profile not found" }] })
		}
		const profile = await Profile.findOne({
			user: req.params.user_id,
		}).populate("user", ["name", "avatar"])
		if (!profile)
			return res.status(400).json({ errors: [{ msg: "Profile not found" }] })
		res.json(profile)
	} catch (err) {
		console.error(err.message)
		res.status(500).json({ errors: [{ msg: "Server Error" }] })
	}
})

// @route DELETE api/profile
// @desc Delete profile,user and posts
// @access Private

router.delete("/", auth, async (req, res) => {
	try {
		// @todo: Remove posts

		//Remove profile
		await Profile.findOneAndRemove({ user: req.user.id })
		//Remove user
		await User.findOneAndRemove({ _id: req.user.id })

		res.json({ msg: "User deleted." })
	} catch (err) {
		console.error(err.message)
		res.status(500).json({ errors: [{ msg: "Server Error" }] })
	}
})

// @route PUT api/profile/experience
// @desc Add profile experience
// @access Private

router.put(
	"/experience",
	[
		auth,
		[
			check("title", "Title is required").notEmpty(),
			check("company", "Company is required").notEmpty(),
			check("from", "From date is required and needs to be before the to date")
				.notEmpty()
				.custom((value, { req }) => {
					return req.body.to ? value < req.body.to : true
				}),
		],
	],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const {
			company,
			location,
			current,
			title,
			from,
			to,
			description,
		} = req.body

		const expFields = {
			title,
			company,
			location,
			from,
			to,
			current,
			description,
		}

		try {
			const profile = await Profile.findOne({ user: req.user.id })

			profile.experience.unshift(expFields)

			await profile.save()
			res.json(profile)
		} catch (err) {
			console.error(err.message)
			res.status(500).json({ errors: [{ msg: "Server Error" }] })
		}
	}
)

// @route PUT api/profile/experience/:exp_id
// @desc Update profile experience
// @access Private

router.put(
	"/experience/:exp_id",
	[
		auth,
		[
			check("title", "Title is required").notEmpty(),
			check("company", "Company is required").notEmpty(),
			check("from", "From date is required and needs to be before the to date")
				.notEmpty()
				.custom((value, { req }) => {
					return req.body.to ? value < req.body.to : true
				}),
		],
	],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const {
			company,
			location,
			current,
			title,
			from,
			to,
			description,
		} = req.body

		const expFields = {
			title,
			company,
			location,
			from,
			to,
			current,
			description,
		}

		try {
			const profile = await Profile.findOne({ user: req.user.id })

			const updateIndex = profile.experience
				.map((item) => item._id.toString())
				.indexOf(req.params.exp_id)

			profile.experience[updateIndex] = expFields

			await profile.save()
			res.json(profile)
		} catch (err) {
			console.error(err.message)
			res.status(500).json({ errors: [{ msg: "Server Error" }] })
		}
	}
)

// @route DELETE /api/profile/experience/:exp_id
// @desc Delete profile experience
// @access Private

router.delete("/experience/:exp_id", auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id })

		const removeIndex = profile.experience
			.map((item) => item._id.toString())
			.indexOf(req.params.exp_id)

		profile.experience.splice(removeIndex, 1)

		await profile.save()

		res.json(profile)
	} catch (err) {
		console.error(err.message)
		res.status(500).json({ errors: [{ msg: "Server error" }] })
	}
})

// @route PUT /api/profile/education
// @desc Add profile education
// @access Private

router.put(
	"/education",
	[
		auth,
		[
			check("school", "School is required").notEmpty(),
			check("degree", "Degree is required").notEmpty(),
			check("fieldofstudy", "Field of study is required").notEmpty(),
			check("from", "From date is required and needs to be before to date")
				.notEmpty()
				.custom((value, { req }) => {
					return req.body.to ? value < req.body.to : true
				}),
		],
	],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const {
			school,
			degree,
			fieldofstudy,
			from,
			to,
			current,
			description,
		} = req.body

		const eduFields = {
			school,
			degree,
			fieldofstudy,
			from,
			to,
			current,
			description,
		}

		try {
			const profile = await Profile.findOne({ user: req.user.id })

			profile.education.unshift(eduFields)

			await profile.save()
			res.json(profile)
		} catch (err) {
			console.error(err.message)
			res.status(500).json({ errors: [{ msg: "Server error" }] })
		}
	}
)

// @route PUT /api/profile/education/:edu_id
// @desc Update profile education
// @access Private

router.put(
	"/education/:edu_id",
	[
		auth,
		[
			check("school", "School is required").notEmpty(),
			check("degree", "Degree is required").notEmpty(),
			check("fieldofstudy", "Field of study is required").notEmpty(),
			check("from", "From date is required and needs to be before to date")
				.notEmpty()
				.custom((value, { req }) => {
					return req.body.to ? value < req.body.to : true
				}),
		],
	],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const {
			school,
			degree,
			fieldofstudy,
			from,
			to,
			current,
			description,
		} = req.body

		const eduFields = {
			school,
			degree,
			fieldofstudy,
			from,
			to,
			current,
			description,
		}

		try {
			const profile = await Profile.findOne({ user: req.user.id })

			profile.education = profile.education.map((item) => {
				return item._id.toString() === req.params.edu_id ? eduFields : item
			})

			await profile.save()
			res.json(profile)
		} catch (err) {
			console.error(err.message)
			res.status(500).json({ errors: [{ msg: "Server error" }] })
		}
	}
)

// @route DELETE /api/profile/education/:edu_id
// @desc Delete profile education
// @access Private

router.delete("/education/:edu_id", auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id })

		profile.education = profile.education.filter((item) => {
			return item._id.toString() !== req.params.edu_id
		})

		await profile.save()

		res.json(profile)
	} catch (err) {
		console.error(err.message)
		res.status(500).json({ errors: [{ msg: "Server error" }] })
	}
})

// @route GET /api/profile/github/:username
// @desc Get Github Repos from GitHub API
// @access Public

router.get("/github/:username", async (req, res) => {
	const uri = encodeURI(
		`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
	)

	const headers = {
		"user-agent": "node.js",
		Authorization: `token ${config.get("githubToken")}`,
	}

	try {
		const githubResponse = await axios.get(uri, { headers })
		return res.json(githubResponse.data)
	} catch (err) {
		console.error(err.message)
		return res
			.status(404)
			.json({ errors: [{ msg: "No GitHub profile found" }] })
	}
})

module.exports = router
