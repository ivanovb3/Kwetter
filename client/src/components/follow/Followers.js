import React from 'react'

const Followers = (props) => {

  let users = []
  if(props){
    users = props.followers
  }

  let followersDiv = []
  if (users) {
    for (let i = 0; i < users.length; i++) {
      followersDiv.push(
        <div key={users[i].id} className="">
            <h4 className=''>{users[i].name}</h4>
            {/* <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="User Avatar" className="media-object pull-left" /> */}
            {/* <h4>{users[i].name}</h4> */}
            {/* <button type="button" className="btn btn-sm btn-danger pull-right" value={users[i].id} onClick={handleFollow}><i className="fa fa-close-round"></i>Follow</button> */}
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