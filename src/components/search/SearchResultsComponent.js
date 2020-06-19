import React from 'react'
import { searchForTitle } from '../../services/OMDBService'
import SearchResultRow from './SearchResultRow'
import '../../style/SearchResultsComponentStyle.css';

class SearchResultsComponent extends React.Component {
    state = {
        movies: []
    }

    componentDidMount = async () => {
        const movies = await searchForTitle(this.props.title)
        this.setState({
            movies: movies.Search
        })
    }

    componentDidUpdate = async (prevProps, prevState, snapshot) => {
        if (this.props.title !== prevProps.title) {
            const movies = await searchForTitle(this.props.title)
            this.setState({
                movies: movies.Search
            })
        }
    }

    render() {
        return (
        <div id='search-results-component'>
        {
            this.state.movies &&
            <table className='table'>
                <thead>
                    <tr id='search-results-table'>
                        <th></th>
                        <th>Title</th>
                        <th>Year(s)</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                {
                    this.state.movies.map(function(movie) {
                        return (
                            <SearchResultRow
                                key={movie.imdbID}
                                imdbID={movie.imdbID}/>
                        )
                    })
                }
                </tbody>
            </table>
        }
        {
            !this.state.movies > 0 &&
            <p>No results found for "{this.props.title}"</p>
        }
        </div>
        )
    }
}

export default SearchResultsComponent
