import React from 'react'
import NewCommentForm from './NewCommentForm'
import Comment from './Comment'

const Tweet = (props) => {

    let tweets = []
    let users = []
    let comments = []
    let restUsers = []

    if (props.tweets && props.users && props.comments && props.restUsers) {
        tweets = props.tweets
        users = props.users
        comments = props.comments
        restUsers = props.restUsers
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
        return "just now"//Math.floor(seconds) + " seconds";
    }

    let tweetsDiv = []
    if (tweets) {
        for (let i = 0; i < tweets.length; i++) {
            let user = users.find(x => x.id === tweets[i].userId)
            let commentsTweet = comments.filter(x => x.tweetId === tweets[i].id)
            //console.log(commentsTweet)
            tweetsDiv.push(
                <div key={tweets[i].id} className='border border-secondary p-2'>
                    <div className='mb-3'>
                        <div className='d-flex'>
                            {user.name} <div className='text-muted float-right' style={{ marginLeft: 'auto' }}>{timeSince(tweets[i].createdAt)}</div>
                        </div>
                        {tweets[i].content} <br />
                    </div>
                    <NewCommentForm tweetId={tweets[i].id} />
                    <Comment comments={commentsTweet} users={users.concat(restUsers)} tweeter={user} />
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