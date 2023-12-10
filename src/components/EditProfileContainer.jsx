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
                        <label className="">
                            <p>Name</p>
                            <input
                                type="text"
                                name="name"
                                required={true}
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                        </label>
                        <label className="">
                            <p>Email</p>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </label>
                        <label className="ImageLabel">
                            <p>Image URL</p>
                            <input
                                type="text"
                                name="imageUrl"
                                value={imageUrl}
                                onChange={(e) => {
                                    setImageUrl(e.target.value);
                                }}
                            />
                        </label>
                        <button className="">Submit changes</button>
                    </form>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>
            </div>
        </div>
    )
}

export default EditProfileContainer