import React, { Fragment, useEffect } from "react"
import Navbar from "./components/layout/Navbar"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Landing from "./components/layout/Landing"
import Register from "./components/auth/Register"
import Login from "./components/auth/Login"
import "./App.css"
import Alert from "./components/layout/Alert"
import { loadUser } from "./actions/auth"
import setAuthToken from "./utils/setAuthToken"
import Dashboard from "./components/dashboard/Dashboard"
import PrivateRoute from "./components/routing/PrivateRoute"
import ProfileForm from "./components/profile-forms/ProfileForm"
import ExperienceForm from "./components/profile-forms/ExperienceForm"
import EducationForm from "./components/profile-forms/EducationForm"
import Profile from "./components/profile/Profile"

// Redux
import { Provider } from "react-redux"
import store from "./store"
import Profiles from "./components/profiles/Profiles"
import Posts from "./components/posts/Posts"
import Post from "./components/post/Post"

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
					<Route exact path="/" component={Landing} />
					<section className="container">
						<Alert />
						<Switch>
							<Route exact path="/register" component={Register} />
							<Route exact path="/login" component={Login} />
							<Route exact path="/profiles" component={Profiles} />
							<Route exact path="/profile/:user_id" component={Profile} />
							<PrivateRoute exact path="/dashboard" component={Dashboard} />
							<PrivateRoute
								exact
								path="/profile-form"
								component={ProfileForm}
							/>
							<PrivateRoute
								exact
								path={["/experience-form", "/experience-form/:exp_id"]}
								component={ExperienceForm}
							/>
							<PrivateRoute
								exact
								path={["/education-form", "/education-form/:edu_id"]}
								component={EducationForm}
							/>
							<PrivateRoute exact path="/posts" component={Posts} />
							<PrivateRoute exact path="/posts/:post_id" component={Post} />
						</Switch>
					</section>
				</Fragment>
			</Router>
		</Provider>
	)
}
export default App
