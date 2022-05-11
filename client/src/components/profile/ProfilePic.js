import React from 'react'

export const ProfilePic = (props) => {
  let picture = null;
  if(props.picture){
    picture = props.picture
  }
  let image = picture ? <img src={props.picture} alt="..." className="" style={{borderRadius: 50, width: 50, height: 50, objectFit: 'cover', padding: 4}} /> : 
  <img src={'../default-user.jpg'} alt="..." style={{borderRadius: 50, padding: 4, width: 50, height: 50, objectFit: 'cover'}} className="w-100 h-60" />
    return (
    <div>
        {image}
    </div>
  )
}

export const ProfilePagePic = (props) => {
  let picture = null;
  if(props.picture){
    picture = props.picture
  }
  let image = picture ? <img src={props.picture} alt="..." className="" style={{borderRadius: 50, width: 200, height: 200, objectFit: 'cover', padding: 4}} /> : 
  <img src={'../default-user.jpg'} alt="..." style={{borderRadius: 50, padding: 4, width: 200, height: 200, objectFit: 'cover'}} className="w-100 h-60" />
    return (
    <div>
        {image}
    </div>
  )
}

// export default ProfilePic