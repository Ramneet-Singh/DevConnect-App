import {
	GET_POSTS,
	POST_ERROR,
	SET_LOADING,
	CLEAR_POST,
	UPDATE_LIKES,
	POST_DELETED,
	POST_ADDED,
	GET_POST,
	COMMENT_ADDED,
	COMMENT_DELETED,
	LOGOUT,
} from "../actions/types"

const initialState = {
	posts: [],
	post: null,
	loading: true,
	error: {},
}

export default (state = initialState, action) => {
	const { type, payload } = action

	switch (type) {
		case GET_POSTS:
			return {
				...state,
				posts: payload,
				loading: false,
			}
		case GET_POST:
			return {
				...state,
				post: payload,
				loading: false,
			}
		case POST_DELETED:
			return {
				...state,
				posts: state.posts.filter(
					(post) => post._id.toString() !== payload.toString()
				),
				loading: false,
			}
		case POST_ADDED:
			return {
				...state,
				loading: false,
				posts: [payload, ...state.posts],
			}
		case COMMENT_ADDED:
		case COMMENT_DELETED:
			return {
				...state,
				loading: false,
				post: {
					...state.post,
					comments: payload,
				},
			}
		case POST_ERROR:
			return {
				...state,
				loading: false,
				error: payload,
			}
		case SET_LOADING:
			return {
				...state,
				loading: true,
			}
		case UPDATE_LIKES:
			return {
				...state,
				loading: false,
				posts: state.posts.map((post) =>
					post._id.toString() === payload.post_id.toString()
						? { ...post, likes: payload.likes }
						: post
				),
			}
		case CLEAR_POST:
			return {
				...state,
				post: null,
				loading: false,
			}
		case LOGOUT:
			return {
				...state,
				posts: [],
				post: null,
				loading: false,
				error: {},
			}
		default:
			return state
	}
}
