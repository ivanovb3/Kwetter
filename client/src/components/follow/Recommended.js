import React from 'react'
import axios from 'axios'
import ProfilePic from '../profile/ProfilePic'

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
        <div key={users[i].id} className="d-flex" style={{marginTop: 15}}>
          <div style={{width:50, marginBottom: 'auto'}}><ProfilePic picture={users[i].pictureURL}/></div>            
            <h4 className='float-left' style={{marginRigth: 'auto', marginBottom: 'auto'}}>{users[i].name}</h4>
            <button type="button" className="btn btn-sm btn-info pull-right float-right" style={{marginLeft: 'auto', marginBottom: 7, marginRight: 3}} value={users[i].id} onClick={handleFollow}><i className="fa fa-close-round"></i>Follow</button>
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