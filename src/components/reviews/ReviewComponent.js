import React from 'react';
import { findReviewById, updateReview } from '../../services/ReviewService';
import { getFullMovieFromID } from '../../services/OMDBService';
import { likeReview, unLikeReview, getAuthor, deleteReview } from '../../services/ReviewService';
import { Link } from 'react-router-dom';
import ReviewLikesComponent from './ReviewLikesComponent';
import '../../style/ReviewComponentStyle.css'

class ReviewComponent extends React.Component {
    state = {
        review: {},
        media: {},
        author: '',
        ready: false,
        liked: false,
        numberOfLikes: 0,
        displayLikes: false,
        editing: false,
        newReviewScore: '',
        newReviewText: ''
    }

    componentDidMount = async () => {
        const review = await findReviewById(this.props.reviewId);
        const media = await getFullMovieFromID(review.reviewing.imdb);
        const reviewAuthor = await getAuthor(this.props.reviewId);
        const liked = review.likedBy.filter((user) => user.username === this.props.user.username).length >= 1
        this.setState({
            review: review,
            media: media,
            author: reviewAuthor.username,
            ready: true,
            liked: liked,
            numberOfLikes: review.likedBy.length,
            newReviewScore: review.score,
            newReviewText: review.text
        })
    }

    // Will only run this after saving the updates to the review.
    componentDidUpdate = async (prevProps, prevState, snapshot) => {
        if (!this.state.editing && prevState.editing) {
            const review = await findReviewById(this.props.reviewId);
            const media = await getFullMovieFromID(review.reviewing.imdb);
            const reviewAuthor = await getAuthor(this.props.reviewId);
            const liked = review.likedBy.filter((user) => user.username === this.props.user.username).length >= 1
            this.setState({
                review: review,
                media: media,
                author: reviewAuthor.username,
                ready: true,
                liked: liked,
                numberOfLikes: review.likedBy.length,
                newReviewScore: review.score,
                newReviewText: review.text
            })
        }
    }

    formatDate = (dateString) =>
        dateString.substring(5, 7) + '-' + dateString.substring(8, 10) + '-' + dateString.substring(0, 4);

    render() {
        return(
        <div id='review-component'>
        {
            this.state.ready &&
            <div className='row'>
                <div className='poster-column col-3'>
                    <img className='col-12' src={this.state.media.Poster} alt={this.state.media.Poster} />
                </div>
                <div className='title-text-column col-6'>
                    <h1>
                        <Link to={"/details/" + this.state.review.reviewing.imdb}>
                            {this.state.media.Title}
                        </Link>
                    </h1>
                    <h3>
                        Written By:
                        <Link to={"/profile/" + this.state.author}>
                            {this.state.author}
                        </Link>
                    </h3>
                    <h4>
                        Date Written: {this.formatDate(this.state.review.dateWritten)}
                    </h4>
                    <br/>
                    <div className='row' id='text-and-score'>
                    {
                        !this.state.editing &&
                        <div id='review-text' className='col-10'>{this.state.review.text}</div>
                    }
                    {
                        this.state.editing &&
                        <textarea
                            className='form-control input-lg col-10'
                            value={this.state.newReviewText}
                            onChange={(e) => this.setState({newReviewText: e.target.value})}></textarea>
                    }
                    {
                        !this.state.editing &&
                        <p className='col-2'>{this.state.review.score}/10</p>
                    }
                    {
                        this.state.editing &&
                        <select id='score' className='col-2 form-control'
                            value={this.state.newReviewScore}
                            onChange={(e) => this.setState({newReviewScore: e.target.value})}>
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
                    }
                    </div>
                    {
                        this.state.review.edited &&
                        <i id='review-has-been-edited'>This review has been edited.</i>
                    }
                </div>
                <div className='likes-and-buttons col-3'>
                    <h3>Likes: {this.state.numberOfLikes}</h3>
                {
                    !this.state.liked && this.props.loggedIn && this.props.user.username !== this.state.author &&
                    <button id='like-review-button' className='btn col-12'
                        onClick={() => {
                            likeReview(this.props.user.username, this.props.reviewId);
                            this.setState({liked: true, numberOfLikes: this.state.numberOfLikes+1});
                        }}>
                        Like
                    </button>
                }
                {
                    this.state.liked && this.props.loggedIn && this.props.user.username !== this.state.author &&
                    <button id='unlike-review-button' className='btn col-12'
                        onClick={() => {
                            unLikeReview(this.props.user.username, this.props.reviewId);
                            this.setState({liked: false, numberOfLikes: this.state.numberOfLikes-1});
                        }}>
                        Unlike
                    </button>
                }
                <br/>
                {
                    this.state.displayLikes &&
                    <button id='hide-likes-button' className='btn col-12'
                        onClick={() => this.setState({displayLikes: false})}>
                        Hide Likes
                    </button>
                }
                {
                    !this.state.displayLikes &&
                    <button id='display-likes-button' className='btn col-12'
                        onClick={() => this.setState({displayLikes: true})}>
                        Display Likes
                    </button>
                }
                <br/>
                {
                    ((this.props.loggedIn && this.props.user.username === this.state.author && !this.state.editing) ||
                    (this.props.loggedIn && this.props.user.admin && !this.state.editing)) &&
                    <button id='edit-review-button' className='btn col-12'
                        onClick={() => this.setState({editing: true})}>
                        Edit Review
                    </button>
                }
                {
                    ((this.props.loggedIn && this.props.user.username === this.state.author && this.state.editing) ||
                    (this.props.loggedIn && this.props.user.admin && this.state.editing)) &&
                    <button id='save-review-button' className='btn col-12'
                        onClick={async () => {
                            if (this.state.newReviewText.length === 0) {
                                alert("The review cannot be blank.");
                                return;
                            }else if (this.state.newReviewText.length > 2048) {
                                alert("Review text max length is 2048 characters.");
                                return;
                            }
                            await updateReview(this.state.author,
                                               this.state.review.reviewing.imdb,
                                               {
                                                   id: this.state.review.id,
                                                   score: this.state.newReviewScore,
                                                   text: this.state.newReviewText,
                                                   dateWritten: new Date().getTime()
                                               });

                            this.setState({editing: false});
                        }}>
                        Save Review
                    </button>
                }
                {
                    this.props.loggedIn && this.props.user.username === this.state.author && this.state.editing &&
                    <button id='delete-review-button' className='btn col-12'
                        onClick={async () => {
                            await deleteReview(this.state.review.id);
                            this.props.history.push('/details/' + this.state.review.reviewing.imdb)
                        }} >
                        Delete Review
                    </button>

                }
                </div>
            </div>
        }
        {
            this.state.displayLikes &&
            <ReviewLikesComponent
                reviewId={this.props.reviewId} />
        }
        </div>
        )
    }
}

export default ReviewComponent