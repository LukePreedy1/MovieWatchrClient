import React from 'react';
import { findMediaByImdbID } from '../../services/MediaService';
import { findAllReviewsOfMediaByFollowing, findAllReviewsOfMedia, findAllReviewsOfMediaByUser } from '../../services/ReviewService';
import ReviewListRow from './ReviewListRow';

class MediaReviewList extends React.Component {
    state = {
        reviews: [],
        media: {},
        reviewsByLoggedInUser: [],
        reviewsByFollowed: []
    }

    componentDidMount = async () => {
        const media = await findMediaByImdbID(this.props.imdbID);
        const reviews = await findAllReviewsOfMedia(this.props.imdbID);
        var reviewsByLoggedInUser = [];
        var reviewsByFollowed = [];
        if (this.props.loggedIn) {
            reviewsByLoggedInUser = await findAllReviewsOfMediaByUser(this.props.user.username, this.props.imdbID);
            reviewsByFollowed = await findAllReviewsOfMediaByFollowing(this.props.imdbID, this.props.user.username)
        }

        this.setState({
            reviews: reviews,
            media: media,
            reviewsByLoggedInUser: reviewsByLoggedInUser,
            reviewsByFollowed: reviewsByFollowed
        })
    }

    componentDidUpdate = async (prevProps, prevState, snapshot) => {
        if (this.props.user.username !== prevProps.user.username) {
            const media = await findMediaByImdbID(this.props.imdbID);
            const reviews = await findAllReviewsOfMedia(this.props.imdbID);
            var reviewsByLoggedInUser = [];
            var reviewsByFollowed = [];
            if (this.props.loggedIn) {
                reviewsByLoggedInUser = await findAllReviewsOfMediaByUser(this.props.user.username, this.props.imdbID);
                reviewsByFollowed = await findAllReviewsOfMediaByFollowing(this.props.imdbID, this.props.user.username)
            }

            this.setState({
                reviews: reviews,
                media: media,
                reviewsByLoggedInUser: reviewsByLoggedInUser,
                reviewsByFollowed: reviewsByFollowed
            })
        }
    }

    render() {
        return (
        <div id='media-review-list'>
        {
            this.state.reviewsByLoggedInUser.length > 0 &&
            <div className='reviews-by-logged-in-user'>
                <h4>Your reviews:</h4>
                <ul className='list-group'>
                {
                    this.state.reviewsByLoggedInUser.map((review) =>
                        <ReviewListRow
                            review={review}
                            key={review.id}
                            user={this.props.user}
                            loggedIn={this.props.loggedIn}/>
                    )
                }
                </ul>
                <br/>
            </div>
        }
        {
            this.state.reviewsByFollowed.length > 0 &&
            <div className='reviews-by-followed-users'>
                <h4>Reviews By Users You Follow:</h4>
                <ul className='list-group'>
                {
                    this.state.reviewsByFollowed.map((review) =>
                        <ReviewListRow
                            review={review}
                            key={review.id}
                            loggedIn={this.props.loggedIn}
                            user={this.props.user}/>
                    )
                }
                </ul>
            </div>
        }
            <br/>
        {
            this.state.reviews.length > 0 &&
            <div>
                <h4>All reviews:</h4>
                <ul className='list-group'>
                {
                    this.state.reviews.map((review) =>
                        <ReviewListRow
                            review={review}
                            key={review.id}
                            loggedIn={this.props.loggedIn}
                            user={this.props.user}/>
                    )
                }
                </ul>
            </div>
        }

        </div>
        )
    }
}

export default MediaReviewList
