import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import userService from "../services/user.service";
import EditProfileContainer from "../components/EditProfileContainer";
import "./profilePage.css"; 

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
      {userInfo === null ? (
        <h1>Loading user profile...</h1>
      ) : (
        <div className="ProfilePage">
          <div className="ProfileInfo">
            <div className="ProfileImageDiv">
              <img src={userInfo.imageUrl} alt="Profile" />
            </div>
            <h3>NAME</h3>
            <p>{userInfo.name}</p>
            <h3>EMAIL</h3>
            <p>{userInfo.email}</p>
            {userInfo._id === user._id ? (
              <>
                <div className="EditDeleteContainer">
                  <button onClick={showHideEditContainer}>EDIT</button>
                  <div className={`EditContainer ${showEditContainer ? "show" : "hide"}`}>
                    {<EditProfileContainer user={userInfo} />}
                  </div>
                  <button onClick={deleteUser}>DELETE</button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
