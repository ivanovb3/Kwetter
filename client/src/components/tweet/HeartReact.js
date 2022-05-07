import React from 'react'
import { FaHeart, FaRegHeart } from "react-icons/fa"
import useRequest from '../../hooks/use-request'

const HeartReact = (props) => {
    let reacts = []
    let userId = ''
    let contentId = ''

    if (props.reacts && props.userId && props.contentId) {
        reacts = props.reacts
        userId = props.userId
        contentId = props.contentId
    }

    const { doRequest, errors } = useRequest({
      url: '/api/reacts',
      method: 'post',
      body: {
          contentId: contentId
      },
      onSuccess: () => {window.location.reload(false)} 
  })

    let reactContent = reacts.find(x => x.id === contentId)
    const isLiked = reactContent.reacts.includes(userId);

    const handleReact = async (e) => {
      e.preventDefault()

      await doRequest()
  }

    let heartReact = isLiked ? <FaHeart onClick={handleReact}/> : <FaRegHeart onClick={handleReact}/>

  return (
    <div className=''>{heartReact} {reactContent.reacts.length}</div>
  )
}

export default HeartReact