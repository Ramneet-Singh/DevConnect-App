import React, { useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { addPost } from "../../actions/post"

const PostForm = ({ addPost }) => {
	const [text, setText] = useState("")

	const handleChange = (e) => setText(e.target.value)

	const handleSubmit = (e) => {
		e.preventDefault()
		window.scrollTo(0, 0)
		addPost(text)
	}

	return (
		<div className="post-form">
			<div className="bg-primary p">
				<h3>Say Something...</h3>
			</div>
			<form className="form my-1" onSubmit={handleSubmit}>
				<textarea
					name="text"
					cols="30"
					rows="5"
					placeholder="Create a post"
					value={text}
					required
					onChange={handleChange}
				></textarea>
				<input type="submit" className="btn btn-dark my-1" value="Submit" />
			</form>
		</div>
	)
}

PostForm.propTypes = {
	addPost: PropTypes.func.isRequired,
}

export default connect(null, { addPost })(PostForm)
