import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../context/auth.context"
import userService from "../services/user.service"
import { setDefaultProfileImageUrl } from "../helperFunctions/helperFunction"

function EditProfileContainer(props) {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

    const { userId } = useParams()
    const { user } = useContext(AuthContext)

    const navigate = useNavigate()

    const populateFields = () => {
        setName(props.user.name)
        setEmail(props.user.email)
        setImageUrl(props.user.imageUrl)
    }

    useEffect(() => {
        populateFields()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        const requestBody = {
            name: name,
            email: email,
            imageUrl: setDefaultProfileImageUrl(imageUrl)
        }

        userService.editUser(userId, requestBody)
            .then((response) => {
                navigate(0)
            })
            .catch((error) => {
                console.log("An error occurred: ");
                console.log(error);
                const errorDescription = error.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    return (
        <div>
            <div className="">
                <div className="">
                    <h1>EDIT PROFILE</h1>
                    <form onSubmit={handleSubmit}>
                    <div className="inputContainer">
                            <input
                                type="text"
                                name="name"
                                className="inputField"
                                placeholder="Name"
                                required={true}
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                            <label
                                className="inputLabel"
                                htmlFor="inputField">Name
                            </label>
                        </div>
                        <div className="inputContainer">
                            <input
                                type="email"
                                name="email"
                                className="inputField"
                                placeholder="Email"
                                required={true}
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                            <label
                                className="inputLabel"
                                htmlFor="inputField">Email
                            </label>
                        </div>
                        <div className="inputContainer">
                            <input
                                type="text"
                                name="imageUrl"
                                className="inputField"
                                placeholder="Image URL"
                                required={true}
                                value={imageUrl}
                                onChange={(e) => {
                                    setImageUrl(e.target.value);
                                }}
                            />
                            <label
                                className="inputLabel"
                                htmlFor="inputField">Image URL
                            </label>
                        </div>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <button type="submit" className="button">Submit</button>
                    </form>
                    
                </div>
            </div>
        </div>
    )
}

export default EditProfileContainer