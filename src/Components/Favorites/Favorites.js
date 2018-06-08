import React, { Component } from 'react';
import { connect } from 'react-redux';
import Result from '../Results/Result/Result'
import classes from '../Results/Results.scss'
import { bindActionCreators } from 'redux';
import * as Actions from '../../Actions';
import DetailsModal from '../DetailsModal/DetailsModel';
import Aux from '../../Hoc/Aux';
import Typography from '@material-ui/core/Typography';
import nowShowing from '../../Assets/now-showing.png'; 
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';




class Favorites extends Component {

    state = {
        'orderBy' : ''
    }


    imageClickHandler = (gif) => {
        this.props.actions.openModal(gif)
    }

    componentDidMount() {
        this.props.actions.fetchFavoriteGif();
    }

    reorder = (event) => {
        console.log(event.target.value)
        this.props.actions.reorder(this.props.favorites, event.target.value);
        this.setState({orderBy: event.target.value})
        this.forceUpdate();
    }

    render() {
        let favorites = this.props.favorites.map((gif) => {

            return <Result
                key={gif.id}
                id={gif.id}
                imgUrl={gif.img}
                rating={gif.rating}
                onClickHandler={this.imageClickHandler}
            />

        })

        return (
            <Aux>

                <div className={classes.modalAppStyle}>
                    <DetailsModal
                        isModalOpen={this.props.isModalOpen}
                        closeModal={this.props.actions.closeModal}
                        imgIsFavorite={true}
                    >
                        <img width="100%" style={{ borderRadius: 3 }} src={this.props.currentlyViewingGif.imgUrl} alt="activeGif" />
                    </DetailsModal>
                </div>
                <div className={classes.header}>
                    <img src={nowShowing} className={classes.nowShowing} alt='nowshowing'></img>
                    <Typography variant="display3" gutterBottom className={classes.headerText}>
                        My Favorites
                    </Typography>

                    <div className={classes.orderBy}>
    
                        <form  autoComplete="off">
                                <FormControl className={classes.orderDropdown}>
                                <InputLabel htmlFor="order">Order By</InputLabel>
                                <Select
                                    value={this.state.orderBy}
                                    onChange={this.reorder}
                                    inputProps={{
                                    name: 'orderBy',
                                    id: 'age-simple',
                                    }}
                                >
                                    <MenuItem value={'ASC'}>Ascending Rating</MenuItem>
                                    <MenuItem value={'DESC'}>Descending Rating</MenuItem>
                                </Select>
                                </FormControl>
                        </form>
                        <br/><br/>
                    </div>
                </div>
                <div className={classes.masonry} id="masonry">
                    {favorites}
                </div>
            </Aux>
        );
    }
}


let mapStateToProps = (state) => {

    return {
        favorites: state.gif.favorites,
        isModalOpen: state.modal.isModalOpen,
        authenticated: state.auth.authenticated, 
        currentlyViewingGif : state.modal.currentlyViewingGif,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);