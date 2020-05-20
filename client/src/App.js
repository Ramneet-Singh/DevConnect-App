import React, { Fragment, useEffect } from "react"
import Navbar from "./components/layout/Navbar"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Landing from "./components/layout/Landing"
import "./App.css"
import { loadUser } from "./actions/auth"
import setAuthToken from "./utils/setAuthToken"

// Redux
import { Provider } from "react-redux"
import store from "./store"
import Routes from "./components/routing/Routes"

const App = () => {
	useEffect(() => {
		setAuthToken(localStorage.getItem("token"))
		store.dispatch(loadUser())
	}, [])

	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Navbar />
					<Switch>
						<Route exact path="/" component={Landing} />
						<Route component={Routes} />
					</Switch>
				</Fragment>
			</Router>
		</Provider>
	)
}
export default App
