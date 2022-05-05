import React, { useState, useEffect } from 'react'
import useRequest from '../../hooks/use-request'

const Followers = (props) => {

  const [users, setUsers] = useState('')

  let { doRequest } = useRequest({
    url: `/api/followers/myfollowers`,
    method: 'get',
    // onSuccess: () => {navigate('/home')}//{ <Navigate to="/home" replace /> }
  })
  let { doRequestId } = useRequest({
    url: `/api/profiles/`,
    method: 'get',
    // onSuccess: () => {navigate('/home')}//{ <Navigate to="/home" replace /> }
  })

  useEffect(() => {
    async function get() {
      await doRequest().then(async (result) => {
        let followers = []
        for (let i = 0; i < result.length; i++) {
          const response = await doRequestId(result[i].userId)
          followers.push(response);
        }
        setUsers(followers)
      })
    }
    get()
  }, []);

  let followers = []
  if (users) {
    for (let i = 0; i < users.length; i++) {
      followers.push(
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
      {followers}
    </div>
  )
}

export default Followers