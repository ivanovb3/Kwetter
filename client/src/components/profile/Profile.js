import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import getCurrentUser from '../../hooks/get-current-user'
import NavBar from '../NavBar'
import useRequest from '../../hooks/use-request'
import {ProfilePagePic} from './ProfilePic'
import UpdateProfile from './UpdateProfile'
import UploadProfilePic from './UploadProfilePic'

const Profile = () => {
  const [user, setUser] = useState('')
  const [userProfile, setUserProfile] = useState('')

  const { getCurrentUserProfile } = getCurrentUser()
  const { id } = useParams();

  let { doRequestId } = useRequest({
    url: `/api/profiles/`,
    method: 'get'
})

  useEffect(() => {
    async function get() {
      await doRequestId(id).then(result => setUserProfile(result))
      await getCurrentUserProfile().then(result => setUser(result.data))
    }
    get()
  }, []);

  return (
    <div>
      <NavBar {...userProfile}/>      
      <h3>Name: {userProfile.name}</h3>
      <h3>Bio: {userProfile.bio}</h3>
      <div style={{width:250, marginBottom: 'auto'}}><ProfilePagePic picture={userProfile.pictureURL}/></div> 
      {user.id === userProfile.id ? <div>
        <UpdateProfile name={userProfile.name} bio={userProfile.bio} /> <br/> 
        <UploadProfilePic />
        </div> : null}
    </div>
  )
}

export default Profile 