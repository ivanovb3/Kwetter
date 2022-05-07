import React, { useState, useEffect } from 'react'
import getCurrentUser from '../hooks/get-current-user'
import NavBar from './NavBar'
import useRequest from '../hooks/use-request'
import customRequest from '../hooks/custom-request'
import Recommended from './follow/Recommended'
import Followers from './follow/Followers'
import NewTweetForm from './tweet/NewTweetForm'
import Tweet from './tweet/Tweet'
import Following from './follow/Following'

const Home = () => {
  const [user, setUser] = useState('')
  const [followingProfiles, setFollowingProfiles] = useState('')
  const [followersProfiles, setFollowersProfiles] = useState('')
  //const [allProfiles, setFollowersProfiles] = useState('')
  const [tweets, setTweets] = useState('')
  const [comments, setComments] = useState('')
  const [explore, setExplore] = useState('')  //recommended users


  const { getCurrentUserProfile } = getCurrentUser()

  const { doCustomGetRequest, doCustomPostRequest } = customRequest({})

  useEffect(() => {
    async function get() {
      await getCurrentUserProfile().then(async (resultUser) => {
        setUser(resultUser.data)

        await doCustomGetRequest('/api/followers').then(async (result) => {
          await doCustomPostRequest('/api/profiles/get', { userIds: result }).then(result => setFollowingProfiles(result))

          await doCustomPostRequest('/api/tweets/get', { userIds: result.concat(resultUser.data.id) }).then(async (result) => {
            setTweets(result)
            let tweetIds = []
            for (const r of result) {
              tweetIds.push(r.id)
            }
            await doCustomPostRequest('/api/comments/get', { tweetIds: tweetIds }).then(result => setComments(result))

          })
        })

        await doCustomGetRequest('/api/followers/myfollowers').then(async (result) => {
          await doCustomPostRequest('/api/profiles/get', { userIds: result }).then(result => setFollowersProfiles(result))
        })

        await doCustomGetRequest('/api/followers/explore').then(async (result) => {
          await doCustomPostRequest('/api/profiles/get', { userIds: result }).then(result => setExplore(result))
        })

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
              <h4>Followers: {followersProfiles.length}</h4>
              <hr />
              <Followers followers={followersProfiles} />
            </div>
            <div className='border border-secondary rounded'>
              <h4>Following: {followingProfiles.length}</h4>
              <hr />
              <Following following={followingProfiles} />
            </div>
          </div>
          <div className="col-sm">
            Home of {user.name}
            <NewTweetForm />
            <Tweet tweets={tweets} users={followingProfiles.concat(user)} restUsers={explore} comments={comments} />
          </div>
          <div className="col-sm">
            <div className='border border-secondary rounded'>
              <h4>Who to follow</h4>
              <hr />
              <Recommended explore={explore} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home  
