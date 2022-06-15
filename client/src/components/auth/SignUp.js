import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useRequest from '../../hooks/use-request'
import '../../styles/SignIn.css'

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
        onSuccess: (response) => { navigate(`/profile/${response}`) }
    })

    const onSubmit = async (e) => {
        e.preventDefault()

        await doRequest()
    }
    return (
        <div className='wrapper'>
            <div className='wrapperBox'>
                <form onSubmit={onSubmit}>
                    <h1 className='explanations'>Sign Up</h1>
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
                    <button type="submit" className="btn btn-primary mt-3">Sign Up</button>
                </form>
                <span>
                    <h3 className='explanations signInTextAndLink' >Already have an accout?</h3>
                    <Link to='/login' className='signInLink signInTextAndLink'>Sign in</Link>
                </span>
            </div>
        </div>
    )
}

export default SignUp
