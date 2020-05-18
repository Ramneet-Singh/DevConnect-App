import React, { useEffect, useState, Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { getCurrentProfile, addEducation } from "../../actions/profile"
import { Link } from "react-router-dom"
import moment from "moment"

const EducationForm = ({
	match: {
		params: { edu_id },
	},
	loading,
	currentProfile,
	addEducation,
	getCurrentProfile,
	history,
}) => {
	const [formData, setFormData] = useState({
		school: "",
		degree: "",
		fieldofstudy: "",
		from: "",
		to: "",
		current: false,
		description: "",
	})
	const {
		school,
		degree,
		fieldofstudy,
		from,
		to,
		current,
		description,
	} = formData

	const [toDateDisabled, toggleDisabled] = useState(current ? true : false)

	useEffect(() => {
		if (!currentProfile) {
			getCurrentProfile()
		}
		setFormData({
			school:
				loading ||
				currentProfile.education === null ||
				!edu_id ||
				!currentProfile.education.find((edu) => edu._id.toString() === edu_id)
					? ""
					: currentProfile.education.find(
							(edu) => edu._id.toString() === edu_id.toString()
					  ).school,
			degree:
				loading ||
				currentProfile.education === null ||
				!edu_id ||
				!currentProfile.education.find((edu) => edu._id.toString() === edu_id)
					? ""
					: currentProfile.education.find(
							(edu) => edu._id.toString() === edu_id
					  ).degree,
			fieldofstudy:
				loading ||
				currentProfile.education === null ||
				!edu_id ||
				!currentProfile.education.find((edu) => edu._id.toString() === edu_id)
					? ""
					: currentProfile.education.find(
							(edu) => edu._id.toString() === edu_id
					  ).fieldofstudy,
			from:
				loading ||
				currentProfile.education === null ||
				!edu_id ||
				!currentProfile.education.find((edu) => edu._id.toString() === edu_id)
					? ""
					: currentProfile.education.find(
							(edu) => edu._id.toString() === edu_id
					  ).from,
			to:
				loading ||
				currentProfile.education === null ||
				!edu_id ||
				!currentProfile.education.find(
					(edu) => edu._id.toString() === edu_id
				) ||
				currentProfile.education.find((edu) => edu._id.toString() === edu_id)
					.to === null
					? ""
					: currentProfile.education.find(
							(edu) => edu._id.toString() === edu_id
					  ).to,
			current:
				loading ||
				currentProfile.education === null ||
				!edu_id ||
				!currentProfile.education.find((edu) => edu._id.toString() === edu_id)
					? false
					: currentProfile.education.find(
							(edu) => edu._id.toString() === edu_id
					  ).current,
			description:
				loading ||
				currentProfile.education === null ||
				!edu_id ||
				!currentProfile.education.find((edu) => edu._id.toString() === edu_id)
					? ""
					: currentProfile.education.find(
							(edu) => edu._id.toString() === edu_id
					  ).description,
		})
		if (
			edu_id &&
			currentProfile &&
			currentProfile.education.find((edu) => edu._id.toString() === edu_id) &&
			currentProfile.education.find((edu) => edu._id.toString() === edu_id)
				.to === null
		) {
			toggleDisabled(true)
		}
	}, [edu_id, currentProfile, loading, getCurrentProfile])

	const handleChange = (e) => {
		e.target.type === "checkbox"
			? setFormData({
					...formData,
					current: e.target.checked,
			  })
			: setFormData({
					...formData,
					[e.target.name]: e.target.value,
			  })

		if (e.target.type === "checkbox") {
			toggleDisabled(e.target.checked)
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		window.scrollTo(0, 0)
		addEducation(formData, history, edu_id ? edu_id : "")
	}

	return (
		<Fragment>
			<h1 className="large text-primary">
				{edu_id ? "Edit" : "Add"} Your Education
			</h1>
			<p className="lead">
				<i className="fas fa-code-branch"></i> {edu_id ? "Edit" : "Add"} any
				school or bootcamp that you have attended in the past
			</p>
			<small style={{ fontFamily: "sans-serif" }}>* = required field</small>
			<form className="form" onSubmit={handleSubmit}>
				<div className="form-group">
					<input
						type="text"
						placeholder="* School or Bootcamp"
						name="school"
						value={school}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="* Degree or Certificate"
						name="degree"
						value={degree}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Field of Study"
						name="fieldofstudy"
						value={fieldofstudy}
						onChange={handleChange}
					/>
				</div>
				<div className="form-group">
					<h4>From Date</h4>
					<input
						type="date"
						name="from"
						value={from === "" ? "" : moment(from).format("YYYY-MM-DD")}
						onChange={handleChange}
					/>
				</div>
				<div className="form-group">
					<p>
						<input
							type="checkbox"
							name="current"
							checked={current}
							onChange={handleChange}
						/>{" "}
						Current School or Bootcamp
					</p>
				</div>
				<div className="form-group">
					<h4>To Date</h4>
					<input
						type="date"
						name="to"
						disabled={toDateDisabled}
						value={to === "" ? "" : moment(to).format("YYYY-MM-DD")}
						onChange={handleChange}
					/>
				</div>
				<div className="form-group">
					<textarea
						name="description"
						cols="30"
						rows="5"
						placeholder="Program Description"
						style={{ fontFamily: "Raleway" }}
						value={description}
						onChange={handleChange}
					></textarea>
				</div>
				<input type="submit" className="btn btn-primary my-1" />
				<Link className="btn btn-light my-1" to="/dashboard">
					Go Back
				</Link>
			</form>
		</Fragment>
	)
}

EducationForm.propTypes = {
	addEducation: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	loading: PropTypes.bool,
	currentProfile: PropTypes.object,
}

const mapStateToProps = (state) => ({
	loading: state.profile.loading,
	currentProfile: state.profile.currentProfile,
})

export default connect(mapStateToProps, { addEducation, getCurrentProfile })(
	EducationForm
)
