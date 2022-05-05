import React, { useState, useEffect } from 'react'
import getCurrentUser from '../hooks/get-current-user'
import NavBar from './NavBar'
import useRequest from '../hooks/use-request'
import Recommended from './follow/Recommended'
import Followers from './follow/Followers'

const Home = () => {
  const [user, setUser] = useState('')
  // const [explore, setExplore] = useState('')  //recommended users

  const { getUser } = getCurrentUser()

  //   let { doRequest } = useRequest({
  //     url: `/api/followers/explore`,
  //     method: 'get',
  //     // onSuccess: () => {navigate('/home')}//{ <Navigate to="/home" replace /> }
  // })
  // let { doRequestId } = useRequest({
  //   url: `/api/profiles/`,
  //   method: 'get',
  //   // onSuccess: () => {navigate('/home')}//{ <Navigate to="/home" replace /> }
  // })

  useEffect(() => {
    async function get() {
      await getUser().then(result => setUser(result.currentUser))
    }
    get()
  }, []);

  return (
    <div>
      <NavBar {...user} />
      <div className="container">
        <div className="row">
          <div className="col-sm">
            <div className='border border-secondary rounded'>
              <h4>Followers</h4>
              <hr/>
              <Followers />
            </div>
          </div>
          <div className="col-sm">
            Home of {user.email}
          </div>
          <div className="col-sm">
            <div className='border border-secondary rounded'>
              <h4>Who to follow</h4>
              <hr/>
              <Recommended />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home  
