import React, { useState, useEffect } from 'react'
import useRequest from '../../hooks/use-request'
import '../../styles/Profile.css'

const UpdateProfile = (props) => {
    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const { doRequest } = useRequest({
        url: '/api/profiles',
        method: 'post',
        body: {
            name, bio
        },
        // onSuccess: () => {navigate('/profiles')}//{ <Navigate to="/home" replace /> }
    })

    const onSubmit = async (e) => {
        e.preventDefault()

        await doRequest()

        window.location.reload(false)
    }

    useEffect(() => {
        if (props.name) {
            setName(props.name);
        }
        if (props.bio) {
            setBio(props.bio);
        }
    }, [props.name, props.bio]);

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label className='explanationsProfile'>Name</label>
                <input type="text" className="form-control" id="exampleInputName" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="form-group">
                <label className='explanationsProfile'>Bio</label>
                <input type="text" className="form-control" id="exampleInputBIO" placeholder="Enter Bio" value={bio} onChange={(e) => setBio(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary updateProfileButton">Update profile info</button>
        </form>
    )
}

export default UpdateProfile