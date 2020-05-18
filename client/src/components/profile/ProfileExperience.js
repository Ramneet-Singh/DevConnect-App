import React from "react"
import PropTypes from "prop-types"
import Moment from "react-moment"

const ProfileExperience = ({
	experience: { company, from, to, title, description },
}) => {
	return (
		<div>
			<h3 className="text-dark">{company}</h3>
			<p>
				{from && <Moment date={from} format="MMMM YYYY" />} -{" "}
				{to === "" || to === null ? (
					"Current"
				) : (
					<Moment date={to} format="MMMM YYYY" />
				)}{" "}
			</p>
			<p>
				<strong>Position: </strong>
				{title}
			</p>
			{description && (
				<p>
					<strong>Description: </strong>
					{description}
				</p>
			)}
		</div>
	)
}

ProfileExperience.propTypes = {
	experience: PropTypes.object.isRequired,
}

export default ProfileExperience
