import React from 'react'

const Comment = (props) => {
    let comments = []
    let users = []
    let tweeter = null
    if (props.comments && props.users && props.tweeter) {
        comments = props.comments
        users = props.users
        tweeter = props.tweeter
        // console.log(props.tweets[0].createdAt)
    }

    function timeSince(date) {

        var seconds = Math.floor((new Date() - new Date(date)) / 1000);

        var interval = seconds / 31536000;

        if (interval > 1) {
            return Math.floor(interval) + " years";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + " months";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " days";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " hours";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " minutes";
        }
        return "just now"  //Math.floor(seconds) + " seconds";
    }

    let commentsDiv = []
    if (comments) {
        // console.log(users)
        for (let i = 0; i < comments.length; i++) {
            let user = users.find(x => x.id === comments[i].userId)
            commentsDiv.push(
                <div key={comments[i].id} className='border-bottom p-2'>
                    <div className='d-flex'>
                        {user.name} <div className='text-muted float-right' style={{marginLeft: 'auto'}}>{timeSince(comments[i].createdAt)}</div>
                    </div>
                    <div className='text-muted float-left' style={{marginRight: 'auto'}}>Replying to {tweeter.name}</div>
                    {comments[i].content} <br/>                    
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