const jwt = require("jsonwebtoken")
const config = require("config")

module.exports = function (req, res, next) {
	//Get token from request header
	const token = req.header("x-auth-token")

	//check if not token
	if (!token) {
		return res
			.status(401)
			.json({ errors: [{ msg: "No token, authorization denied" }] })
	}

	//verify token
	try {
		const decoded = jwt.verify(token, config.get("jwtSecret"))
		req.user = decoded.user
		next()
	} catch (err) {
		console.log(err.message)
		res
			.status(401)
			.json({ errors: [{ msg: "Token is not valid, authorization denied" }] })
	}
}
