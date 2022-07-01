import React, { useState } from 'react'
import { ProfilePic } from '../profile/ProfilePic'
import axios from 'axios'
import '../../styles/Moderate.css'

const ModerateForm = (props) => {

    let allUsers = []
    let allUsersRoles = []
    const [selectedRole, setSelectedRole] = useState('')
    const [errors, setErrors] = useState({id: '', error: ''})
    const [errorsDel, setErrorsDel] = useState('')

    if (props.allUsers && props.allUsersRoles) {
        allUsers = props.allUsers
        allUsersRoles = props.allUsersRoles
    }
    let handleModify = async (e) => {
        e.preventDefault();
        const id = e.target.value
        try{
            await axios.post('/api/organizations/newRole', {userId: id, role: selectedRole}).then(() => window.location.reload(false))
        }
        catch(err){
            err.response.data.errors.map(err => setErrorsDel({id: id, error:err.message}))
        }
        
    }
    let handleChange = (e) => {
        e.preventDefault();
        setSelectedRole(e.target.value);
    }
    let handleDelete = async (e) => {
        e.preventDefault();
        const id = e.target.value
        try{
        await axios.post('/api/organizations/delete', {userId: id}).then(() => window.location.reload(false)) }
        catch(err){
            err.response.data.errors.map(err => setErrorsDel({id: id, error:err.message}))
            //setErrorsDel({id: id, error: err.response.data})
        }
        // setSelectedRole(e.target.value);
    }

    let moderateDiv = []
    if (allUsers) {
        for (let i = 0; i < allUsers.length; i++) {
            const role = allUsersRoles.find(x => x.id == allUsers[i].id).role
            moderateDiv.push(
                <div key={allUsers[i].id} className="d-flex p-3" style={{ marginTop: 15 }}>
                    <div style={{ width: 50, marginBottom: 'auto' }}><ProfilePic picture={allUsers[i].pictureURL} /></div>
                    <h4 className='float-left explanationsProfile' style={{ marginRigth: 'auto', marginBottom: 'auto', marginRight: '2%', width: '40%' }}>{allUsers[i].name}: {role}</h4>
                    <select className="custom-select"  onChange={handleChange}>
                        <option defaultValue="">Choose role</option>
                        <option value="USER">User</option>
                        <option value="MODERATOR">Moderator</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                    <button type="button" className="btn btn-sm btn-info pull-right" style={{ marginLeft: '3%', marginRight: 3 }}
                        value={allUsers[i].id} onClick={handleModify}><i className="fa fa-close-round"></i>Modify</button>
                        {errors.id == allUsers[i].id ? errors.error : null}
                    <button type="button" className="btn btn-sm btn-danger pull-right " style={{ marginLeft: '3%', marginRight: 3 }}
                        value={allUsers[i].id} onClick={handleDelete}><i className="fa fa-close-round"></i>Delete</button>
                        {errorsDel.id == allUsers[i].id ? errorsDel.error : null}
                </div>
            )
        }
    }

    return (
        <div className='border border-secondary rounded'>{moderateDiv}</div>
        
    )
}

export default ModerateForm