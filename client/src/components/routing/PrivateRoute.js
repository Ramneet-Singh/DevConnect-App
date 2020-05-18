import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Spinner from "../layout/Spinner"
import { Route, Redirect } from "react-router-dom"

const PrivateRoute = ({
	component: Component,
	auth: { isAuthenticated, loading },
	...rest
}) => (
	<Route
		{...rest}
		render={(props) =>
			loading ? (
				<Spinner />
			) : isAuthenticated ? (
				<Component {...props} />
			) : (
				<Redirect to="/login" />
			)
		}
	/>
)

PrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	auth: state.auth,
})

export default connect(mapStateToProps)(PrivateRoute)
