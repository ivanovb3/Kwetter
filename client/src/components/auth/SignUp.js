import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useRequest from '../../hooks/use-request'

const SignUp = () => {

    let navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { doRequest, errors } = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: {
            email, password
        },
        onSuccess: () => {navigate('/home')}
    })

    const onSubmit = async (e) => {
        e.preventDefault()

        await doRequest()
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <h1>Sign Up</h1>
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
                {/* {errors.length > 0 && { errors }} */}
                <button type="submit" className="btn btn-primary mt-3">Sign Up</button>
            </form>
            <div>
                <h3>Already have an accout?</h3>
                <Link to='/login'>Sign in</Link>
            </div>
        </div>
    )
}

export default SignUp
