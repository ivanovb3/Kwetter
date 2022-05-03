// import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useRequest from '../hooks/use-request'

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
        <div>
            <form onSubmit={onSubmit}>
                <h1>Sign In</h1>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1"
                        aria-describedby="emailHelp" placeholder="Email address"
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div class="form-group mt-3">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1"
                        placeholder="Password" value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                {errors}
                {/* {errors.length > 0 && { errors }} */}
                <button type="submit" class="btn btn-primary mt-3">Sign In</button>
            </form>
            <div>
                <h3>Don't have an accout?</h3>
                <Link to='/'>Sign up</Link>
            </div>
        </div>
    )
}

export default SignIn
