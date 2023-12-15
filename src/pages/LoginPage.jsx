import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/auth.context"
import authService from "../services/auth.service"

function LoginPage(props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState(undefined)

  const navigate = useNavigate()

  const { storeToken, authenticateUser } = useContext(AuthContext)

  const handleEmail = (e) => setEmail(e.target.value)
  const handlePassword = (e) => setPassword(e.target.value)

  const handleLoginSubmit = (e) => {
    e.preventDefault()

    const requestBody = { email, password }

    authService.login(requestBody)
      .then((response) => {

        storeToken(response.data.authToken)

        authenticateUser()
        navigate('/')
      })
      .catch((error) => {
        const errorDescription = error.response.data.message
        setErrorMessage(errorDescription)
      })
  }

  return (
    <div className="LoginPage">
      <br />
      <h1>Login</h1>
      <br />
      <br />
      <form onSubmit={handleLoginSubmit}>

        <div className="inputContainer">
          <input
            type="email"
            name="email"
            className="inputField"
            placeholder="Email"
            required={true}
            value={email}
            onChange={handleEmail}
          />
          <label
            className="inputLabel"
            htmlFor="inputField">Email
          </label>
          {/* <svg
            viewBox="0 0 448 512"
            className="userIcon">
            <path
              d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z">
            </path>
          </svg> */}
        </div>
        <div className="inputContainer">
          <input
            type="password"
            name="password"
            className="inputField"
            placeholder="Password"
            required={true}
            value={password}
            onChange={handlePassword}
          />
          <label
            className="inputLabel"
            htmlFor="inputField">Password
          </label>
        </div>
        <button type="submit" className="button">
          Login
        </button>
        <br />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div>
          <p>Don't have an account yet?</p>
          <Link to={"/signup"}>
            Sign Up
          </Link>
        </div>
      </form>
      <br />
    </div>
  )
}

export default LoginPage