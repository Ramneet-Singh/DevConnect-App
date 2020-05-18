import React, { useEffect, Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { deleteAccount, getCurrentProfile } from "../../actions/profile"
import Spinner from "../layout/Spinner"
import { Link } from "react-router-dom"
import DashboardActions from "./DashboardActions"
import Experience from "./Experience"
import Education from "./Education"

const Dashboard = ({
	auth: { user },
	profile: { loading, currentProfile },
	getCurrentProfile,
	deleteAccount,
}) => {
	useEffect(() => {
		getCurrentProfile()
	}, [getCurrentProfile])

	return (
		<Fragment>
			<h1 className="large text-primary">Dashboard</h1>
			<p className="lead">
				<i className="fas fa-user"></i> Welcome {user && user.name}
			</p>
			{loading ? (
				<Spinner />
			) : currentProfile === null ? (
				<Fragment>
					{" "}
					<p>You have not yet set up a profile, please add some info</p>
					<Link to="/profile-form" className="btn btn-primary my-1">
						Create Profile
					</Link>{" "}
					<div className="my-2">
						<button
							className="btn btn-danger"
							onClick={() => {
								if (
									window.confirm(
										"Are you sure you want to delete your account? This can NOT be undone."
									)
								) {
									window.scrollTo(0, 0)
									deleteAccount()
								}
							}}
						>
							<i className="fas fa-user-minus"></i>
							Delete My Account
						</button>
					</div>
				</Fragment>
			) : (
				<Fragment>
					<DashboardActions />
					<Experience experience={currentProfile.experience} />
					<Education education={currentProfile.education} />

					<div className="my-2">
						<button
							className="btn btn-danger"
							onClick={() => {
								if (
									window.confirm(
										"Are you sure you want to delete your account? This can NOT be undone."
									)
								) {
									window.scrollTo(0, 0)
									deleteAccount()
								}
							}}
						>
							<i className="fas fa-user-minus"></i>
							Delete My Account
						</button>
					</div>
				</Fragment>
			)}
		</Fragment>
	)
}

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	deleteAccount: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
	Dashboard
)
