import React from 'react';
import { getFullMovieFromID } from '../../services/OMDBService';
import { getAuthor } from '../../services/ReviewService';
import { Link } from 'react-router-dom';

class HomepageComponentReviewRow extends React.Component {
    state = {
        media: {},
        author: {}
    }

    componentDidMount = async () => {
        const media = await getFullMovieFromID(this.props.review.reviewing.imdb)
        const author = await getAuthor(this.props.review.id)
        this.setState({media: media, author: author})
    }

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
            <td>
                <Link to={"/profile/" + this.state.author.username}>
                    {this.state.author.username}
                </Link>
            </td>
            <td className='user-review-table-row-text'>{this.props.review.text}</td>
            <td>
                {this.props.review.likedBy.length}
            </td>
        </tr>
        )
    }
}

export default HomepageComponentReviewRow