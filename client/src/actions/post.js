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
} from "./types"
import { setAlert } from "./alert"
import api from "../utils/api"

export const getPosts = () => async (dispatch) => {
	dispatch({
		type: CLEAR_POST,
	})
	dispatch({
		type: SET_LOADING,
	})
	try {
		const res = await api.get("/posts")

		dispatch({
			type: GET_POSTS,
			payload: res.data,
		})
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		})
	}
}

// Add like
export const addLike = (post_id) => async (dispatch) => {
	dispatch({ type: SET_LOADING })

	try {
		const res = await api.put(`/posts/like/${post_id}`)

		dispatch({
			type: UPDATE_LIKES,
			payload: {
				post_id,
				likes: res.data,
			},
		})
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		})
	}
}

// Remove like
export const removeLike = (post_id) => async (dispatch) => {
	dispatch({
		type: SET_LOADING,
	})

	try {
		const res = await api.put(`/posts/unlike/${post_id}`)

		dispatch({
			type: UPDATE_LIKES,
			payload: {
				post_id,
				likes: res.data,
			},
		})
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		})
	}
}

// Delete post
export const deletePost = (post_id) => async (dispatch) => {
	dispatch({
		type: SET_LOADING,
	})

	try {
		await api.delete(`/posts/${post_id}`)

		dispatch({
			type: POST_DELETED,
			payload: post_id,
		})

		dispatch(setAlert("Post Removed", "success"))
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		})
	}
}

// Add post
export const addPost = (text) => async (dispatch) => {
	dispatch({
		type: SET_LOADING,
	})

	const body = {
		text,
	}

	try {
		const res = await api.post("/posts", body)

		dispatch({
			type: POST_ADDED,
			payload: res.data,
		})

		dispatch(setAlert("Post Added", "success"))
	} catch (err) {
		const errors = err.response.data.errors
		errors.forEach((error) => dispatch(setAlert(error.msg, "danger")))

		dispatch({
			type: POST_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		})
	}
}

// Get Post
export const getPost = (id) => async (dispatch) => {
	dispatch({ type: SET_LOADING })

	try {
		const res = await api.get(`/posts/${id}`)

		dispatch({
			type: GET_POST,
			payload: res.data,
		})
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		})
	}
}

// Add Comment
export const addComment = (post_id, text) => async (dispatch) => {
	dispatch({
		type: SET_LOADING,
	})

	try {
		const res = await api.post(`/posts/comment/${post_id}`, { text })

		dispatch({
			type: COMMENT_ADDED,
			payload: res.data,
		})
		dispatch(setAlert("Comment Added", "success"))
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		})
	}
}

export const deleteComment = (post_id, comment_id) => async (dispatch) => {
	dispatch({ type: SET_LOADING })

	try {
		const res = await api.delete(`/posts/comment/${post_id}/${comment_id}`)

		dispatch({ type: COMMENT_DELETED, payload: res.data })

		dispatch(setAlert("Comment Removed", "success"))
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		})
	}
}
