import React from 'react';
import { findReviewById } from '../../services/ReviewService';
import { Link } from 'react-router-dom';
import '../../style/ReviewLikesComponentStyle.css';

class ReviewLikesComponent extends React.Component {
    state = {
        review: {},
        ready: false
    }

    componentDidMount = async () => {
        const review = await findReviewById(this.props.reviewId);
        this.setState({review: review, ready: true})
    }

    render() {
        return(
        <div id='review-likes-component'>
        <h3>Liked By:</h3>
        {
            this.state.ready &&
            <ul className='list-group'>
            {
                this.state.review.likedBy.map((user) =>
                    <li className='review-likes-component-list-item list-group-item' key={user.username}>
                        <Link to={"/profile/" + user.username}>
                            {user.username}
                        </Link>
                    </li>
                )
            }
            </ul>
        }
        </div>
        )
    }
}

export default ReviewLikesComponent