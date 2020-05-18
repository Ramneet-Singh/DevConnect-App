import React, { useEffect, useState, Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { getCurrentProfile, addExperience } from "../../actions/profile"
import { Link } from "react-router-dom"
import moment from "moment"

const ExperienceForm = ({
	match: {
		params: { exp_id },
	},
	loading,
	currentProfile,
	addExperience,
	getCurrentProfile,
	history,
}) => {
	const [formData, setFormData] = useState({
		title: "",
		company: "",
		location: "",
		from: "",
		to: "",
		current: false,
		description: "",
	})
	const { title, company, location, from, to, current, description } = formData

	const [toDateDisabled, toggleDisabled] = useState(current ? true : false)

	useEffect(() => {
		if (!currentProfile) {
			getCurrentProfile()
		}
		setFormData({
			title:
				loading ||
				currentProfile.experience === null ||
				!exp_id ||
				!currentProfile.experience.find((exp) => exp._id.toString() === exp_id)
					? ""
					: currentProfile.experience.find(
							(exp) => exp._id.toString() === exp_id
					  ).title,
			company:
				loading ||
				currentProfile.experience === null ||
				!exp_id ||
				!currentProfile.experience.find((exp) => exp._id.toString() === exp_id)
					? ""
					: currentProfile.experience.find(
							(exp) => exp._id.toString() === exp_id
					  ).company,
			location:
				loading ||
				currentProfile.experience === null ||
				!exp_id ||
				!currentProfile.experience.find((exp) => exp._id.toString() === exp_id)
					? ""
					: currentProfile.experience.find(
							(exp) => exp._id.toString() === exp_id
					  ).location,
			from:
				loading ||
				currentProfile.experience === null ||
				!exp_id ||
				!currentProfile.experience.find((exp) => exp._id.toString() === exp_id)
					? ""
					: currentProfile.experience.find(
							(exp) => exp._id.toString() === exp_id
					  ).from,
			to:
				loading ||
				currentProfile.experience === null ||
				!exp_id ||
				!currentProfile.experience.find(
					(exp) => exp._id.toString() === exp_id
				) ||
				currentProfile.experience.find((exp) => exp._id.toString() === exp_id)
					.to === null
					? ""
					: currentProfile.experience.find(
							(exp) => exp._id.toString() === exp_id
					  ).to,
			current:
				loading ||
				currentProfile.experience === null ||
				!exp_id ||
				!currentProfile.experience.find((exp) => exp._id.toString() === exp_id)
					? false
					: currentProfile.experience.find(
							(exp) => exp._id.toString() === exp_id
					  ).current,
			description:
				loading ||
				currentProfile.experience === null ||
				!exp_id ||
				!currentProfile.experience.find((exp) => exp._id.toString() === exp_id)
					? ""
					: currentProfile.experience.find(
							(exp) => exp._id.toString() === exp_id
					  ).description,
		})
		if (
			exp_id &&
			currentProfile &&
			currentProfile.experience &&
			currentProfile.experience.find((exp) => exp._id.toString() === exp_id) &&
			currentProfile.experience.find((exp) => exp._id.toString() === exp_id)
				.to === null
		) {
			toggleDisabled(true)
		}
	}, [exp_id, currentProfile, loading, getCurrentProfile])

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
		addExperience(formData, history, exp_id ? exp_id : "")
	}

	return (
		<Fragment>
			<h1 className="large text-primary">
				{exp_id ? "Edit" : "Add"} An Experience
			</h1>
			<p className="lead">
				<i className="fas fa-code-branch"></i> {exp_id ? "Edit" : "Add"} any
				developer/programming positions that you have had in the past
			</p>
			<small style={{ fontFamily: "sans-serif" }}>* = required field</small>
			<form className="form" onSubmit={handleSubmit}>
				<div className="form-group">
					<input
						type="text"
						placeholder="* Job Title"
						name="title"
						value={title}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="* Company"
						name="company"
						value={company}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Location"
						name="location"
						value={location}
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
						Current Job
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
						placeholder="Job Description"
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

ExperienceForm.propTypes = {
	addExperience: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	loading: PropTypes.bool,
	currentProfile: PropTypes.object,
}

const mapStateToProps = (state) => ({
	loading: state.profile.loading,
	currentProfile: state.profile.currentProfile,
})

export default connect(mapStateToProps, { addExperience, getCurrentProfile })(
	ExperienceForm
)
