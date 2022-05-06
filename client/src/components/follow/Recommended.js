import React from 'react'
import axios from 'axios'

const Recommended = (props) => {

  let users = []
  if(props){
    users = props.explore
  }

  let handleFollow = async (e) => {
    e.preventDefault();
    const id = e.target.value
    console.log(id)
    await axios.post('/api/followers', {userId: id}).then(() => window.location.reload(false))
  }

  let recommended = []
  if (users) {
    for (let i = 0; i < users.length; i++) {
      recommended.push(
        <div key={users[i].id} className="d-flex">
            <h4 className=''>{users[i].name}</h4>
            {/* <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="User Avatar" className="media-object pull-left" /> */}
            {/* <h4>{users[i].name}</h4> */}
            <button type="button" className="btn btn-sm btn-danger pull-right float-right" value={users[i].id} onClick={handleFollow}><i className="fa fa-close-round"></i>Follow</button>
        </div>
      )
    }
  }

  return (
    <div className="" >
      {recommended}
    </div>
  )
}

export default Recommended