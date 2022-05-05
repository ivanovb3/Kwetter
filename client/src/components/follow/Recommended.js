import React, { useState, useEffect } from 'react'
import useRequest from '../../hooks/use-request'
import axios from 'axios'

const Recommended = (props) => {

  const [users, setUsers] = useState('')

  let { doRequest } = useRequest({
    url: `/api/followers/explore`,
    method: 'get',
    // onSuccess: () => {navigate('/home')}//{ <Navigate to="/home" replace /> }
  })
  let { doRequestId } = useRequest({
    url: `/api/profiles/`,
    method: 'get',
    // onSuccess: () => {navigate('/home')}//{ <Navigate to="/home" replace /> }
  })

  useEffect(() => {
    async function getExplore() {
      await doRequest().then(async (result) => {
        //setExplore(result)
        let exploreUsers = []
        for (let i = 0; i < result.length; i++) {
          const response = await doRequestId(result[i])
          exploreUsers.push(response);
        }
        setUsers(exploreUsers)
      })
    }
    getExplore()
  }, []);

  let handleFollow = async (e) => {
    e.preventDefault();
    const id = e.target.value
    console.log(id)
    await axios.post('/api/followers', {userId: id}).then(() => window.location.reload(false))
    // let { doRequestId } = useRequest({
    //   url: `/api/followers/`,
    //   method: 'get',
    //   // onSuccess: () => {navigate('/home')}//{ <Navigate to="/home" replace /> }
    // })
    // doRequestId(e.target.value)
  }

  let recommended = []
  if (users) {
    for (let i = 0; i < users.length; i++) {
      recommended.push(
        <div key={users[i].id} className="">
            <h4 className=''>{users[i].name}</h4>
            {/* <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="User Avatar" className="media-object pull-left" /> */}
            {/* <h4>{users[i].name}</h4> */}
            <button type="button" className="btn btn-sm btn-danger pull-right" value={users[i].id} onClick={handleFollow}><i className="fa fa-close-round"></i>Follow</button>
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