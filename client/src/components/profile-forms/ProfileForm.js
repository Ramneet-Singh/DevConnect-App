import React, { Fragment, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { createProfile, getCurrentProfile } from "../../actions/profile"
import PropTypes from "prop-types"

const ProfileForm = ({
	profile: { currentProfile, loading },
	createProfile,
	getCurrentProfile,
	history,
}) => {
	const [formData, setFormData] = useState({
		company: "",
		location: "",
		website: "",
		status: "",
		skills: "",
		githubusername: "",
		bio: "",
		youtube: "",
		facebook: "",
		linkedin: "",
		twitter: "",
		instagram: "",
		edit: false,
	})

	const [displaySocialMediaLinks, toggleSocialMediaLinks] = useState(false)

	const {
		company,
		location,
		facebook,
		linkedin,
		website,
		status,
		skills,
		githubusername,
		bio,
		youtube,
		twitter,
		instagram,
		edit,
	} = formData

	const handleChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value })

	const handleSubmit = (e) => {
		e.preventDefault()
		window.scrollTo(0, 0)
		createProfile(formData, history, edit)
	}

	useEffect(() => {
		if (!currentProfile) {
			getCurrentProfile()
		}
		if (currentProfile !== null) {
			setFormData({
				company:
					loading || !currentProfile.company ? "" : currentProfile.company,
				website:
					loading || !currentProfile.website ? "" : currentProfile.website,
				location:
					loading || !currentProfile.location ? "" : currentProfile.location,
				status: loading || !currentProfile.status ? "" : currentProfile.status,
				skills:
					loading || !currentProfile.skills
						? ""
						: currentProfile.skills.join(","),
				githubusername:
					loading || !currentProfile.githubusername
						? ""
						: currentProfile.githubusername,
				bio: loading || !currentProfile.bio ? "" : currentProfile.bio,
				facebook:
					loading || !currentProfile.social || !currentProfile.social.facebook
						? ""
						: currentProfile.social.facebook,
				twitter:
					loading || !currentProfile.social || !currentProfile.social.twitter
						? ""
						: currentProfile.social.twitter,
				youtube:
					loading || !currentProfile.social || !currentProfile.social.youtube
						? ""
						: currentProfile.social.youtube,
				instagram:
					loading || !currentProfile.social || !currentProfile.social.instagram
						? ""
						: currentProfile.social.instagram,
				linkedin:
					loading || !currentProfile.social || !currentProfile.social.linkedin
						? ""
						: currentProfile.social.linkedin,
				edit: currentProfile === null ? false : true,
			})
		}
	}, [loading, getCurrentProfile, currentProfile])

	return (
		<Fragment>
			<h1 className="large text-primary">
				{edit ? "Edit" : "Create"} Your Profile
			</h1>
			<p className="lead">
				<i className="fas fa-user"></i> Let's get some information to make your
				profile stand out
			</p>
			<small style={{ fontFamily: "sans-serif" }}> * = required field</small>
			<form className="form" onSubmit={handleSubmit}>
				<div className="form-group">
					<select name="status" value={status} onChange={handleChange}>
						<option value="0">* Select Professional Status</option>
						<option value="Developer">Developer</option>
						<option value="Junior Developer">Junior Developer</option>
						<option value="Senior Developer">Senior Developer</option>
						<option value="Manager">Manager</option>
						<option value="Student or Learning">Student or Learning</option>
						<option value="Instructor">Instructor or Teacher</option>
						<option value="Intern">Intern</option>
						<option value="Other">Other</option>
					</select>
					<small className="form-text">
						Give us an idea of where you are at in your career
					</small>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Company"
						name="company"
						value={company}
						onChange={handleChange}
					/>
					<small className="form-text">
						Could be your own company or one you work for
					</small>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Website"
						name="website"
						value={website}
						onChange={handleChange}
					/>
					<small className="form-text">
						Could be your own or a company website
					</small>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Location"
						name="location"
						value={location}
						onChange={handleChange}
					/>
					<small className="form-text">
						City {"&"} state suggested (eg. Boston, MA)
					</small>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="* Skills"
						name="skills"
						value={skills}
						onChange={handleChange}
					/>
					<small className="form-text">
						Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
					</small>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Github Username"
						name="githubusername"
						value={githubusername}
						onChange={handleChange}
					/>
					<small className="form-text">
						If you want your latest repos and a Github link, include your
						username
					</small>
				</div>
				<div className="form-group">
					<textarea
						placeholder="A short bio of yourself"
						name="bio"
						style={{ fontFamily: "Raleway" }}
						value={bio}
						onChange={handleChange}
					></textarea>
					<small className="form-text">Tell us a little about yourself</small>
				</div>

				<div className="my-2">
					<button
						type="button"
						onClick={() => toggleSocialMediaLinks(!displaySocialMediaLinks)}
						className="btn btn-light"
					>
						Add Social Network Links
					</button>
					<span>Optional</span>

					{displaySocialMediaLinks && (
						<Fragment>
							<div className="form-group social-input">
								<i className="fab fa-twitter fa-2x"></i>
								<input
									type="text"
									placeholder="Twitter URL"
									name="twitter"
									value={twitter}
									onChange={handleChange}
								/>
							</div>

							<div className="form-group social-input">
								<i className="fab fa-facebook fa-2x"></i>
								<input
									type="text"
									placeholder="Facebook URL"
									name="facebook"
									value={facebook}
									onChange={handleChange}
								/>
							</div>

							<div className="form-group social-input">
								<i className="fab fa-youtube fa-2x"></i>
								<input
									type="text"
									placeholder="YouTube URL"
									name="youtube"
									value={youtube}
									onChange={handleChange}
								/>
							</div>

							<div className="form-group social-input">
								<i className="fab fa-linkedin fa-2x"></i>
								<input
									type="text"
									placeholder="Linkedin URL"
									name="linkedin"
									value={linkedin}
									onChange={handleChange}
								/>
							</div>

							<div className="form-group social-input">
								<i className="fab fa-instagram fa-2x"></i>
								<input
									type="text"
									placeholder="Instagram URL"
									name="instagram"
									value={instagram}
									onChange={handleChange}
								/>
							</div>
						</Fragment>
					)}
				</div>
				<input type="submit" className="btn btn-primary my-1" />
				<Link className="btn btn-light my-1" to="/dashboard">
					Go Back
				</Link>
			</form>
		</Fragment>
	)
}

ProfileForm.propTypes = {
	createProfile: PropTypes.func.isRequired,
	currentProfile: PropTypes.object,
	loading: PropTypes.bool,
	getCurrentProfile: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	profile: state.profile,
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
	ProfileForm
)
