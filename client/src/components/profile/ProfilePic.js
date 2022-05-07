import React from 'react'

const ProfilePic = (props) => {
  let picture = null;
  if(props.picture){
    picture = props.picture
  }
  let image = picture ? <img src={props.picture} alt="..." className="" style={{borderRadius: 50, maxWidth: 100}} /> : 
  <img src={'../default-user.jpg'} alt="..." style={{borderRadius: 50, padding: 4}} className="w-100 h-60" />
    return (
    <div>
        {image}
    </div>
  )
}

export default ProfilePic