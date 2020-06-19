import React from 'react';
import { getFullMovieFromID } from '../../services/OMDBService';
import { Link } from 'react-router-dom';
import '../../style/UserReviewTableRowStyle.css';

class UserReviewTableRow extends React.Component {
    state = {
        media: {}
    }

    componentDidMount = async () => {
        const media = await getFullMovieFromID(this.props.review.reviewing.imdb)
        this.setState({media: media})
    }

    formatDate = (dateString) =>
        dateString.substring(5, 7) + '-' + dateString.substring(8, 10) + '-' + dateString.substring(0, 4);

    render() {
        return(
        <tr>
            <td>
                <img src={this.state.media.Poster} alt={this.state.media.Poster} />
            </td>
            <td>
                <Link to={"/reviews/" + this.props.review.id}>
                    {this.state.media.Title}
                </Link>
            </td>
            <td>{this.formatDate(this.props.review.dateWritten)}</td>
            <td className='user-review-table-row-text'>{this.props.review.text}</td>
            <td>
                {this.props.review.likedBy.length}
            </td>
        </tr>
        )
    }
}

export default UserReviewTableRow