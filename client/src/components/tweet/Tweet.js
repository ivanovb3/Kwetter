import React, { useState } from 'react'
import NewCommentForm from './NewCommentForm'
import Comment from './Comment'
import HeartReact from './HeartReact'
import { timeSince } from '../../utils/timeSince'
import { ProfilePic } from '../profile/ProfilePic'

const Tweet = (props) => {

    let tweets = []
    let users = []
    let comments = []
    let restUsers = []
    let reacts = []
    let currentUser = null

    if (props.tweets && props.users && props.comments && props.restUsers && props.reacts) {
        tweets = props.tweets
        users = props.users
        comments = props.comments
        restUsers = props.restUsers
        reacts = props.reacts
        currentUser = props.currentUser
    }

    let tweetsDiv = []
    if (tweets) {
        for (let i = 0; i < tweets.length; i++) {
            let user = users.find(x => x.id === tweets[i].userId)
            let commentsTweet = comments.filter(x => x.tweetId === tweets[i].id)
            tweetsDiv.push(
                <div key={tweets[i].id} className='border border-secondary p-2'>
                    <div className='mb-3'>
                        <div style={{width: 50, float: 'left'}}><ProfilePic picture={user.pictureURL} /></div>
                        <div style={{marginLeft: 53}}>
                            <div className='d-flex'>
                                <h6>{user.name}</h6> <div className='text-muted float-right' style={{ marginLeft: 'auto' }}>{timeSince(tweets[i].createdAt)}</div>
                            </div>
                            {tweets[i].content} <br />
                            <HeartReact reacts={reacts} userId={currentUser.id} contentId={tweets[i].id} />
                        </div>
                    </div>
                    <NewCommentForm tweetId={tweets[i].id} />
                    <Comment comments={commentsTweet} users={users.concat(restUsers)} tweeter={user} reacts={reacts} currentUser={currentUser} />
                </div>
            )
        }
    }

    return (
        <div>
            {tweetsDiv}
        </div>
    )
}

export default Tweet