import React, { useState } from 'react'
import useRequest from '../../hooks/use-request'
import '../../styles/Tweet.css'

const NewCommentForm = (props) => {
    const [comment, setComment] = useState('')

    const { doRequest, errors } = useRequest({
        url: '/api/comments',
        method: 'post',
        body: {
            tweetId: props.tweetId,
            content: comment
        },
        onSuccess: () => { window.location.reload(false) }//{ <Navigate to="/home" replace /> }
    })

    const onSubmit = async (e) => {
        e.preventDefault()

        await doRequest()
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group d-flex newTweetForm">
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="1" placeholder="Tweet your reply" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                <button type="submit" className="btn btn-primary float-right">Reply</button>
            </div>
            {errors}
        </form>
    )
}

export default NewCommentForm