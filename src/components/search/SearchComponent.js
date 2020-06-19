import React from 'react';
import {Link} from 'react-router-dom';
import '../../style/SearchComponentStyle.css';

const SearchComponent = ({search, updateForm, searchField}) => {
    return (
    <div id='search-component'>
        <center id='search-component'>
            <input id='search-component-search-field' className='col-6'
                onChange={(e) => updateForm({
                    searchField: e.target.value
                })}
                value={searchField}/>
            <Link to={"/search/" + searchField} className='col-1'>
                <button id='search-component-search-button' className='btn'
                    onClick={() => search()}>
                    Search
                </button>
            </Link>
        </center>
    </div>
    )
}

export default SearchComponent