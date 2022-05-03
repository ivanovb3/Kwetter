import React, { useEffect, useState } from 'react'
import getCurrentUser from '../hooks/get-current-user'

const Home = () => {
  const [user, setUser] = useState('')
  getCurrentUser().then(result => setUser(result))

    // useEffect(async () => {
    //     setUser(getUser())
    // })
    // console.log('tipedal li si' + user)

  return (
    <div>Home of {user.currentUser.email} na maikati putkata</div>
  )
}

export default Home