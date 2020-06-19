import React from 'react';
import { grantAdminPrivileges, findUserByUsername, updateUser } from '../../services/UserService';
import '../../style/UserProfileComponentStyle.css';

class UserProfileComponent extends React.Component {
    state = {
        editing: false,
        user: {},
        newUser: {},
        oldPassword: "",
        confirmNewPassword: "",
        ready: false
    }

    componentDidMount = async () => {
        const user = await findUserByUsername(this.props.username);
        this.setState({
            user: user,
            newUser: user,
            ready: true
        })
    }

    componentDidUpdate = async (prevProps, prevState, snapshot) => {
        if (this.props.username !== prevProps.username || this.props.user.username !== prevProps.user.username) {
            const user = await findUserByUsername(this.props.username);
            this.setState({
                user: user,
                newUser: user,
                ready: true
            })
        }
    }

    giveAdminPrivileges = async () => {
        if (this.props.user.admin) {
            const loggedInPass = prompt("Enter your password:");
            if (await grantAdminPrivileges(this.props.username, this.props.user.username, loggedInPass) === 0)
                alert("Incorrect Password");
            else
                this.setState({user: {...this.state.user, admin: true}})
        } else {
            alert("How dare you!?") // This should never happen.
        }
    }

    render() {
        if (this.state.ready)
        return (
        <div id='user-component' className='row'>
            <div id='profile-fields' className='col-10'>
                <div className='user-component-username-row row'>
                    <label htmlFor='user-profile-username-input'
                        id='user-profile-username-label'
                        className='col-4'>
                        Username:
                    </label>
                    <input disabled={this.state.editing ? '' : 'disabled'} type='text'
                        name='username' value={this.state.newUser.username}
                        id='user-profile-username-input'
                        className='col-8 form-control'
                        onChange={(e) => this.setState({newUser: {username: e.target.value, password: this.state.newUser.password}})}/>
                </div>
                <br/>
                {
                    this.state.user.username === this.props.user.username && this.state.editing &&
                    <div id='passwords-div'>
                        <div className='user-component-old-password-row row'>
                            <label htmlFor='user-profile-old-password-input'
                                id='user-profile-old-password-label'
                                className='col-4'>
                                Old Password:
                            </label>
                            <input type='password'
                                name='old-password' value={this.state.oldPassword}
                                id='user-profile-old-password-input'
                                className='col-8 form-control'
                                onChange={(e) => this.setState({oldPassword: e.target.value})} />
                        </div>
                        <br/>
                        <div className='user-component-password-row row'>
                            <label htmlFor='user-profile-password-input'
                                id='user-profile-password-label'
                                className='col-4'>
                                New Password:
                            </label>
                            <input type='password'
                                name='password' value={this.state.user.password}
                                id='user-profile-password-input'
                                className='col-8 form-control'
                                onChange={(e) => this.setState({newUser: {username: this.state.newUser.username, password: e.target.value}})}/>
                        </div>
                        <br/>
                        <div className='user-component-confirm-password-row row'>
                            <label htmlFor='user-profile-confirm-new-password-input'
                                id='user-profile-confirm-new-password-label'
                                className='col-4'>
                                Confirm New Password:
                            </label>
                            <input type='password'
                                name='confirm-new-password' value={this.state.confirmNewPassword}
                                id='user-profile-confirm-new-password-input'
                                className='col-8 form-control'
                                onChange={(e) => this.setState({confirmNewPassword: e.target.value})}/>
                        </div>
                    </div>
                }
            </div>
            {
                this.props.loggedIn && this.props.user.username === this.state.user.username &&
                <div id='edit-button' className='col-2'>
                {
                    !this.state.editing &&
                    <button onClick={() => this.setState({editing: true})} id='profile-edit-button' className='col-12 btn'>
                        Edit
                    </button>
                }
                {
                    this.state.editing &&
                    <button onClick={async () => {
                        if (this.state.confirmNewPassword !== this.state.newUser.password) {
                            alert("The two new passwords do not match.");
                            return;
                        }
                        else if (this.state.newUser.password.length < 8) {
                            alert("The new password must be at least 8 characters long.")
                            return;
                        }
                        const result = await updateUser(this.state.newUser, this.state.oldPassword)
                        if (result === 0)
                            alert("The given Old Password does not match.");
                        else
                            this.setState({editing: false, oldPassword: "", confirmNewPassword: ""})
                    }} id='profile-save-button' className='btn col-12'>
                        Save
                    </button>
                }
                </div>
            }
            {
                this.props.loggedIn && this.props.user.admin && !this.state.user.admin &&
                <div id='grant-admin-button-div' className='col-2'>
                    <button id='grant-admin-button' className='btn col-12'
                        onClick={async () => await this.giveAdminPrivileges()}>
                        Grant Admin Privileges
                    </button>
                </div>
            }
        </div>
        )
        else return (<div></div>)
    }
}

export default UserProfileComponent