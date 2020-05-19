import React, { useEffect, Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { getPost } from "../../actions/post"
import Spinner from "../layout/Spinner"
import PostItem from "../posts/PostItem"
import PostComment from "./PostComment"
import { Link } from "react-router-dom"
import CommentForm from "./CommentForm"

const Post = ({ getPost, post: { post, loading, error }, match }) => {
	useEffect(() => {
		getPost(match.params.post_id)
	}, [getPost, match.params.post_id])

	return loading || post === null ? (
		error && error.msg === "Not Found" ? (
			<span>Post has been deleted...</span>
		) : (
			<Spinner />
		)
	) : (
		<Fragment>
			<Link to="/posts" className="btn btn-light">
				Back To Posts
			</Link>
			<PostItem post={post} showActions={false} />
			<CommentForm post_id={post._id} />
			<div className="comments">
				{post.comments.length === 0 ? (
					<span>No Comments Yet...</span>
				) : (
					post.comments.map((comment) => (
						<PostComment
							comment={comment}
							post_id={post._id}
							key={comment._id}
						/>
					))
				)}
			</div>
		</Fragment>
	)
}

Post.propTypes = {
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	post: state.post,
})

export default connect(mapStateToProps, { getPost })(Post)
