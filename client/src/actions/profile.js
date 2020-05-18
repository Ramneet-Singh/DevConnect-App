import {
	GET_PROFILE,
	PROFILE_ERROR,
	UPDATE_PROFILE,
	CLEAR_PROFILE,
	ACCOUNT_DELETED,
	GET_PROFILES,
	GET_REPOS,
	SET_LOADING,
} from "./types"
import axios from "axios"
import { setAlert } from "./alert"

export const getCurrentProfile = () => async (dispatch) => {
	dispatch(setLoading())
	try {
		const res = await axios.get("/api/profile/me")

		dispatch({ type: GET_PROFILE, payload: res.data })
	} catch (err) {
		dispatch({
			type: CLEAR_PROFILE,
		})
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.data.errors[0].msg,
				status: err.response.status,
			},
		})
	}
}

// Get all profiles
export const getProfiles = () => async (dispatch) => {
	dispatch({
		type: CLEAR_PROFILE,
	})
	dispatch(setLoading())

	try {
		const res = await axios.get("/api/profile")

		dispatch({
			type: GET_PROFILES,
			payload: res.data,
		})
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		})
	}
}

// Get Profile by User ID
export const getProfileById = (user_id) => async (dispatch) => {
	dispatch(setLoading())
	try {
		const res = await axios.get(`/api/profile/user/${user_id}`)

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		})
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		})
	}
}

// Create or Update Profile
export const createProfile = (formData, history, edit = false) => async (
	dispatch
) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	}

	try {
		const res = await axios.post("/api/profile", formData, config)

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		})
		dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"))
		if (!edit) {
			history.push("/dashboard")
		}
	} catch (err) {
		const errors = err.response.data.errors
		errors.forEach((error) => dispatch(setAlert(error.msg, "danger")))

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		})
	}
}

// Add or Update Experience
export const addExperience = (formData, history, id = "") => async (
	dispatch
) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	}

	try {
		if (id === "") {
			const res = await axios.put("/api/profile/experience", formData, config)

			dispatch({
				type: UPDATE_PROFILE,
				payload: res.data,
			})

			dispatch(setAlert("Experience added", "success"))
			history.push("/dashboard")
		} else {
			const res = await axios.put(
				`/api/profile/experience/${id}`,
				formData,
				config
			)

			dispatch({
				type: UPDATE_PROFILE,
				payload: res.data,
			})

			dispatch(setAlert("Experience updated", "success"))
			history.push("/dashboard")
		}
	} catch (err) {
		const errors = err.response.data.errors
		errors.forEach((error) => dispatch(setAlert(error.msg, "danger")))

		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		})
	}
}

// Add or Update Education
export const addEducation = (formData, history, id = "") => async (
	dispatch
) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	}

	try {
		if (id === "") {
			const res = await axios.put("/api/profile/education", formData, config)

			dispatch({
				type: UPDATE_PROFILE,
				payload: res.data,
			})

			dispatch(setAlert("Education added", "success"))
			history.push("/dashboard")
		} else {
			const res = await axios.put(
				`/api/profile/education/${id}`,
				formData,
				config
			)

			dispatch({
				type: UPDATE_PROFILE,
				payload: res.data,
			})

			dispatch(setAlert("Education updated", "success"))
			history.push("/dashboard")
		}
	} catch (err) {
		const errors = err.response.data.errors
		errors.forEach((error) => dispatch(setAlert(error.msg, "danger")))

		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		})
	}
}

// Delete experience
export const deleteExperience = (exp_id) => async (dispatch) => {
	try {
		const res = await axios.delete(
			`/api/profile/experience/${exp_id.toString()}`
		)

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		})

		dispatch(setAlert("Experience Removed", "success"))
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		})
	}
}

// Delete education
export const deleteEducation = (edu_id) => async (dispatch) => {
	try {
		const res = await axios.delete(
			`/api/profile/education/${edu_id.toString()}`
		)

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		})

		dispatch(setAlert("Education Removed", "success"))
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		})
	}
}

// Delete account and profile
export const deleteAccount = () => async (dispatch) => {
	try {
		await axios.delete("/api/profile")

		dispatch({ type: CLEAR_PROFILE })
		dispatch({ type: ACCOUNT_DELETED })
		dispatch(setAlert("Your account has been permanently deleted."))
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		})
	}
}

// Get Github Repos By githubusername
export const getRepos = (username) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/profile/github/${username}`)

		dispatch({
			type: GET_REPOS,
			payload: res.data,
		})
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		})
	}
}

// Set loading true
export const setLoading = () => (dispatch) => {
	dispatch({
		type: SET_LOADING,
	})
}
