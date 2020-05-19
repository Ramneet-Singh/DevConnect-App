import React, { useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { addComment } from "../../actions/post"

const CommentForm = ({ addComment, post_id }) => {
	const [text, setText] = useState("")

	const handleChange = (e) => setText(e.target.value)

	const handleSubmit = (e) => {
		e.preventDefault()
		window.scrollTo(0, 0)
		addComment(post_id, text)
		setText("")
	}

	return (
		<div className="post-form">
			<div className="bg-primary p">
				<h3>Leave A Comment</h3>
			</div>
			<form className="form my-1" onSubmit={handleSubmit}>
				<textarea
					name="text"
					cols="30"
					rows="5"
					value={text}
					onChange={handleChange}
					placeholder="Comment on this post"
					required
				></textarea>
				<input type="submit" className="btn btn-dark my-1" value="Submit" />
			</form>
		</div>
	)
}

CommentForm.propTypes = {
	addComment: PropTypes.func.isRequired,
	post_id: PropTypes.string,
}

export default connect(null, { addComment })(CommentForm)
