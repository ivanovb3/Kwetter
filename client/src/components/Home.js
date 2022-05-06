import React, { useState, useEffect } from 'react'
import getCurrentUser from '../hooks/get-current-user'
import NavBar from './NavBar'
import useRequest from '../hooks/use-request'
import customRequest from '../hooks/custom-request'
import Recommended from './follow/Recommended'
import Followers from './follow/Followers'
import NewTweetForm from './tweet/NewTweetForm'
import Tweet from './tweet/Tweet'
import axios from 'axios'

const Home = () => {
  const [user, setUser] = useState('')
  const [following, setFollowing] = useState('')
  const [tweets, setTweets] = useState('')
  // const [explore, setExplore] = useState('')  //recommended users

  const { getUser } = getCurrentUser()

  const { doCustomGetRequest, doCustomPostRequest } = customRequest({})

  useEffect(() => {
    async function get() {
      await getUser().then(result => setUser(result.currentUser))

      await doCustomGetRequest('/api/followers').then(async (result) => {
        setFollowing(result);

        await doCustomPostRequest('/api/tweets/get', {userIds: result}).then(result => setTweets(result))
      })
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
            <NewTweetForm />
            <Tweet tweets={tweets}/>
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
