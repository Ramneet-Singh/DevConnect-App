import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Moment from "react-moment"
import { Link } from "react-router-dom"
import { deleteEducation } from "../../actions/profile"

const Education = ({ education, deleteEducation }) => {
	const educations = education.map((edu) => (
		<tr key={edu._id}>
			<td>{edu.school}</td>
			<td className="hide-sm">{edu.degree}</td>
			<td>
				<Moment date={edu.from} format="YYYY/DD/MM" /> -{" "}
				{edu.to === null || edu.to === "" ? (
					"Now"
				) : (
					<Moment date={edu.to} format="YYYY/DD/MM" />
				)}
			</td>
			<td>
				<button
					style={{ marginBottom: "0.3rem" }}
					className="btn  btn-danger"
					onClick={() => {
						if (
							window.confirm("Are you sure you want to delete this education")
						) {
							window.scrollTo(0, 0)
							deleteEducation(edu._id)
						}
					}}
				>
					<i className="far fa-times-circle"></i>{" "}
				</button>
				<Link
					to={`/education-form/${edu._id.toString()}`}
					className="btn  btn-dark"
				>
					<i className="fas fa-edit"></i>
				</Link>
			</td>
		</tr>
	))

	return (
		<Fragment>
			<h2 className="my-2">Education Credentials</h2>
			<table className="table">
				<thead>
					<tr>
						<th>School</th>
						<th className="hide-sm">Degree</th>
						<th className="hide-sm">Years</th>
						<th></th>
					</tr>
				</thead>
				<tbody>{educations}</tbody>
			</table>
		</Fragment>
	)
}

Education.propTypes = {
	education: PropTypes.array,
	deleteEducation: PropTypes.func.isRequired,
}

export default connect(null, { deleteEducation })(Education)
