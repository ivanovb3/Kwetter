import React from 'react'
import { Link } from 'react-router-dom'
import useRequest from '../hooks/use-request'
import '../styles/Navbar.css'
import { FaHome , FaUserAlt, FaSignOutAlt } from 'react-icons/fa'
import { AiFillSetting } from 'react-icons/ai'

const NavBar = (props) => {
    let user = { id: '', role: '' }
    // let role = ''
    if (props.user) {
        user = props.user
        // role = props.role
    }

    const { doRequest } = useRequest({
        url: '/api/users/signout',
        method: 'post'
    })

    const handleLogOut = async () => {
        await doRequest();
    }

    // let logInOutLink = user.id ? <Link to='/login' onClick={handleLogOut} className='nav-link'>Log out</Link> : null//<Link to='/login' className='nav-link'>Log in</Link>
    let moderate = user.role === 'MODERATOR' || user.role === 'ADMIN' ? <Link to='../../moderate' className='nav-link navLinks'>< AiFillSetting className='navIcons'/> Moderate</Link> : null

    const profileLink = `/profile/${user.id}`
    return (
        <div className='sidebar'>
            <a className="navbar-brand navHeading" href="/home">Kwetter</a>
            <ul class="nav flex-column">
                <li class="nav-item">                    
                    <Link to='/home' className="nav-link navLinks"><FaHome className='navIcons'/> Home</Link>
                </li>
                <li class="nav-item">
                    <Link to={profileLink} className="nav-link navLinks"> <FaUserAlt className='navIcons'/> Profile</Link>
                </li>
                <li class="nav-item">
                    {moderate}
                </li>
                <li class="nav-item">
                    <Link to='/login' onClick={handleLogOut} className='nav-link navLinks'> <FaSignOutAlt className='navIcons'/> Log out</Link>
                </li>
            </ul>
        </div>
       
        // <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        //     <a className="navbar-brand" href="/home">Kwetter</a>
        //     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        //         <span className="navbar-toggler-icon"></span>
        //     </button>
            // <div className="collapse navbar-collapse" id="navbarNav">
            //     <ul className="navbar-nav navbar-left">
            //         <li className="nav-item">
            //             <Link to='/home' className="nav-link" >Home</Link>
            //         </li>
            //         <li className="nav-item">
            //             <Link to={profileLink} className="nav-link" >Profile</Link>
            //         </li>
            //     </ul>
            //     <ul className='navbar-nav navbar-right'>
            //         <li className="nav-item">
            //             {moderate}
            //         </li>
            //         <li className="nav-item">
            //             <Link to='/login' onClick={handleLogOut} className='nav-link'>Log out</Link>
            //             {/* {logInOutLink} */}
            //         </li>

            //         {/* <li className="nav-item">
            //             <a className="nav-link" href="#">Pricing</a>
            //         </li>
            //         <li className="nav-item">
            //             <a className="nav-link disabled" href="#">Disabled</a>
            //         </li> */}
            //     </ul>
            // </div>
        // </nav>
    )
}

export default NavBar