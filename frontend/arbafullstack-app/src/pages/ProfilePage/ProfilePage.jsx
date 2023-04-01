import React, { useState } from 'react'
import styles from "./ProfilePage.module.css"
import TermsCondition from '../../components/TermandCondition/TermandCondition';
import { updateProfilePictureandName, updatepassword } from '../../redux/auth/auth.action';
import GetImage from '../../components/GetImageUrl/GetImage';

const ProfilePage = () => {
  let user = JSON.parse(localStorage.getItem("userres")).userpersent || {};
  // console.log(user);

  const [showPopup, setShowPopup] = useState(false);
  const [showUPopup, setShowUPopup] = useState(false);
  const [updateProfile, setUpadteProfile] = useState({
    fullName: "",
    avatar: null,
  })
  const [updatePass, setUpdatePass] = useState({
    oldPassword: '',
    newPassword: '',
  });
  const [image, setImage] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatePass({ ...updatePass, [name]: value });
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // console.log(updatePass);
    let res = await updatepassword(updatePass)
    if (res) {
      setUpdatePass({ oldPassword: '', newPassword: '' });
      setShowPopup(false);
    }
  }
  let data = null;

  const handleProfileFormSubmit = async (event) => {
    event.preventDefault();
    console.log(updateProfile, image);
    if (updateProfile.fullName.length > 0 && image != null) {
      let imageurl=await GetImage(image);
      updateProfile.avatar=imageurl;
      if(imageurl){
        let res= await updateProfilePictureandName(updateProfile);
        if(res){
          setUpadteProfile({fullName: "", avatar:""})
          setShowUPopup(false);
        }
      }
    }
  }


  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    if (name === "image") {
      setImage(event.target.files[0]);
    } else {
      setUpadteProfile({ ...updateProfile, [name]: value });
    }
  }

  const ShowTermConditon = () => {
    localStorage.setItem("term_condition", "NotAccepted");
    window.location.reload();
  }

  return (
    <>
      <TermsCondition />
      <div className={styles.container}>
        <div className={styles.profile}>
          <img
            src={user.avatar}
            alt="User profile"
            className={styles.profileImage}
          />
          <div className={styles.profileInfo}>
            <h2 className={styles.username}>{user.userName}</h2>
            <p className={styles.email}>FullName : {user.fullName}</p>
            <p className={styles.email}>{user.email}</p>
          </div>
        </div>
        <div className={styles.buttons}>
          <button className={styles.updateButton} onClick={() => setShowUPopup(!showPopup)}>Update Profile</button>
          <button className={styles.changePasswordButton} onClick={() => setShowPopup(!showPopup)}>Change Password</button>
        </div>
        <div className={styles.term_conditon_button}>
          <button className={styles.updateButton} onClick={ShowTermConditon}>See T&C</button>
        </div>
      </div>
      {showPopup &&
        <div className={styles.popup}>
          <form onSubmit={handleFormSubmit}>
            <h2>Update Password</h2>
            <label htmlFor="oldPassword">Old Password:</label>
            <input type="password" name="oldPassword" value={updatePass.oldPassword} onChange={handleInputChange} />
            <label htmlFor="newPassword">New Password:</label>
            <input type="password" name="newPassword" value={updatePass.newPassword} onChange={handleInputChange} />
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setShowPopup(false)}>Cancel</button>
          </form>
        </div>
      }
      {showUPopup &&
        <div className={styles.popup}>
          <form onSubmit={handleProfileFormSubmit}>
            <h2>Update Profile</h2>
            <label htmlFor="fullName">Full Name:</label>
            <input type="text" name="fullName" value={updateProfile.fullName} onChange={handleProfileChange} />
            <label htmlFor="avatar">New Profil Pic:</label>
            <input type="file" name="image" onChange={handleProfileChange} />
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setShowUPopup(false)}>Cancel</button>
          </form>
        </div>
      }
    </>
  );
}

export default ProfilePage;
