import React from 'react'

const Tweet = (props) => {

    let tweets = []
    if (props) {
        tweets = props.tweets
    }

    let tweetsDiv = []
    if (tweets) {
        for (let i = 0; i < tweets.length; i++) {
            tweetsDiv.push(
                <div key={tweets[i].id}>
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