import React from 'react'
import HeartReact from './HeartReact'
import { timeSince } from '../../utils/timeSince'
import { ProfilePic } from '../profile/ProfilePic'

const Comment = (props) => {
    let comments = []
    let users = []
    let tweeter = null
    let reacts = []
    let currentUser = null
    if (props.comments && props.users && props.tweeter) {
        comments = props.comments
        users = props.users
        tweeter = props.tweeter
        currentUser = props.currentUser
        reacts = props.reacts
    }



    let commentsDiv = []
    if (comments) {
        // console.log(users)
        for (let i = 0; i < comments.length; i++) {
            let user = users.find(x => x.id === comments[i].userId)
            commentsDiv.push(
                <div key={comments[i].id} className='border-bottom p-2'>
                    <div style={{ width: 50, float: 'left' }}><ProfilePic picture={user.pictureURL} /></div>
                    <div style={{ marginLeft: 53 }}>
                        <div className='d-flex'>
                            {user.name} <div className='text-muted float-right' style={{ marginLeft: 'auto' }}>{timeSince(comments[i].createdAt)}</div>
                        </div>
                        <div className='text-muted float-left' style={{ marginRight: 'auto' }}>Replying to {tweeter.name}</div>
                        {comments[i].content} <br />
                        <HeartReact reacts={reacts} userId={currentUser.id} contentId={comments[i].id} />
                    </div>
                </div>
            )
        }
    }

    return (
        <div>
            {commentsDiv}
        </div>
    )
}

export default Comment