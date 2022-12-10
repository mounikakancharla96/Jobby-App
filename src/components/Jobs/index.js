import {Component} from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import FilterGroup from '../FilterGroup'
import Header from '../Header'
import JobCard from '../JobCard'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
  initial: 'INITIAL',
}

class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    employmentCheck: [],
    salaryRange: 0,
    searchInput: '',
    jobData: [],
  }

  componentDidMount() {
    this.getJobsData()
  }

  getJobsData = async () => {
    this.setState({apiStatus: apiStatusConstants.progress})
    const {employmentCheck, salaryRange, searchInput} = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentCheck.join()}&minimum_package=${salaryRange}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = fetchedData.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoaderView = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickData = () => {
    this.getJobsData()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="failure-button"
        onClick={this.onClickData}
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {jobData} = this.state
    const length = jobData.length > 0
    return length ? (
      <div className="jobs-details-container">
        <ul className="lists">
          {jobData.map(eachJob => (
            <JobCard key={eachJob.id} jobDetails={eachJob} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-jobs-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-image"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderAllJobs = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.progress:
        return this.renderLoaderView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  salaryChanges = salary => {
    this.setState({salaryRange: salary}, this.getJobsData)
  }

  employmentChanges = employmentCheck => {
    this.setState(
      prevState => ({
        employmentCheck: [...prevState.employmentCheck, employmentCheck],
      }),
      this.getJobsData,
    )
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value}, this.getJobsData)
  }

  changeKey = event => {
    if (event.key === 'Enter') {
      this.getJobsData()
    }
  }

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className="search-container">
        <input
          type="search"
          className="search-bar"
          onChange={this.changeSearchInput}
          value={searchInput}
          placeholder="Search"
          onKeyDown={this.changeKey}
        />
        <button
          type="button"
          className="search-button"
          testid="searchButton"
          onClick={this.getData}
        >
          <AiOutlineSearch className="search-icon" />
        </button>
      </div>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div>
            <FilterGroup
              employmentList={employmentTypesList}
              salaryList={salaryRangesList}
              employmentChanges={this.employmentChanges}
              salaryChanges={this.salaryChanges}
            />
          </div>
          <div className="search-list">
            {this.renderSearchInput()}
            {this.renderAllJobs()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
