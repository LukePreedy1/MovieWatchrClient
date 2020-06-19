import React from 'react';
import {Link} from 'react-router-dom';
import '../style/HeaderComponentStyle.css';

const HeaderComponent = ({loggedIn, updateForm, newUsername, newPassword, logIn, logOut, history, user}) => {
    return (
    <center>
    {
        !loggedIn &&
        <div id="homepage-header-component-login-row" className='row'>
            <Link to='/' className='col-3'>
                <b>Movie Watchr</b>
            </Link>
            <div className='col-3' id='login-username-span'>
                <label className='col-5' htmlFor='homepage-header-component-username-input'>
                    Username:
                </label>
                <input
                    id='homepage-header-component-username-input'
                    className='col-7'
                    onChange={(e) => updateForm({
                        newUsername: e.target.value
                    })}
                    placeholder='username'
                    value={newUsername}/>
            </div>
            <div className='col-3' id='login-password-span'>
                <label className='col-5' htmlFor='homepage-header-component-password-input'>
                    Password:
                </label>
                <input
                    id='homepage-header-component-password-input'
                    className='col-7'
                    onChange={(e) => updateForm({
                        newPassword: e.target.value
                    })}
                    placeholder='password'
                    value={newPassword}
                    type='password'/>
            </div>
            <button
                id='homepage-header-component-login-button'
                className='btn col-1'
                onClick={() => logIn()}>
                Log In
            </button>
            <button
                id='homepage-header-component-register-button'
                className='btn col-1'
                onClick={() => history.push('/register')}>
                Register
            </button>
            <button
                id='header-component-search-button'
                className='btn col-1'
                onClick={() => history.push('/search')}>
                Search
            </button>
        </div>
    }

    {
        loggedIn &&
        <div id='homepage-header-component-logged-in-row' className='row col-12'>
            <Link to='/' className='col-4'>
                <b>Movie Watchr</b>
            </Link>
            <span className='col-4'></span>
            <Link to={"/profile/" + user.username} className='col-2'>
                <b>{user.username}</b>
            </Link>
            <button
                id='homepage-header-component-logout-button'
                className='btn col-1'
                onClick={() => logOut()}>
                Log Out
            </button>
            <button
                id='header-component-search-button'
                className='btn col-1'
                onClick={() => history.push('/search')}>
                Search
            </button>
        </div>
    }
    </center>
    )
}

export default HeaderComponent;