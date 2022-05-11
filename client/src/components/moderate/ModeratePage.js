import React, { useState, useEffect } from 'react'
import getCurrentUser from '../../hooks/get-current-user'
import NavBar from '../NavBar'
import customRequest from '../../hooks/custom-request'
import ModerateForm from './ModerateForm'
// import useRequest from '../../hooks/use-request'
// import { ProfilePagePic } from './ProfilePic'

const Moderate = () => {
    const [user, setUser] = useState('');
    const [allUsers, setAllUsers] = useState('');
    const [allUsersRoles, setAllUsersRoles] = useState('');


    const { getCurrentUserRole } = getCurrentUser()
    const { doCustomGetRequest, doCustomPostRequest } = customRequest({})

    useEffect(() => {
        async function get() {
            await getCurrentUserRole().then(result => setUser(result));

            await doCustomGetRequest('/api/organizations/get').then(async (resultUsers) => {
                setAllUsersRoles(resultUsers);
                let ids = []
                for(let i=0;i<resultUsers.length; i++){
                    ids.push(resultUsers[i].id)
                }
                await doCustomPostRequest('/api/profiles/get', { userIds: ids }).then(result => setAllUsers(result))
            })

        }
        get()
    }, []);


    return (
        <div>
            <NavBar user={user} />  
            <h2>Moderator page</h2> 
            <ModerateForm allUsers={allUsers} allUsersRoles={allUsersRoles} />         
        </div>
    )
}

export default Moderate