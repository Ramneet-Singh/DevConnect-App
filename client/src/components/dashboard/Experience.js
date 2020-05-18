import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Moment from "react-moment"
import { Link } from "react-router-dom"
import { deleteExperience } from "../../actions/profile"

const Experience = ({ experience, deleteExperience }) => {
	const experiences = experience.map((exp) => (
		<tr key={exp._id}>
			<td>{exp.company}</td>
			<td className="hide-sm">{exp.title}</td>
			<td>
				<Moment date={exp.from} format="YYYY/DD/MM" /> -{" "}
				{exp.to === null || exp.to === "" ? (
					"Now"
				) : (
					<Moment date={exp.to} format="YYYY/DD/MM" />
				)}
			</td>
			<td>
				<button
					className="btn  btn-danger"
					style={{ marginBottom: "0.3rem" }}
					onClick={() => {
						if (
							window.confirm("Are you sure you want to delete this experience?")
						) {
							window.scrollTo(0, 0)
							deleteExperience(exp._id)
						}
					}}
				>
					<i className="far fa-times-circle"></i>{" "}
				</button>
				<Link
					to={`/experience-form/${exp._id.toString()}`}
					className="btn  btn-dark"
				>
					<i className="fas fa-edit"></i>
				</Link>
			</td>
		</tr>
	))

	return (
		<Fragment>
			<h2 className="my-2">Experience Credentials</h2>
			<table className="table">
				<thead>
					<tr>
						<th>Company</th>
						<th className="hide-sm">Title</th>
						<th className="hide-sm">Years</th>
						<th></th>
					</tr>
				</thead>
				<tbody>{experiences}</tbody>
			</table>
		</Fragment>
	)
}

Experience.propTypes = {
	experience: PropTypes.array,
	deleteExperience: PropTypes.func.isRequired,
}

export default connect(null, { deleteExperience })(Experience)
