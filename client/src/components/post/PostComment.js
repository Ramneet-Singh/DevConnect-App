import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Moment from "react-moment"
import { Link } from "react-router-dom"
import { deleteComment } from "../../actions/post"

const PostComment = ({
	auth,
	comment: { _id, user, name, avatar, date, text },
	deleteComment,
	post_id,
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
				{auth.user._id.toString() === user.toString() && (
					<button
						type="button"
						onClick={() => {
							if (
								window.confirm("Are you sure you want to delete this comment?")
							) {
								window.scrollTo(0, 0)
								deleteComment(post_id, _id)
							}
						}}
						className="btn btn-danger"
					>
						<i className="fas fa-times"></i>
					</button>
				)}
			</div>
		</div>
	)
}

PostComment.propTypes = {
	auth: PropTypes.object.isRequired,
	comment: PropTypes.object.isRequired,
	deleteComment: PropTypes.func.isRequired,
	post_id: PropTypes.string,
}

const mapStateToProps = (state) => ({
	auth: state.auth,
})

export default connect(mapStateToProps, { deleteComment })(PostComment)
