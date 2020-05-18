import React, { Fragment, useState } from "react"
import { Link, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import { login } from "../../actions/auth"
import PropTypes from "prop-types"

const Login = ({ login, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	})
	const { email, password } = formData

	const handleChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value })

	const handleSubmit = async (e) => {
		e.preventDefault()
		login({ email, password })
	}

	if (isAuthenticated) {
		return <Redirect to="/dashboard" />
	}

	return (
		<Fragment>
			<h1 className="large text-primary">Sign In</h1>
			<p className="lead">
				<i className="fas fa-user"></i> Sign Into Your Account
			</p>
			<form className="form" onSubmit={(e) => handleSubmit(e)}>
				<div className="form-group">
					<input
						type="email"
						placeholder="Email Address"
						name="email"
						value={email}
						onChange={(e) => handleChange(e)}
						autoComplete="username"
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Password"
						name="password"
						value={password}
						onChange={(e) => handleChange(e)}
						minLength="6"
						autoComplete="new-password"
					/>
				</div>
				<input type="submit" className="btn btn-primary" value="Login" />
			</form>
			<p className="my-1">
				Don't have an account? <Link to="/register">Sign Up</Link>
			</p>
		</Fragment>
	)
}

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { login })(Login)
