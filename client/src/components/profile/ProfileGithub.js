import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { getRepos } from "../../actions/profile"
import Spinner from "../layout/Spinner"
import GithubRepo from "./GithubRepo"

const ProfileGithub = ({ username, getRepos, repos }) => {
	useEffect(() => {
		getRepos(username)
	}, [getRepos, username])

	return (
		<div className="profile-github">
			<h2 className="text-primary my-1"> GitHub Repos </h2>
			{repos === null ? (
				<Spinner />
			) : repos.length === 0 ? (
				<span>No repos</span>
			) : (
				repos.map((repo) => <GithubRepo repo={repo} key={repo.id} />)
			)}
		</div>
	)
}

ProfileGithub.propTypes = {
	username: PropTypes.string.isRequired,
	getRepos: PropTypes.func.isRequired,
	repos: PropTypes.array,
}

const mapStateToProps = (state) => ({
	repos: state.profile.repos,
})

export default connect(mapStateToProps, { getRepos })(ProfileGithub)
