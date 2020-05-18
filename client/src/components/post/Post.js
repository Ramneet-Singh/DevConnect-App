import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { getPost } from "../../actions/post"
import Spinner from "../layout/Spinner"

const Post = ({ getPost, post: { post, loading }, match }) => {
	useEffect(() => {
		getPost(match.params.post_id)
	}, [getPost, match.params.post_id])

	return loading ? <Spinner /> : <div>Post</div>
}

Post.propTypes = {
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	post: state.post,
})

export default connect(mapStateToProps, { getPost })(Post)
