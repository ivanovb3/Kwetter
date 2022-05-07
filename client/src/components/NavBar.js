import React from 'react'
import { Link } from 'react-router-dom'
import useRequest from '../hooks/use-request'

const NavBar = (props) => {
    let user = props
    const { doRequest } = useRequest({
        url: '/api/users/signout',
        method: 'post'
    })

    const handleLogOut = async () => {
        await doRequest();
    }

    let logInOutLink = user.id ? <Link to='/login' onClick={handleLogOut} className='nav-link'>Log out</Link> : null//<Link to='/login' className='nav-link'>Log in</Link>

    const profileLink = `/profile/${user.id}`
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/home">Kwetter</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav navbar-left">
                    <li className="nav-item">
                        <Link to='/home' className="nav-link" >Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={profileLink} className="nav-link" >Profile</Link>
                    </li>
                </ul>
                <ul className='navbar-nav navbar-right'>
                    <li className="nav-item">
                        {logInOutLink}
                    </li>
                    {/* <li className="nav-item">
                        <a className="nav-link" href="#">Pricing</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="#">Disabled</a>
                    </li> */}
                </ul>
            </div>
        </nav>
    )
}

export default NavBar