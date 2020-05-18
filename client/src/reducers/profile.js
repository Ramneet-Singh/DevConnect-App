import {
	GET_PROFILE,
	PROFILE_ERROR,
	CLEAR_PROFILE,
	UPDATE_PROFILE,
	GET_PROFILES,
	GET_REPOS,
	SET_LOADING,
} from "../actions/types"

const initialState = {
	currentProfile: null,
	profiles: [],
	repos: [],
	loading: true,
	error: {},
}

export default (state = initialState, action) => {
	const { payload, type } = action

	switch (type) {
		case UPDATE_PROFILE:
		case GET_PROFILE:
			return {
				...state,
				currentProfile: payload,
				loading: false,
			}
		case GET_PROFILES:
			return {
				...state,
				profiles: payload,
				loading: false,
			}
		case GET_REPOS:
			return {
				...state,
				repos: payload,
				loading: false,
			}
		case PROFILE_ERROR:
			return {
				...state,
				loading: false,
				error: payload,
			}
		case CLEAR_PROFILE:
			return {
				...state,
				loading: false,
				currentProfile: null,
				repos: [],
			}
		case SET_LOADING:
			return {
				...state,
				loading: true,
			}
		default:
			return state
	}
}
