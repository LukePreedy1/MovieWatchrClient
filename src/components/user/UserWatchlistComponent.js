import React from 'react';
import { findUserByUsername } from '../../services/UserService';
import UserMediaTableRow from './UserMediaTableRow';
import '../../style/UserWatchlistComponentStyle.css';

class UserWatchlistComponent extends React.Component {
    state = {
        watchlist: [],
    }

    componentDidMount = async () => {
        const user = await findUserByUsername(this.props.username);
        this.setState({watchlist: user.watchlist})
    }


    render() {
        return (
        <div id='user-watchlist-component' className='table-responsive'>
            <h2>Watchlist:</h2>

            <table className='table' id='user-watchlist-component-table'>
                <thead id='user-watchlist-component-table-header'>
                    <tr id='user-watchlist-component-table-header-row'>
                        <th></th>
                        <th>Title</th>
                        <th>Year(s)</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody id='user-watchlist-component-table-body'>
                {
                    this.state.watchlist.map(item =>
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

export default UserWatchlistComponent