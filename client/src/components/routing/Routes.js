import React from "react"
import { Route, Switch } from "react-router-dom"
import Dashboard from "../dashboard/Dashboard"
import PrivateRoute from "../routing/PrivateRoute"
import ProfileForm from "../profile-forms/ProfileForm"
import ExperienceForm from "../profile-forms/ExperienceForm"
import EducationForm from "../profile-forms/EducationForm"
import Profile from "../profile/Profile"
import Profiles from "../profiles/Profiles"
import Posts from "../posts/Posts"
import Post from "../post/Post"
import NotFound from "../layout/NotFound"
import Register from "../auth/Register"
import Login from "../auth/Login"
import Alert from "../layout/Alert"

const Routes = () => {
	return (
		<section className="container">
			<Alert />
			<Switch>
				<Route exact path="/register" component={Register} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/profiles" component={Profiles} />
				<Route exact path="/profile/:user_id" component={Profile} />
				<PrivateRoute exact path="/dashboard" component={Dashboard} />
				<PrivateRoute exact path="/profile-form" component={ProfileForm} />
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
				<Route component={NotFound} />
			</Switch>
		</section>
	)
}

export default Routes
