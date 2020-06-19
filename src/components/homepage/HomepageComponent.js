import React from 'react';
import { Link } from 'react-router-dom';
import { findMostPopularReviews, findMostPopularReviewsByFollowed } from '../../services/ReviewService';
import { findMostPopularMedia, findMostPopularMediaByFollowed } from '../../services/MediaService';
import { findMostPopularUsers, findFollows } from '../../services/UserService';
import HomepageComponentReviewRow from './HomepageComponentReviewRow';
import UserMediaTableRow from '../user/UserMediaTableRow';
import UserReviewTableRow from '../user/UserReviewTableRow';

import '../../style/HomepageComponentStyle.css';

class HomepageComponent extends React.Component {
    state = {
        mostPopularMedia: [],
        mostPopularReviews: [],
        mostPopularMediaByFollowed: [],
        mostPopularReviewsByFollowed: [],
        mostPopularUsers: [],
        followedUsers: [],
        ready: false
    }

    componentDidMount = async () => {
        var mostPopularMedia = await findMostPopularMedia();
        const mostPopularReviews = await findMostPopularReviews();
        const mostPopularUsers = await findMostPopularUsers();

        var mostPopularMediaByFollowed = [];
        var mostPopularReviewsByFollowed = [];
        var followedUsers = [];
        if(this.props.loggedIn) {
            mostPopularMediaByFollowed = await findMostPopularMediaByFollowed(this.props.user.username);
            mostPopularReviewsByFollowed = await findMostPopularReviewsByFollowed(this.props.user.username);
            followedUsers = await findFollows(this.props.user.username);
        }
        this.setState({
            mostPopularMedia: mostPopularMedia,
            mostPopularReviews: mostPopularReviews,
            mostPopularUsers: mostPopularUsers,
            mostPopularMediaByFollowed: mostPopularMediaByFollowed,
            mostPopularReviewsByFollowed: mostPopularReviewsByFollowed,
            followedUsers: followedUsers,
            ready: true
        })
    }

    componentDidUpdate = async (prevProps, prevState, snapshot) => {
        if (this.props.user.username !== prevProps.user.username || this.props.loggedIn !== prevProps.loggedIn) {
            var mostPopularMedia = await findMostPopularMedia();
            const mostPopularReviews = await findMostPopularReviews();
            const mostPopularUsers = await findMostPopularUsers();

            var mostPopularMediaByFollowed = [];
            var mostPopularReviewsByFollowed = [];
            var followedUsers = [];
            if(this.props.loggedIn) {
                mostPopularMediaByFollowed = await findMostPopularMediaByFollowed(this.props.user.username);
                mostPopularReviewsByFollowed = await findMostPopularReviewsByFollowed(this.props.user.username);
                followedUsers = await findFollows(this.props.user.username);
            }
            this.setState({
                mostPopularMedia: mostPopularMedia,
                mostPopularReviews: mostPopularReviews,
                mostPopularUsers: mostPopularUsers,
                mostPopularMediaByFollowed: mostPopularMediaByFollowed,
                mostPopularReviewsByFollowed: mostPopularReviewsByFollowed,
                followedUsers: followedUsers,
                ready: true
            })
        }
    }

    render() {
        if (this.state.ready) return(
        <div id='homepage-component'>
        {
            !this.props.loggedIn &&
            <h1>Please log in or create an account for access to the most interesting features!</h1>
        }
        <br/>
        {
            this.props.loggedIn && this.state.followedUsers.length === 0 &&
            <div id='most-popular-users'>
                <p>It looks like you aren't following anyone.  Here are some popular users:</p>
                <ul className='list-group'>
                {
                    this.state.mostPopularUsers.map((user) => {
                        if (user.username !== this.props.user.username)
                            return(
                            <li key={user.username} className='list-group-item'>
                                <Link className='float-left' to={"/profile/" + user.username}>
                                    {user.username}
                                </Link>
                            </li>)
                    })
                }
                </ul>
            </div>
        }
        {
            this.props.loggedIn && this.state.followedUsers.length !== 0 &&
            <div id='most-popular-logged-in'>
            {
                this.state.mostPopularMediaByFollowed.length !== 0 &&
                <div id='homepage-component-most-popular-media-by-followed'>
                    <h2>Here are the most popular media by users that you follow:</h2>
                    <table className='table'>
                        <thead id='homepage-component-most-popular-media-by-followed-table-header'>
                            <tr id='homepage-component-most-popular-media-by-followed-table-header-row'>
                                <th></th>
                                <th>Media Title</th>
                                <th>Year(s)</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.mostPopularMediaByFollowed.map(media =>
                                <UserMediaTableRow
                                    imdbID={media.imdb}
                                    key={media.imdb} />
                            )
                        }
                        </tbody>
                    </table>
                </div>
            }
            {
                this.state.mostPopularMediaByFollowed.length === 0 &&
                <div id='homepage-component-most-popular-media'>
                    <h2>Here are some of the most popular media on this site:</h2>
                    <table className='table'>
                        <thead id='homepage-component-most-popular-media-table-header'>
                            <tr id='homepage-component-most-popular-media-table-header-row'>
                                <th></th>
                                <th>Media Title</th>
                                <th>Year(s)</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.mostPopularMedia.map(media =>
                                <UserMediaTableRow
                                    imdbID={media.imdb}
                                    key={media.imdb} />
                            )
                        }
                        </tbody>
                    </table>
                </div>
            }
            {
                this.state.mostPopularReviewsByFollowed.length !== 0 &&
                <div id='homepage-component-most-popular-reviews-by-followed'>
                    <h2>Here are some of the most popular reviews by users you follow:</h2>
                    <table className='table'>
                        <thead id='homepage-component-most-popular-reviews-by-followed-table-header'>
                            <tr id='homepage-component-most-popular-reviews-by-followed-table-header-row'>
                                <th></th>
                                <th>Media Title</th>
                                <th>Author</th>
                                <th>Text</th>
                                <th>Likes</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.mostPopularReviewsByFollowed.map(review =>
                                <HomepageComponentReviewRow
                                    review={review}
                                    key={review.id} />
                            )
                        }
                        </tbody>
                    </table>
                </div>
            }
            {
                this.state.mostPopularReviewsByFollowed.length === 0 &&
                <div id='homepage-component-most-popular-reviews'>
                    <h2>Here are some of the most popular reviews on this site:</h2>
                    <table className='table'>
                        <thead id='homepage-component-most-popular-reviews-table-header'>
                            <tr id='homepage-component-most-popular-reviews-table-header-row'>
                                <th></th>
                                <th>Media Title</th>
                                <th>Author</th>
                                <th>Text</th>
                                <th>Likes</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.mostPopularReviews.map(review =>
                                <HomepageComponentReviewRow
                                    review={review}
                                    key={review.id} />
                            )
                        }
                        </tbody>
                    </table>
                </div>
            }
            </div>
        }
        {
            ((!this.props.loggedIn) || (this.props.loggedIn && this.state.followedUsers.length === 0)) &&
            <div id='most-popular-not-logged-in'>
                <div id='homepage-component-most-popular-media'>
                    <h2>Here are some of the most popular media on this site:</h2>
                    <table className='table'>
                        <thead id='homepage-component-most-popular-media-table-header'>
                            <tr id='homepage-component-most-popular-media-table-header-row'>
                                <th></th>
                                <th>Media Title</th>
                                <th>Year(s)</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.mostPopularMedia.map(media =>
                                <UserMediaTableRow
                                    imdbID={media.imdb}
                                    key={media.id} />
                            )
                        }
                        </tbody>
                    </table>
                </div>
                <div id='homepage-component-most-popular-reviews'>
                    <h2>Here are some of the most popular reviews on this site:</h2>
                    <table className='table'>
                        <thead id='homepage-component-most-popular-reviews-table-header'>
                            <tr id='homepage-component-most-popular-reviews-table-header-row'>
                                <th></th>
                                <th>Media Title</th>
                                <th>Date Written</th>
                                <th>Text</th>
                                <th>Likes</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.mostPopularReviews.map(review =>
                                <HomepageComponentReviewRow
                                    review={review}
                                    key={review.id} />
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        }
        </div>
        )
        else return(<div>Loading, please wait.</div>)
    }
}

export default HomepageComponent