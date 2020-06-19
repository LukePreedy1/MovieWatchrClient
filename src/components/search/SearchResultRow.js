import React from 'react'
import {getMovieFromID} from '../../services/OMDBService'
import {Link} from 'react-router-dom'
import { createMedia, findMediaByImdbID } from '../../services/MediaService'

class SearchResultRow extends React.Component {
    state = {
        movie: {}
    }

    componentDidMount = async () => {
        this.isMovieInDB(this.props.imdbID);
        const movie = await getMovieFromID(this.props.imdbID)
        this.setState({
            movie: movie
        })
    }

    // Checks if that movie is in our database.  If not, puts it there.
    isMovieInDB = async () => {
        try {
            await findMediaByImdbID(this.props.imdbID);
            return;
        } catch (error) {
            await createMedia({imdb: this.props.imdbID});
            return;
        }
    }

    render() {
        return (
        <tr>
            <td>
                <Link to={'/details/' + this.props.imdbID}>
                    <img src={this.state.movie.Poster} alt={this.state.movie.Title}/>
                </Link>
            </td>
            <td>
                <Link to={'/details/' + this.props.imdbID}>
                    <b>{this.state.movie.Title}</b>
                </Link>
            </td>
            <td>{this.state.movie.Year}</td>
            <td>{this.state.movie.Plot}</td>
        </tr>
        )
    }
}

export default SearchResultRow