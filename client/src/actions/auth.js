import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	AUTH_ERROR,
	USER_LOADED,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT,
	CLEAR_PROFILE,
} from "./types"
import api from "../utils/api"
import { setAlert } from "./alert"

// Load user
export const loadUser = () => async (dispatch) => {
	try {
		const res = await api.get("/auth")

		dispatch({
			type: USER_LOADED,
			payload: res.data,
		})
	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
		})
	}
}

// Register user
export const register = ({ name, email, password }) => async (dispatch) => {
	const body = JSON.stringify({ name, email, password })

	try {
		const res = await api.post("/users", body)

		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data,
		})

		dispatch(loadUser())
	} catch (err) {
		const errors = err.response.data.errors

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, "danger")))
		}
		dispatch({ type: REGISTER_FAIL })
	}
}

// Login user
export const login = ({ email, password }) => async (dispatch) => {
	const body = JSON.stringify({ email, password })

	try {
		const res = await api.post("/auth", body)

		dispatch({ type: LOGIN_SUCCESS, payload: res.data })

		dispatch(loadUser())
	} catch (err) {
		const errors = err.response.data.errors
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, "danger")))
		}

		dispatch({
			type: LOGIN_FAIL,
		})
	}
}

// Logout/ Clear Profile
export const logout = (history) => (dispatch) => {
	dispatch({ type: CLEAR_PROFILE })
	dispatch({
		type: LOGOUT,
	})
	history.push("/login")
}
