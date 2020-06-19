import React from 'react';
import { findFollows } from '../../services/UserService'
import { Link } from 'react-router-dom'
import '../../style/UserFollowingComponentStyle.css';

class UserFollowingComponent extends React.Component {
    state = {
        users: []
    }

    componentDidMount = async () => {
        const users = await findFollows(this.props.username);
        this.setState({users: users});
    }

    render() {
        return(
        <div id='user-following-component'>
            <h2>Following:</h2>
            <ul id='user-following-component-list' className='list-group'>
            {
                this.state.users.map(user =>
                    <li key={user.username} className='user-following-component-list-item list-group-item'>
                        <Link to={"/profile/" + user.username}>
                            {user.username}
                        </Link>
                    </li>
                )
            }
            </ul>
        </div>
        )
    }
}

export default UserFollowingComponent