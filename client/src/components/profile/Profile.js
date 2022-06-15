import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import getCurrentUser from '../../hooks/get-current-user'
import NavBar from '../NavBar'
import useRequest from '../../hooks/use-request'
import customRequest from '../../hooks/custom-request'
import { ProfilePagePic } from './ProfilePic'
import UpdateProfile from './UpdateProfile'
import UploadProfilePic from './UploadProfilePic'
import ForgetMe from './ForgetMeButton'
import '../../styles/Profile.css'

const Profile = () => {
  const [user, setUser] = useState('')
  const [userProfile, setUserProfile] = useState('')
  const [role, setRole] = useState('')
  const [followingProfiles, setFollowingProfiles] = useState('')
  const [followersProfiles, setFollowersProfiles] = useState('')

  const { getCurrentUserProfile, getCurrentUserRole } = getCurrentUser()
  const { doCustomGetRequest } = customRequest({})
  const { id } = useParams();

  let { doRequestId } = useRequest({
    url: `/api/profiles/`,
    method: 'get'
  })

  useEffect(() => {
    async function get() {
      await doRequestId(id).then(result => setUserProfile(result))
      await getCurrentUserProfile().then(result => setUser(result.data))
      await getCurrentUserRole().then(result => setRole(result));
      await doCustomGetRequest('/api/followers').then(result => setFollowingProfiles(result))
      await doCustomGetRequest('/api/followers/myfollowers').then(result => setFollowersProfiles(result))
    }
    get()
  }, []);

  return (
    <div className='wrapperProfile'>
      <NavBar user={role} />
      <div className='contentProfile'>
        <div style={{ width: 250, marginBottom: 'auto' }}><ProfilePagePic picture={userProfile.pictureURL} /></div>
        <h3 className='explanationsProfile'>Name: {userProfile.name}</h3>
        <h4 className='explanationsProfile'>Bio: {userProfile.bio}</h4>
        <div className='explanationsProfile d-flex'>
          {followersProfiles.length}&nbsp;<div className='text-muted'>Followers</div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {followingProfiles.length}&nbsp;<div className='text-muted'>Following</div>
        </div>
        {user.id === userProfile.id ?
          <div className='updateProfileForm'>
            <h4 className='explanationsProfile'>Update profile info</h4>
            <UpdateProfile name={userProfile.name} bio={userProfile.bio} /> <br />
            <UploadProfilePic />
            <ForgetMe id={user.id} />
          </div> : null}
      </div>
    </div>
  )
}

export default Profile 