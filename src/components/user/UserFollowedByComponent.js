import React from 'react';
import { findFollowedBy } from '../../services/UserService'
import { Link } from 'react-router-dom'
import '../../style/UserFollowedByComponentStyle.css';

class UserFollowedByComponent extends React.Component {
    state = {
        users: []
    }

    componentDidMount = async () => {
        const users = await findFollowedBy(this.props.username)
        this.setState({users: users})
    }

    render() {
        return(
        <div id='user-followed-by-component'>
            <h2>Followed By:</h2>
            <ul className='list-group'>
            {
                this.state.users.map((user) =>
                    <li key={user.username} className='user-followed-by-component-list-item list-group-item'>
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

export default UserFollowedByComponent