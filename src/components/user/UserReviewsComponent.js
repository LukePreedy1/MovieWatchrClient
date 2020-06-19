import React from 'react';
import { findAllReviewsByUser } from '../../services/ReviewService';
import UserReviewTableRow from './UserReviewTableRow';
import '../../style/UserReviewsComponentStyle.css';

class UserReviewsComponent extends React.Component {
    state = {
        reviews: []
    }

    componentDidMount = async () => {
        const reviews = await findAllReviewsByUser(this.props.username)
        this.setState({reviews: reviews});
    }

    render() {
        return (
        <div id='user-reviews-component'>
            <h2>Reviews:</h2>
            <table id='user-reviews-component-table' className='table'>
                <thead id='user-reviews-component-table-header'>
                    <tr id='user-reviews-component-table-header-row'>
                        <th></th>
                        <th>Title</th>
                        <th>Date Written</th>
                        <th>Text</th>
                        <th>Likes</th>
                    </tr>
                </thead>
                <tbody id='user-reviews-component-table-body'>
                {
                    this.state.reviews.map(review =>
                        <UserReviewTableRow
                            review={review}
                            key={review.id}/>
                    )
                }
                </tbody>
            </table>
        </div>
        )
    }
}

export default UserReviewsComponent