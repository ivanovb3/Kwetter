import React from 'react'

const ProfilePic = (props) => {
  let { picture } = props
  let image = picture ? <img src={props.picture} alt="..." className="img-thumbnail w-25 h-35 p-3" /> : <img src={'default-user.jpg'} alt="..." className="img-thumbnail w-25 h-35 p-3" />
    return (
    <div>
        {image}
    </div>
  )
}

export default ProfilePic