import React from 'react'
import axios from 'axios'
import { ProfilePic } from '../profile/ProfilePic'
import { useNavigate } from 'react-router-dom'
import '../../styles/Followers.css'

const Following = (props) => {

  let navigate = useNavigate()

  let users = []
  if (props) {
    users = props.following
  }

  let handleFollow = async (e) => {
    e.preventDefault();
    const id = e.target.value
    console.log(id)
    await axios.post('/api/followers', { userId: id }).then(() => window.location.reload(false))
  }

  const linkToProfile = (link) => {
    navigate(`../profile/${link}`)
  }

  let following = []
  if (users) {
    for (let i = 0; i < users.length; i++) {
      following.push(
        <div key={users[i].id} className="d-flex followerLink">
          <div className='d-flex' onClick={() => linkToProfile(users[i].id)}>
            <div style={{ width: 50, marginBottom: 'auto' }}><ProfilePic picture={users[i].pictureURL} /></div>
            <h4 className='followersText'>{users[i].name}</h4>
          </div>
          <button type="button" className="unfollowButton" value={users[i].id} onClick={handleFollow}><i className="fa fa-close-round"></i>Unfollow</button>
        </div>
      )
    }
  }

  return (
    <div className="" >
      {following}
    </div>
  )
}

export default Following