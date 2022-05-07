import React from 'react'
import axios from 'axios'
import ProfilePic from '../profile/ProfilePic'
import { useNavigate } from 'react-router-dom'

const Following = (props) => {

  let navigate = useNavigate()

  let users = []
  if(props){
    users = props.following
  }

  let handleFollow = async (e) => {
    e.preventDefault();
    const id = e.target.value
    console.log(id)
    await axios.post('/api/followers', {userId: id}).then(() => window.location.reload(false))
  }

  const linkToProfile = (link) =>{
    navigate(`../profile/${link}`)
  }

  let following = []
  if (users) {
    for (let i = 0; i < users.length; i++) {
      following.push(
        <div key={users[i].id} className="d-flex">
            <div style={{width:50, marginBottom: 'auto'}}><ProfilePic picture={users[i].pictureURL}/></div> 
            <h4 className=''>{users[i].name}</h4>
            <button type="button" className="btn btn-sm btn-secondary pull-right float-right" style={{marginLeft: 'auto', marginRight: 3, marginBottom: 7}} 
            value={users[i].id} onClick={handleFollow}><i className="fa fa-close-round"></i>Unfollow</button>
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