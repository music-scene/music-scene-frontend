import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import userService from "../services/user.service";
import EditProfileContainer from "../components/EditProfileContainer";

function ProfilePage() {
  const [userInfo, setUserInfo] = useState(null);
  const [showEditContainer, setShowEditContainer] = useState(false);

  const { userId } = useParams();
  const { user, logOutUser } = useContext(AuthContext);

  const showHideEditContainer = () => setShowEditContainer(!showEditContainer);

  const getUserById = () => {
    userService
      .getUserById(userId)
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteUser = () => {
    userService
      .deleteUser(userId)
      .then((response) => {
        console.log(response);
        logOutUser();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserById();
  }, []);

  return (
    <div>
      {userInfo === null
        ? <h1>Loading user profile...</h1>
        : <div className="ProfilePage">
          <div className="ProfileInfo">
            <div className="ProfileImageDiv">
              <img src={userInfo.imageUrl} alt="Profile" />
            </div>
            <div className="ConcertDetailsInfoDiv">
              <div className="InfoRow">
                <p><span className="DetailsSpans">Name: </span>{userInfo.name}</p>
              </div>
              <div className="InfoRow">
                <p><span className="DetailsSpans">Email: </span>{userInfo.email}</p>
              </div>
              {userInfo._id === user._id
                ? <div className="EditDeleteContainer">
                  <button onClick={showHideEditContainer} className="button">Edit</button>
                  <div className={`EditContainer ${showEditContainer ? "show" : "hide"}`}>
                    {<EditProfileContainer user={userInfo} />}
                  </div>
                  <button onClick={deleteUser} className="button">Delete</button>
                </div>
                : null}
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default ProfilePage;
