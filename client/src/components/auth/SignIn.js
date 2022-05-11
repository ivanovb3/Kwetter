// import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useRequest from '../../hooks/use-request'

const SignIn = () => {
    let navigate = useNavigate()
    // const [user, setUser] = useState({})
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { doRequest, errors } = useRequest({
        url: '/api/users/signin',
        method: 'post',
        body: {
            email, password
        },
        onSuccess: () => {navigate('/home')}//{ <Navigate to="/home" replace /> }
    })

    const onSubmit = async (e) => {
        e.preventDefault()

        await doRequest()
    }

    // useEffect(async () => {
    //     try {
    //         await axios.get("/api/users/currentuser")
    //             .then((res) => {
    //                 if (res.data != null) {
    //                     setUser(true)
    //                     console.log(res.data)
    //                 }
    //                 else {
    //                     setUser(false)
    //                     console.log(res.data)
    //                 }
    //             })
    //     }
    //     catch (err) {
    //         console.log('Backend not working!')
    //     }
    // })
    return (
        <div style={{width: '30%', justifyContent: 'center', marginLeft: '35%', padding: 5, marginTop: '5%'}} className='border border-primary rounded'>
            <form onSubmit={onSubmit}>
                <h1>Sign In</h1>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1"
                        aria-describedby="emailHelp" placeholder="Email address"
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"
                        placeholder="Password" value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                {errors}
                <button type="submit" className="btn btn-primary mt-3">Sign In</button>
            </form>
            <div>
                <h3>Don't have an accout?</h3>
                <Link to='/'>Sign up</Link>
            </div>
        </div>
    )
}

export default SignIn
