import React from 'react'

const Tweet = (props) => {

    let tweets = []
    let users = []
    if (props) {
        tweets = props.tweets
        users = props.users
    }

    let tweetsDiv = []
    if (tweets) {
        for (let i = 0; i < tweets.length; i++) {
            let user = users.find(x => x.id === tweets[i].userId)
            tweetsDiv.push(
                <div key={tweets[i].id}>
                    {tweets[i].content} written by {user.name}
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