import React from 'react';
import UserMediaTableRow from './UserMediaTableRow';
import { findUserByUsername } from '../../services/UserService';
import '../../style/UserWatchedComponentStyle.css';

class UserWatchedComponent extends React.Component {
    state = {
        watched: []
    }

    componentDidMount = async () => {
        const user = await findUserByUsername(this.props.username);
        this.setState({watched: user.watched});
    }

    render() {
        return (
        <div id='user-watched-component'>
            <h2>Watched Media:</h2>
            <br/>
            <table id='user-watched-component-table' className='table'>
                <thead id='user-watched-component-table-header'>
                    <tr id='user-watched-component-table-header-row'>
                        <th></th>
                        <th>Title</th>
                        <th>Year(s)</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody id='user-watched-component-table-body'>
                {
                    this.state.watched.map(item =>
                        <UserMediaTableRow
                            imdbID={item.imdb}
                            key={item.imdb} />
                    )
                }
                </tbody>
            </table>
        </div>
        )
    }
}

export default UserWatchedComponent