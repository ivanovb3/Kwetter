import React, { useState } from 'react'
import useRequest from '../../hooks/use-request'
import '../../styles/Tweet.css'

const NewTweetForm = () => {

    const [tweet, setTweet] = useState('')

    const { doRequest, errors } = useRequest({
        url: '/api/tweets',
        method: 'post',
        body: {
            content: tweet
        },
        onSuccess: () => {window.location.reload(false)}//{ <Navigate to="/home" replace /> }
    })

    const onSubmit = async (e) => {
        e.preventDefault()

        await doRequest()
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group d-flex newTweetForm">
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="2" placeholder="What's happening?" value={tweet} onChange={(e) => setTweet(e.target.value)}></textarea>
                <button type="submit" className="btn btn-primary float-right">Tweet</button>
            </div>
            {errors}
        </form>
    )
}

export default NewTweetForm