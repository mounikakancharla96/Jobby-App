import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <>
      <nav className="small-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>
        <ul className="home-jobs-logout">
          <li className="option-item">
            <Link to="/">
              <AiFillHome className="option-img" />
            </Link>
          </li>
          <li className="option-item">
            <Link to="/jobs">
              <BsFillBriefcaseFill className="option-img" />
            </Link>
          </li>
          <button
            type="button"
            className="logout-button"
            onClick={onClickLogout}
          >
            <Link to="/login">
              <FiLogOut className="option-img" />
            </Link>
          </button>
        </ul>
      </nav>
      <nav className="large-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website-logo"
          className="website-logo-lg"
        />
        <ul className="options-container">
          <li className="options-item-lg">
            <Link to="/login" className="option-item-lg">
              Home
            </Link>
          </li>
          <li className="options-item-lg">
            <Link to="/jobs" className="option-item-lg">
              Jobs
            </Link>
          </li>
        </ul>
        <button
          type="button"
          onClick={onClickLogout}
          className="logout-button-lg"
        >
          Logout
        </button>
      </nav>
    </>
  )
}

export default withRouter(Header)
