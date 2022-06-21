import React from 'react'
import { BiComment } from "react-icons/bi"
import '../../styles/Tweet.css'

const CommentsCount = (props) => {
    let comments = 0


    if (props.comments) {
        comments = props.comments
    }

  return (
    <div className='tweetContent'><BiComment />&nbsp;{comments}</div>
  )
}

export default CommentsCount