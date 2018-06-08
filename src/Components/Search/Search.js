import React, { Component } from 'react';
import classes from './Search.scss';
import closeBtn from '../../Assets/delete-button.png';
import {bindActionCreators} from 'redux';
import * as Actions from '../../Actions';
import { connect } from 'react-redux';


class SearchBar extends Component {

    
    onChange(term) {
        this.props.onTermChange(term);
    }
    

    formSubmitHandler = (e) => {
         e.preventDefault()
         this.props.actions.closeSearch()
    }

    render() {
    
        return (
        <div className={classes.overlay} style={this.props.isSearching ? {display:''} : {display:'none'} }>
            <div className={classes.centered}>
                <div className={classes.searchBox}>
                    <img 
                        className={classes.closeBtn} 
                        src={closeBtn} alt="closeButton"
                        onClick={this.props.actions.closeSearch}
                        ></img>
                    <form  id='search-form' onSubmit={this.formSubmitHandler}>
                        <input id='search-text' 
                            name='q' placeholder='Search' 
                            onChange={event => this.onChange(event.target.value)} 
                            type='text' />
                    </form>
                </div>
            </div>
        </div>
        )
    }
}


let mapStateToProps = (state) => {
    return {
        isSearching: state.modal.isSearchOpen, 
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        actions : bindActionCreators(Actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
