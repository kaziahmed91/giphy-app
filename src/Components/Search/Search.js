import React, { Component } from 'react';
import classes from './Search.scss';
// import {debounce} from 'lodash';


class SearchBar extends Component {
    constructor() {
        super();

        this.state = {
            gifs: []
        };

    }
    
    onChange(term) {
        this.props.onTermChange(term);
    }

    render() {
        
        return (
            <div className={classes.searchBar}>
                <input onChange={event => this.onChange(event.target.value)} ></input>
            </div>
        )
    }
}


export default SearchBar; 