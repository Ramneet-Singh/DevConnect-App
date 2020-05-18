import React from "react"
import PropTypes from "prop-types"
import Moment from "react-moment"

const ProfileEducation = ({
	education: { school, degree, fieldofstudy, from, to, description },
}) => {
	return (
		<div>
			<h3>{school}</h3>
			<p>
				{from && <Moment date={from} format="MMMM YYYY" />} -{" "}
				{to === "" || to === null ? (
					"Current"
				) : (
					<Moment date={to} format="MMMM YYYY" />
				)}{" "}
			</p>
			<p>
				<strong>Degree: </strong>
				{degree}
			</p>
			{fieldofstudy && (
				<p>
					<strong>Field Of Study: </strong>
					{fieldofstudy}
				</p>
			)}
			{description && (
				<p>
					<strong>Description: </strong>
					{description}
				</p>
			)}
		</div>
	)
}

ProfileEducation.propTypes = {
	education: PropTypes.object.isRequired,
}

export default ProfileEducation
