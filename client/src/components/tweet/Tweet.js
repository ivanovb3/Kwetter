import React from 'react'

const Tweet = (props) => {

    let tweets = []
    let users = []
    if (props.tweets && props.users) {
        tweets = props.tweets
        users = props.users
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
        return Math.floor(seconds) + " seconds";
    }

    let tweetsDiv = []
    if (tweets) {
        for (let i = 0; i < tweets.length; i++) {
            let user = users.find(x => x.id === tweets[i].userId)
            tweetsDiv.push(
                <div key={tweets[i].id} className='border border-secondary'>
                    <div className='d-flex'>
                        {user.name} <div className='text-muted float-right' style={{marginLeft: 'auto'}}>{timeSince(tweets[i].createdAt)}</div>
                    </div>
                    {tweets[i].content}
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