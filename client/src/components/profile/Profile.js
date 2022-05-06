import React, { useState, useEffect } from 'react'
import getCurrentUser from '../../hooks/get-current-user'
import NavBar from '../NavBar'
import useRequest from '../../hooks/use-request'
import ProfilePic from './ProfilePic'
import UpdateProfile from './UpdateProfile'

const Profile = () => {
  const [user, setUser] = useState('')
  const [userProfile, setUserProfile] = useState('')

  const { getUser } = getCurrentUser()

  let { doRequestId } = useRequest({
    url: `/api/profiles/`,
    method: 'get',
    // onSuccess: () => {navigate('/home')}//{ <Navigate to="/home" replace /> }
})

  useEffect(() => {
    async function get() {
      await getUser().then(async( result ) => {
        setUser(result.currentUser) 
        await doRequestId(result.currentUser.id).then(result=> setUserProfile(result))
      })
    }
    get()
  }, []);

  return (
    <div>
      <NavBar {...user}/>      
      <h2>Profile of {user.email}</h2>
      <h3>Name: {userProfile.name}</h3>
      <h3>Bio: {userProfile.bio}</h3>
      <div style={{width:250, marginBottom: 'auto'}}><ProfilePic picture={userProfile.pictureURL}/></div> 
      < UpdateProfile name={userProfile.name} bio={userProfile.bio} />
    </div>
  )
}

export default Profile 
