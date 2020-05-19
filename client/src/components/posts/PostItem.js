import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Moment from "react-moment"
import { Link } from "react-router-dom"
import { addLike, removeLike, deletePost } from "../../actions/post"

const PostItem = ({
	auth,
	post: { _id, text, date, likes, comments, user, name, avatar },
	addLike,
	removeLike,
	deletePost,
	showActions,
}) => {
	return (
		<div className="post bg-white p-1 my-1">
			<div>
				<Link to={`/profile/${user}`}>
					<img className="round-img" src={avatar} alt="" />
					<h4>{name}</h4>
				</Link>
			</div>
			<div>
				<p className="my-1">{text}</p>
				<p className="post-date">
					Posted on <Moment date={date} format="YYYY/MM/DD" />
				</p>
				{showActions && (
					<Fragment>
						<button
							type="button"
							className={
								likes.some(
									(like) => like.user.toString() === auth.user._id.toString()
								)
									? "btn btn-primary"
									: "btn btn-light"
							}
							disabled={likes.some(
								(like) => like.user.toString() === auth.user._id.toString()
							)}
							onClick={() => addLike(_id)}
						>
							<i className="fas fa-thumbs-up"></i>
							{likes.length > 0 && <span> {likes.length}</span>}
						</button>
						<button
							type="button"
							className={
								!likes.some(
									(like) => like.user.toString() === auth.user._id.toString()
								)
									? "btn"
									: "btn btn-light"
							}
							style={
								!likes.some(
									(like) => like.user.toString() === auth.user._id.toString()
								)
									? {
											color: "#888888",
									  }
									: {}
							}
							disabled={
								!likes.some(
									(like) => like.user.toString() === auth.user._id.toString()
								)
							}
							onClick={() => removeLike(_id)}
						>
							<i className="fas fa-thumbs-down"></i>
						</button>
						<Link to={`/posts/${_id}`} className="btn btn-primary">
							Discussion{" "}
							{comments.length > 0 && (
								<span className="comment-count"> {comments.length}</span>
							)}
						</Link>
						{!auth.loading && auth.user._id.toString() === user.toString() && (
							<button
								type="button"
								className="btn btn-danger"
								onClick={() => {
									if (
										window.confirm("Are you sure you want to delete this post?")
									) {
										window.scrollTo(0, 0)
										deletePost(_id)
									}
								}}
							>
								<i className="fas fa-times"></i>
							</button>
						)}
					</Fragment>
				)}
			</div>
		</div>
	)
}

PostItem.propTypes = {
	auth: PropTypes.object.isRequired,
	post: PropTypes.object.isRequired,
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired,
	deletePost: PropTypes.func.isRequired,
	showActions: PropTypes.bool,
}

PostItem.defaultProps = {
	showActions: true,
}

const mapStateToProps = (state) => ({
	auth: state.auth,
})

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
	PostItem
)
