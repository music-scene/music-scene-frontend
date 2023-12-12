// src/pages/SignupPage.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import authService from "../services/auth.service"

import './Forms.css'
import './Buttons.css'

function SignupPage(props) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

    const navigate = useNavigate()

    const handleEmail = (e) => setEmail(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)
    const handleName = (e) => setName(e.target.value)

    const handleSignupSubmit = (e) => {
        e.preventDefault()

        // Create an object representing the request body
        const requestBody = { email, password, name }

        // axios.post(`${API_URL}/auth/signup`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
        authService.signup(requestBody)
            .then((response) => {
                navigate('/login')
            })
            .catch((error) => {
                const errorDescription = error.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    return (
        <div className="SignupPage">
            <br />
            <h1>Sign Up</h1>
            <br />
            <br />
            <form onSubmit={handleSignupSubmit}>
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
                <div className="inputContainer">
                    <input
                        type="text"
                        name="name"
                        className="inputField"
                        placeholder="Name"
                        required={true}
                        value={name}
                        onChange={handleName}
                    />
                    <label
                        className="inputLabel"
                        htmlFor="inputField">Name
                    </label>
                </div>
                <button type="submit" className="button">
                    Sign Up
                </button>
                <br />
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <div>
                    <p>Already have account?</p>
                    <Link to={"/login"}>
                        Login
                    </Link>
                </div>
            </form>
            <br />
        </div>
    )
}

export default SignupPage;