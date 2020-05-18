import { createStore, applyMiddleware } from "redux"
import rootReducer from "./reducers"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import setAuthToken from "./utils/setAuthToken"

const initialState = {}

const middleware = [thunk]

const store = createStore(
	rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

let currentState = {
	auth: {
		token: null,
		isAuthenticated: null,
		loading: true,
		user: null,
	},
}

store.subscribe(() => {
	let previousState = currentState
	currentState = store.getState()

	if (previousState.auth.token !== currentState.auth.token) {
		const token = currentState.auth.token
		setAuthToken(token)
	}
})

export default store
