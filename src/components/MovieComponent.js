import React from 'react';
import { getFullMovieFromID } from '../services/OMDBService'
import { isMediaOnWatchlist, isMediaWatched } from '../services/UserService'
import { Link } from 'react-router-dom'
import MediaReviewList from './reviews/MediaReviewList'
import '../style/MovieComponentStyle.css';

class MovieComponent extends React.Component {
    state = {
        movie: {},
        onWatchlist: false,
        watched: false
    }

    componentDidMount = async () => {
        const movie = await getFullMovieFromID(this.props.imdbID)
        var onWatchlist = false;
        var watched = false;
        if (this.props.loggedIn && typeof this.props.user.username !== 'undefined') {
            onWatchlist = await isMediaOnWatchlist(this.props.user.username, this.props.imdbID)
            watched = await isMediaWatched(this.props.user.username, this.props.imdbID);
        }
        this.setState({
            movie: movie,
            onWatchlist: onWatchlist,
            watched: watched
        })
    }

    componentDidUpdate = async (prevProps, prevState, snapshot) => {
        if (this.props.user.username !== prevProps.user.username) {
            const movie = await getFullMovieFromID(this.props.imdbID)
            var onWatchlist = false;
            var watched = false;
            if (this.props.loggedIn) {
                onWatchlist = await isMediaOnWatchlist(this.props.user.username, this.props.imdbID)
                watched = await isMediaWatched(this.props.user.username, this.props.imdbID);
            }
            this.setState({
                movie: movie,
                onWatchlist: onWatchlist,
                watched: watched
            })
        }
    }

    render() {
        return (
        <div className='movie-component row'>
            <div id='poster-column-div' className='col-3'>
                <img alt={this.state.movie.Poster} src={this.state.movie.Poster} className='col-12'/>
            </div>

            <div id='description-reviews-div' className='col-7'>
                <h1 id='movie-title'>{this.state.movie.Title}</h1>
                <h3 id='movie-director'>{'Director: ' + this.state.movie.Director}</h3>
                <p id='movie-description'>
                    {this.state.movie.Plot}
                </p>
                <br/>
                <div id='media-review-section'>
                    <h3><b>Reviews:</b></h3>
                    <MediaReviewList
                        loggedIn={this.props.loggedIn}
                        user={this.props.user}
                        imdbID={this.props.imdbID} />
                </div>
            </div>

            <div id='buttons-div' className='col-2'>
            {
                this.props.loggedIn &&
                <div>
                {
                    this.state.watched &&
                    <center id='is-watched-marker'>Watched</center>
                }
                {
                    !this.state.watched &&
                    <button id='mark-movie-as-watched-button' className='btn col-12'
                        onClick={() => {
                            this.props.markMovieAsWatched(this.props.imdbID)
                            this.setState({onWatchlist: false, watched: true})
                        }}>
                        Mark movie as Watched
                    </button>
                }
                    <Link to={'/details/' + this.props.imdbID + '/write-review'}>
                        <button id='review-button' className='btn col-12'>Write Review</button>
                    </Link>
                {
                    this.state.onWatchlist &&
                    <button id='remove-from-watchlist-button' className='btn col-12'
                        onClick={() => {
                            this.props.removeFromWatchlist(this.props.imdbID)
                            this.setState({onWatchlist: false})
                        }}>
                        Remove from Watchlist
                    </button>
                }
                {
                    !this.state.onWatchlist &&
                    <button id='add-to-watchlist-button' className='btn col-12'
                        onClick={() => {
                            this.props.addToWatchlist(this.props.imdbID)
                            this.setState({onWatchlist: true})
                        }}>
                        Add to Watchlist
                    </button>
                }
                </div>
            }
            {
                !this.props.loggedIn &&
                <p>Log in to write a review.</p>
            }
            </div>
        </div>
        )
    }
}

export default MovieComponent