import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    title,
    rating,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="link-container">
      <li className="job-card-container">
        <div className="logo-title">
          <img src={companyLogoUrl} alt="company logo" className="logo" />
          <div className="title-rating">
            <h1 className="title">{title}</h1>
            <div className="rating-star">
              <AiFillStar className="star" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-salary">
          <div className="location-type">
            <div className="location">
              <MdLocationOn className="location-icon" />
              <p className="locate">{location}</p>
            </div>
            <div className="location">
              <BsBriefcaseFill className="location-icon" />
              <p className="locate-end">{employmentType}</p>
            </div>
          </div>
          <p className="locate">{packagePerAnnum}</p>
        </div>
        <hr className="hr" />
        <div className="description">
          <h1 className="locate">Description</h1>
          <p className="locate">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
