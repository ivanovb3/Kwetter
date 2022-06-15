import React, { useState, useEffect } from 'react'
import getCurrentUser from '../hooks/get-current-user'
import NavBar from './NavBar'
import customRequest from '../hooks/custom-request'
import Recommended from './follow/Recommended'
import Followers from './follow/Followers'
import NewTweetForm from './tweet/NewTweetForm'
import Tweet from './tweet/Tweet'
import Following from './follow/Following'
import '../styles/Home.css'

const Home = () => {
  const [user, setUser] = useState('')
  const [followingProfiles, setFollowingProfiles] = useState('')
  const [followersProfiles, setFollowersProfiles] = useState('')
  const [tweets, setTweets] = useState('')
  const [comments, setComments] = useState('')
  const [explore, setExplore] = useState('')  //recommended users
  const [reacts, setReacts] = useState('')
  const [role, setRole] = useState('')


  const { getCurrentUserProfile, getCurrentUserRole } = getCurrentUser()

  const { doCustomGetRequest, doCustomPostRequest } = customRequest({})

  useEffect(() => {
    async function get() {
      await getCurrentUserProfile().then(async (resultUser) => {
        setUser(resultUser.data)

        await doCustomGetRequest('/api/followers').then(async (resultFollowing) => {
          await doCustomPostRequest('/api/profiles/get', { userIds: resultFollowing }).then(result => setFollowingProfiles(result))

          await doCustomPostRequest('/api/tweets/get', { userIds: resultFollowing.concat(resultUser.data.id) }).then(async (resultTweets) => {
            setTweets(resultTweets)
            let tweetIds = []
            for (const r of resultTweets) {
              tweetIds.push(r.id)
            }
            await doCustomPostRequest('/api/comments/get', { tweetIds: tweetIds }).then(async (resultComments) => {
              setComments(resultComments)
              let commentIds = []
              for (const r of resultComments) {
                commentIds.push(r.id)
              }
              await doCustomPostRequest('/api/reacts/get', { contentIds: commentIds.concat(tweetIds) }).then(resultReacts => setReacts(resultReacts))
            })

          })
        })

        await doCustomGetRequest('/api/followers/myfollowers').then(async (result) => {
          await doCustomPostRequest('/api/profiles/get', { userIds: result }).then(result => setFollowersProfiles(result))
        })

        await doCustomGetRequest('/api/followers/explore').then(async (result) => {
          await doCustomPostRequest('/api/profiles/get', { userIds: result }).then(result => setExplore(result))
        })

        await getCurrentUserRole().then(result => setRole(result));

      })

    }
    get()
  }, []);

  return (
    <div className='wrapperHome'>
      <NavBar user={role} />
      <div className="wrapperMiddle">
        <div className='middleContent'>
          <div className='homeText'>Home of {user.name}</div>
          <NewTweetForm />
          <Tweet tweets={tweets} users={followingProfiles.concat(user)} restUsers={explore} comments={comments} reacts={reacts} currentUser={user} />
        </div>
      </div>
      <div className="wrapperRight">
        <div className='wrapperFollowers'>
          <h4 className='explanationsHome'>Who to follow</h4>
          <hr />
          <Recommended explore={explore} />
        </div>
        {/* This is new */}
        <div className='wrapperFollowers'>
          <h4 className='explanationsHome'>Followers: {followersProfiles.length}</h4>
          <hr />
          <Followers followers={followersProfiles} />
        </div>
        <div className='wrapperFollowers' style={{ marginTop: '4%' }}>
          <h4 className='explanationsHome'>Following: {followingProfiles.length}</h4>
          <hr />
          <Following following={followingProfiles} />
        </div>
        {/* ---------------- */}
      </div>
    </div>
  )
}

export default Home  

{/* <div className="col-sm">
            <div className='wrapperFollowers'>
              <h4 className='explanationsHome'>Followers: {followersProfiles.length}</h4>
              <hr />
              <Followers followers={followersProfiles} />
            </div>
            <div className='wrapperFollowers' style={{ marginTop: '4%' }}>
              <h4 className='explanationsHome'>Following: {followingProfiles.length}</h4>
              <hr />
              <Following following={followingProfiles} />
            </div>
          </div> */}








{/* <div className='wrapperHome'>
      <NavBar user={role} />
      <div className="container">
        <div className="row">          
          <div className="col-sm wrapperMiddle">
            <div className='homeText'>Home of {user.name}</div>
            <NewTweetForm />
            <Tweet tweets={tweets} users={followingProfiles.concat(user)} restUsers={explore} comments={comments} reacts={reacts} currentUser={user} />
          </div>
          <div className="col-sm wrapperRight">
            <div className='wrapperFollowers'>
              <h4 className='explanationsHome'>Who to follow</h4>
              <hr />
              <Recommended explore={explore} />
            </div>
            <div className='wrapperFollowers'>
              <h4 className='explanationsHome'>Followers: {followersProfiles.length}</h4>
              <hr />
              <Followers followers={followersProfiles} />
            </div>
            <div className='wrapperFollowers' style={{ marginTop: '4%' }}>
              <h4 className='explanationsHome'>Following: {followingProfiles.length}</h4>
              <hr />
              <Following following={followingProfiles} />
            </div>
          </div>
        </div>
      </div>
    </div> */}