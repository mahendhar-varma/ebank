import './index.css'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const logOut = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/ebank/login')
  }
  return (
    <nav className="nav-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
        alt="website logo"
        className="logo"
      />
      <button className="btn-logout" type="button" onClick={logOut}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
