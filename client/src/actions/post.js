import {
	GET_POSTS,
	POST_ERROR,
	SET_LOADING,
	CLEAR_POST,
	UPDATE_LIKES,
	POST_DELETED,
	POST_ADDED,
	GET_POST,
} from "./types"
import { setAlert } from "./alert"
import axios from "axios"

export const getPosts = () => async (dispatch) => {
	dispatch({
		type: CLEAR_POST,
	})
	dispatch({
		type: SET_LOADING,
	})
	try {
		const res = await axios.get("/api/posts")

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
		const res = await axios.put(`/api/posts/like/${post_id}`)

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
		const res = await axios.put(`/api/posts/unlike/${post_id}`)

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
		await axios.delete(`/api/posts/${post_id}`)

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

	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	}

	const body = {
		text,
	}

	try {
		const res = await axios.post("/api/posts", body, config)

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
		const res = await axios.get(`/api/posts/${id}`)

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
