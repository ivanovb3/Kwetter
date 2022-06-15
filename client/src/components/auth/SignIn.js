import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useRequest from '../../hooks/use-request'
import '../../styles/SignIn.css'

const SignIn = () => {
    let navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { doRequest, errors } = useRequest({
        url: '/api/users/signin',
        method: 'post',
        body: {
            email, password
        },
        onSuccess: () => { navigate('/home') }
    })

    const onSubmit = async (e) => {
        e.preventDefault()

        await doRequest()
    }
    return (
        <div className='wrapper'>
            <div className='wrapperBox'>
                <form onSubmit={onSubmit}>
                    <h1 className='explanations'>Sign In</h1>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1" className='explanations'>Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1"
                            aria-describedby="emailHelp" placeholder="Email address"
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="exampleInputPassword1" className='explanations'>Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"
                            placeholder="Password" value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {errors}
                    <button type="submit" className="btn btn-primary mt-3">Sign In</button>
                </form>
                <span>
                    <h3 className='explanations signInTextAndLink'>Don't have an accout?</h3>
                    <Link to='/' className='signInLink signInTextAndLink'>Sign up</Link>
                </span>
            </div>
        </div>
    )
}

export default SignIn
