import React from 'react';
import { Link } from 'react-router-dom';
import { getAuthor, likeReview, unLikeReview } from '../../services/ReviewService';
import '../../style/ReviewListRowStyle.css';

class ReviewListRow extends React.Component {
    state = {
        author: {},
        numberOfLikes: 0,
        likedByUser: false
    }

    componentDidMount = async () => {
        const reviewAuthor = await getAuthor(this.props.review.id);
        const liked = this.props.review.likedBy.filter((user) => user.username === this.props.user.username).length >= 1
        this.setState({
            author: reviewAuthor,
            numberOfLikes: this.props.review.likedBy.length,
            likedByUser: liked
        })
    }

    formatDate = (dateString) =>
        dateString.substring(5, 7) + '-' + dateString.substring(8, 10) + '-' + dateString.substring(0, 4);

    render() {
        return (
        <li className='list-group-item review-list-row'>
            <div className='row review-list-row-header'>
                <p className='col-4'>Written By:</p>
                <Link className='col-8' to={'/reviews/' + this.props.review.id}>
                    {this.state.author.username}
                </Link>
            </div>
            <div className='row review-list-row-date'>
                <p className='col-4'>Date Written:</p>
                <p className='col-8'>{this.formatDate(this.props.review.dateWritten)}</p>
            </div>
            <div className='row review-list-row-body'>
                <p className='col-10 review-list-row-text'>{this.props.review.text}</p>
                <p className='col-2 review-list-row-score'>{this.props.review.score}/10</p>
            </div>
            <div className='row review-list-row-likes'>
                <p className='col-9'>Likes: {this.state.numberOfLikes}</p>
                {
                    this.props.loggedIn && !this.state.likedByUser && this.state.author.username !== this.props.user.username &&
                    <button className='like-review-button btn col-3'
                        onClick={async () => {
                            await likeReview(this.props.user.username, this.props.review.id)
                            this.setState({likedByUser: true, numberOfLikes: this.state.numberOfLikes+1})
                        }}>
                        Like
                    </button>
                }
                {
                    this.props.loggedIn && this.state.likedByUser && this.state.author.username !== this.props.user.username &&
                    <button className='unlike-review-button btn col-3'
                        onClick={async () => {
                            await unLikeReview(this.props.user.username, this.props.review.id);
                            this.setState({likedByUser: false, numberOfLikes: this.state.numberOfLikes-1})
                        }}>
                        Remove Like
                    </button>
                }
            </div>
        </li>
        )
    }
}

export default ReviewListRow
