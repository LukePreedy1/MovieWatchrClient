import React from 'react'
import { getMovieFromID } from '../../services/OMDBService'
import { createReview } from '../../services/ReviewService'
import { Link } from 'react-router-dom'
import '../../style/WriteReviewComponentStyle.css';

class WriteReviewComponent extends React.Component {
    state = {
        movie: {},
        reviewScore: '1',
        reviewText: ''
    }

    componentDidMount = async () => {
        const movie = await getMovieFromID(this.props.imdbID);
        this.setState({
            movie: movie
        })
    }

    postReview = async () => {
        if (this.state.reviewText.length === 0) {
            alert("The review cannot be blank.");
            return;
        } else if (this.state.reviewText.length > 4096) {
            alert("Review text max length is 4096 characters.");
            return;
        }
        await createReview(this.props.user.username, this.props.imdbID, {
            text: this.state.reviewText,
            score: this.state.reviewScore,
            dateWritten: new Date().getTime()
        })
        this.setState({
            reviewText: '',
            reviewScore: ''
        })
        this.props.history.push(`/details/${this.props.imdbID}`)
    }

    render = () => {
        return (
        <div id='write-review-component'>
        {
            this.props.loggedIn &&
            <div className='row'>
                <div id='review-poster-div' className='col-2'>
                    <Link to={'/details/' + this.props.imdbID}>
                        <img alt={this.state.movie.Poster} src={this.state.movie.Poster} className='col-12' />
                    </Link>
                </div>
                <div id='review-movie-title-and-review-content' className='col-10'>
                    <div id='review-movie-title-div'>
                        <Link to={'/details/' + this.props.imdbID}>
                            <h1 id='movie-title-header'>
                                {this.state.movie.Title}
                            </h1>
                        </Link>
                    </div>
                    <div id='write-review-component' className='col-12'>
                        <div id='write-review-text-div' className='row'>
                            <textarea
                                className='form-control col-8'
                                placeholder='Review'
                                value={this.state.reviewText}
                                onChange={(e) => {
                                    const newText = e.target.value;
                                    this.setState({
                                        reviewText: newText
                                    })
                                }}></textarea>
                            <label htmlFor='score' className='col-2'><b>Score:</b></label>
                            <select id='score' className='col-2 form-control'
                                value={this.state.reviewScore}
                                onChange={(e) => this.setState({reviewScore: e.target.value})}>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                                <option value='6'>6</option>
                                <option value='7'>7</option>
                                <option value='8'>8</option>
                                <option value='9'>9</option>
                                <option value='10'>10</option>
                            </select>
                        </div>
                        <br/>
                    </div>
                    <button id='submit-review-button' className='btn form-control'
                        onClick={() => this.postReview()}>
                        Submit
                    </button>
                </div>
            </div>
        }
        {
            !this.props.loggedIn &&
            <center>
                <p>
                    Please log in to post a review.
                </p>
            </center>
        }
        </div>
        )
    }
}

export default WriteReviewComponent
