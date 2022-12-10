import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const profileStatusConstants = {
  success: 'SUCCESS',
  initial: 'INITIAL',
  progress: 'PROGRESS',
  failure: 'FAILURE',
}

class Profile extends Component {
  state = {profileStatus: profileStatusConstants.initial, profileDetails: {}}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({profileStatus: profileStatusConstants.progress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const data = fetchedData.profile_details
      this.setState({
        profileDetails: {
          name: data.name,
          profileImageUrl: data.profile_image_url,
          shortBio: data.short_bio,
        },
        profileStatus: profileStatusConstants.success,
      })
    } else {
      this.setState({profileStatus: profileStatusConstants.failure})
    }
  }

  renderLoaderView = () => (
    <div className="profile-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="profile-error-container">
      <button
        type="button"
        className="retry-button"
        onClick={this.getProfileDetails}
      >
        Retry
      </button>
    </div>
  )

  renderProfileView = () => {
    const {profileDetails} = this.state

    const {name, profileImageUrl, shortBio} = profileDetails

    return (
      <div className="user-profile-bg-container">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-short-bio">{shortBio}</p>
      </div>
    )
  }

  render() {
    const {profileStatus} = this.state

    switch (profileStatus) {
      case profileStatusConstants.success:
        return this.renderProfileView()
      case profileStatusConstants.progress:
        return this.renderLoaderView()
      case profileStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default Profile
