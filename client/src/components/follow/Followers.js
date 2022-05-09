import React from 'react'
import {ProfilePic} from '../profile/ProfilePic'
import { useNavigate } from 'react-router-dom'

const Followers = (props) => {

  let navigate = useNavigate()

  let users = []
  if(props){
    users = props.followers
  }

  let followersDiv = []

  const linkToProfile = (link) =>{
    navigate(`../profile/${link}`)
  }

  if (users) {
    for (let i = 0; i < users.length; i++) {
      followersDiv.push(
        <div key={users[i].id} className="d-flex" onClick={() => linkToProfile(users[i].id)} >
          <div style={{width:50, marginBottom: 'auto'}}><ProfilePic picture={users[i].pictureURL}/></div> 
            <h4 className=''>{users[i].name}</h4>
        </div>
      )
    }
  }

  return (
    <div className="" >
      {followersDiv}
    </div>
  )
}

export default Followers