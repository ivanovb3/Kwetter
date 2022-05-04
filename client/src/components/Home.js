import React, { useState, useEffect } from 'react'
import getCurrentUser from '../hooks/get-current-user'
import NavBar from './NavBar'

const Home = () => {
  const [user, setUser] = useState('')

  const { getUser } = getCurrentUser()

  useEffect(() => {
    async function get() {
      await getUser().then(result => setUser(result.currentUser))
    }
    get()
  }, [getUser]);

  return (
    <div>
      <NavBar {...user}/>
      Home of {user.email}
    </div>
  )
}

export default Home  
