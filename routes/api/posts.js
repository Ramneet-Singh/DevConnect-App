const express = require("express")
const router = express.Router()
const auth = require("../../middleware/auth")
const { check, validationResult } = require("express-validator")
const mongoose = require("mongoose")

const User = require("../../models/User")
const Post = require("../../models/Post")

// @route POST api/posts
// @desc Add post
// @access Private
router.post(
	"/",
	[auth, [check("text", "Text is required").notEmpty()]],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		try {
			const user = await User.findById(req.user.id).select("-password")

			const newPost = new Post({
				user: req.user.id,
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
			})

			await newPost.save()

			res.json(newPost)
		} catch (err) {
			console.error(err.message)
			res.status(500).send("Server error")
		}
	}
)

// @route GET api/posts
// @desc Get all posts
// @access Private

router.get("/", auth, async (req, res) => {
	try {
		const posts = await Post.find({}).sort({ date: -1 })
		res.json(posts)
	} catch (err) {
		console.error(err.message)
		res.status(500).send("Server error")
	}
})

// @route GET api/posts/:post_id
// @desc Get post by ID
// @access Private

router.get("/:post_id", auth, async (req, res) => {
	const valid = mongoose.Types.ObjectId.isValid(req.params.post_id)
	if (!valid) {
		return res.status(404).json({ errors: [{ msg: "Post not found" }] })
	}

	try {
		const post = await Post.findById(req.params.post_id)

		if (!post) {
			return res.status(404).json({ errors: [{ msg: "Post not found" }] })
		}
		res.json(post)
	} catch (err) {
		console.error(err.message)
		res.status(500).send("Server error")
	}
})

// @route DELETE api/posts/:post_id
// @desc Delete post by ID
// @access Private

router.delete("/:post_id", auth, async (req, res) => {
	const valid = mongoose.Types.ObjectId.isValid(req.params.post_id)
	if (!valid) {
		return res.status(404).json({ errors: [{ msg: "Post not found" }] })
	}

	try {
		const post = await Post.findById(req.params.post_id)

		if (!post) {
			return res.status(404).json({ errors: [{ msg: "Post not found" }] })
		}

		if (post.user.toString() !== req.user.id) {
			return res
				.status(401)
				.json({ errors: [{ msg: "User authorization denied" }] })
		}

		await post.remove()

		res.json({ msg: "Post removed" })
	} catch (err) {
		console.error(err.message)
		res.status(500).send("Server error")
	}
})

// @route PUT api/posts/like/:post_id
// @desc Like a post
// @access Private

router.put("/like/:post_id", auth, async (req, res) => {
	const valid = mongoose.Types.ObjectId.isValid(req.params.post_id)
	if (!valid) {
		return res.status(404).json({ errors: [{ msg: "Post not found" }] })
	}
	try {
		const post = await Post.findById(req.params.post_id)
		if (!post) {
			return res.status(404).json({ errors: [{ msg: "Post not found" }] })
		}
		//Check if post has already been liked
		if (post.likes.some((like) => like.user.toString() === req.user.id)) {
			return res.status(400).json({ msg: "Post already liked" })
		}
		post.likes.unshift({ user: req.user.id })
		await post.save()
		res.json(post.likes)
	} catch (err) {
		console.error(err.message)
		res.status(500).send("Server error")
	}
})

// @route PUT api/posts/unlike/:post_id
// @desc Unlike a post
// @access Private

router.put("/unlike/:post_id", auth, async (req, res) => {
	const valid = mongoose.Types.ObjectId.isValid(req.params.post_id)
	if (!valid) {
		return res.status(404).json({ errors: [{ msg: "Post not found" }] })
	}
	try {
		const post = await Post.findById(req.params.post_id)
		if (!post) {
			return res.status(404).json({ errors: [{ msg: "Post not found" }] })
		}
		//Check if post has already been liked
		if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
			return res.status(400).json({ msg: "Post has not yet been liked" })
		}
		post.likes = post.likes.filter(
			(like) => like.user.toString() !== req.user.id
		)
		await post.save()
		res.json(post.likes)
	} catch (err) {
		console.error(err.message)
		res.status(500).send("Server error")
	}
})

// @route PUT api/posts/comment/:post_id
// @desc Add a comment
// @access Private

router.put(
	"/comment/:post_id",
	[auth, [check("text", "Text is required").notEmpty()]],
	async (req, res) => {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		try {
			const post = await Post.findById(req.params.post_id)
			const user = await User.findById(req.user.id).select("-password")
			const newComment = {
				user: req.user.id,
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
			}
			post.comments.unshift(newComment)
			await post.save()
			res.json(post.comments)
		} catch (err) {
			console.error(err.message)
			res.status(500).send("Server error")
		}
	}
)

// @route DELETE api/posts/comment/:post_id/:comment_id
// @desc Remove a comment from a post
// @access Private

router.delete("/comment/:post_id/:comment_id", auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.post_id)
		if (
			post.comments.filter(
				(comment) => comment._id.toString() === req.params.comment_id
			).length === 0
		) {
			return res.status(404).json({ msg: "Comment not found" })
		}
		if (
			post.comments
				.filter((comment) => comment._id.toString() === req.params.comment_id)
				.filter((comment) => comment.user.toString() === req.user.id).length ===
			0
		) {
			return res.status(401).json({ msg: "User authorization denied" })
		}
		post.comments = post.comments.filter(
			(comment) => comment._id.toString() !== req.params.comment_id
		)

		await post.save()
		return res.json(post.comments)
	} catch (err) {
		console.error(err.message)
		res.status(500).send("Server error")
	}
})

module.exports = router
