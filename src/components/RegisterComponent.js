import React from 'react'
import {Link} from 'react-router-dom'
import {createUser, findUserByUsername} from '../services/UserService'
import '../style/RegisterComponentStyle.css';

class RegisterComponent extends React.Component {
    state = {
        newUsername: '',
        newPassword: '',
        newConfirmPassword: ''
    }

    isUsernameUnique = async (username) => {
        try {
            return await findUserByUsername(username)
                .then(foundUser => Object.keys(foundUser).length === 0)
        } catch (error) {
            return true;
        }
    }

    registerUser = async () =>
    {
        if (this.state.newPassword !== this.state.newConfirmPassword) {
            alert("The 'Password' and 'Confirm Password' fields must match.")
            return;
        } else if (this.state.newUsername.length < 5) {
            alert("Your username must be at least 5 characters long.")
            return;
        } else if (this.state.newPassword.length < 8) {
            alert("Your password must be at least 8 characters long.")
            return;
        }

        const unique = await this.isUsernameUnique(this.state.newUsername)

        if (unique) {
            const newUser = {
                username: this.state.newUsername,
                password: this.state.newPassword,
                isAdmin: false
            }
            const createdUser = await createUser(newUser);
            this.props.updateForm({
                loggedIn: true,
                loggedInUser: createdUser
            })
            this.props.history.push('/')
        } else {
            alert(`The username '${this.state.newUsername}' is already taken, please choose a different one.`)
        }
        return;
    }

    render() {
        return (
        <div id='register-component'>
            <div id='register-component-header-row'>
                <Link to='/' className='col-2'>
                    <b>Movie Watchr</b>
                </Link>
            </div>
            <div className='container'>
                <center className='form-group row' id='register-component-username-row'>
                    <label htmlFor='register-component-username-fld' className='col-3'>Username</label>
                    <input className='col-8 form-control' id='register-component-username-fld'
                        onChange={(e) => this.setState({newUsername: e.target.value})} />
                </center>
                <center className='form-group row' id='register-component-password-row'>
                    <label htmlFor='register-component-password-fld' className='col-3'>Password</label>
                    <input className='col-8 form-control' type='password' id='register-component-password-fld'
                        onChange={(e) => this.setState({newPassword: e.target.value})} />
                </center>
                <center className='form-group row' id='register-component-confirm-password-row'>
                    <label htmlFor='register-component-confirm-password-fld' className='col-3'>Confirm Password</label>
                    <input className='col-8 form-control' type='password' id='register-component-confirm-password-fld'
                        onChange={(e) => this.setState({newConfirmPassword: e.target.value})} />
                </center>
                <button onClick={() => this.registerUser()} id='register-component-button' className='btn btn-primary btn-block'>Register</button>
            </div>
        </div>
        )
    }
}

export default RegisterComponent