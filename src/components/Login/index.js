import {Component, Redirect} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {userId: '', pin: '', showError: false, errorMsg: ''}

  loginApp = async () => {
    const {userId, pin} = this.state
    const userDetails = {
      user_id: userId,
      pin,
    }

    const apiUrl = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const jwtToken = data.jwt_token
      this.successfulLogin(jwtToken)
    } else {
      this.failureLogin()
    }
  }

  successfulLogin = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 10,
    })
    history.replace('/')
  }

  failureLogin = () => {
    const {userId, pin} = this.state

    if (userId === '' || userId !== '142420') {
      this.setState({showError: true, errorMsg: 'Invalid user ID'})
    } else if (pin === '' || (pin !== '231225' && userId !== '142420')) {
      this.setState({showError: true, errorMsg: 'Invalid PIN'})
    } else if (userId === '142420' && pin !== '231225') {
      this.setState({
        showError: true,
        errorMsg: 'User ID and PIN did not match',
      })
    } else if (userId !== '142420' && pin !== '231225') {
      this.setState({
        showError: true,
        errorMsg: 'User ID and PIN did not match',
      })
    }
  }

  submitForm = event => {
    event.preventDefault()
    this.loginApp()
  }

  enterPin = event => {
    this.setState({pin: event.target.value})
  }

  enterUserId = event => {
    this.setState({userId: event.target.value})
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {showError, errorMsg} = this.state

    return (
      <div className="container">
        <div className="card">
          <div className="img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="login-image"
            />
          </div>
          <div className="input-container">
            <h1 className="title">Welcome Back!</h1>
            <form className="forms" onSubmit={this.submitForm}>
              <label htmlFor="userId">USER ID</label>
              <input
                id="userId"
                type="text"
                placeholder="Enter User ID"
                onChange={this.enterUserId}
              />
              <label htmlFor="pin">PIN</label>
              <input
                id="pin"
                type="password"
                placeholder="Enter PIN"
                onChange={this.enterPin}
              />
              <button type="submit" className="button">
                Login
              </button>
              {showError && <p className="error">{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
