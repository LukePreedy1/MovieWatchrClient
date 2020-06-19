import React from 'react';
import { getMovieFromID } from '../../services/OMDBService';
import { Link } from 'react-router-dom'

class UserMediaTableRow extends React.Component {
    state = {
        media: {}
    }

    componentDidMount = async () => {
        const media = await getMovieFromID(this.props.imdbID);
        this.setState({media: media})
    }

    render() {
        return (
        <tr>
            <td>
                <img src={this.state.media.Poster} alt={this.state.media.Title}/>
            </td>
            <td>
                <Link to={'/details/' + this.props.imdbID}>
                    {this.state.media.Title}
                </Link>
            </td>
            <td>{this.state.media.Year}</td>
            <td>{this.state.media.Plot}</td>
        </tr>
        )
    }
}

export default UserMediaTableRow