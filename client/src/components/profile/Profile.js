import React, { useEffect, Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import Spinner from "../layout/Spinner"
import ProfileTop from "./ProfileTop"
import ProfileAbout from "./ProfileAbout"
import ProfileExperience from "./ProfileExperience"
import ProfileEducation from "./ProfileEducation"
import ProfileGithub from "./ProfileGithub"
import { getProfileById } from "../../actions/profile"

const Profile = ({
	match,
	getProfileById,
	profile: { currentProfile: profile, loading },
	auth,
}) => {
	useEffect(() => {
		getProfileById(match.params.user_id)
	}, [getProfileById, match.params.user_id])

	return (
		<Fragment>
			{loading || !profile ? (
				<Spinner />
			) : (
				<Fragment>
					<Link to="/profiles" className="btn btn-light">
						Back To Profiles
					</Link>
					{auth.isAuthenticated &&
						auth.loading === false &&
						auth.user._id === match.params.user_id && (
							<Link to="/profile-form" className="btn btn-dark">
								{" "}
								Edit Profile{" "}
							</Link>
						)}
					<div className="profile-grid my-1">
						<ProfileTop profile={profile} />
						<ProfileAbout profile={profile} />
						{profile.experience && (
							<div className="profile-exp bg-white p-2">
								<h2 className="text-primary">Experience</h2>
								{profile.experience.length > 0 ? (
									profile.experience.map((exp, index) => (
										<ProfileExperience experience={exp} key={index} />
									))
								) : (
									<span>No Experience Credentials</span>
								)}
							</div>
						)}
						{profile.education && (
							<div className="profile-edu bg-white p-2">
								<h2 className="text-primary">Education</h2>
								{profile.education.length > 0 ? (
									profile.education.map((edu, index) => (
										<ProfileEducation key={index} education={edu} />
									))
								) : (
									<span>No Education Credentials</span>
								)}
							</div>
						)}

						{profile.githubusername && (
							<ProfileGithub username={profile.githubusername} />
						)}
					</div>
				</Fragment>
			)}
		</Fragment>
	)
}

Profile.propTypes = {
	getProfileById: PropTypes.func.isRequired,
	auth: PropTypes.object,
	profile: PropTypes.object,
}

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth,
})

export default connect(mapStateToProps, { getProfileById })(Profile)
