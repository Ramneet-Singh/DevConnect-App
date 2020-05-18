import React from "react"
import { Link, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Spinner from "./Spinner"

const Landing = ({ isAuthenticated, loading }) => {
	if (loading) {
		return <Spinner />
	}

	if (isAuthenticated) {
		return <Redirect to="/dashboard" />
	}

	return (
		<section className="landing">
			<div className="dark-overlay">
				<div className="landing-inner">
					<h1 className="x-large">Developer Connector</h1>
					<p className="lead">
						Create a developer profile/portfolio, share posts and get help from
						other developers
					</p>
					<div className="buttons">
						<Link to="/register" className="btn btn-primary">
							Sign Up
						</Link>
						<Link to="/login" className="btn btn-light">
							Login
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}

Landing.propTypes = {
	isAuthenticated: PropTypes.bool,
	loading: PropTypes.bool,
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	loading: state.auth.loading,
})

export default connect(mapStateToProps)(Landing)
