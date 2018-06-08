import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../Actions';
import classes from './DetailsModal.scss';
import likeBtn from '../../Assets/like.png';
import likeRedBtn from '../../Assets/like_red.png';
import StarRatingComponent from 'react-star-rating-component';
import { Link } from 'react-router-dom';



class DetailsModal extends Component {

    likeGif = (gif) => {
        this.props.actions.likeGif(this.props.selectedGif)
        this.props.actions.closeModal()
    }
    unlikeGif = (gif) => {
        this.props.actions.unlikeGif(this.props.selectedGif)
        this.props.actions.closeModal()
    }


    determineLikedPhoto = () => {
        
        if (this.props.authenticated) {
            if (this.props.imgIsFavorite) {
                return <img alt="like"
                    src={likeRedBtn}
                    onClick={this.unlikeGif}
                    onMouseEnter={e => (e.currentTarget.src = likeBtn)}
                    onMouseLeave={e => (e.currentTarget.src = likeRedBtn)}
                />
            } else {
                return <img alt="like"
                    src={likeBtn}
                    onClick={this.likeGif}
                    onMouseEnter={e => (e.currentTarget.src = likeRedBtn)}
                    onMouseLeave={e => (e.currentTarget.src = likeBtn)}
                />
            }
        } else {
            return <Link to="/favorites">
                 <img alt="like"
                    src={likeBtn}
                    onMouseEnter={e => (e.currentTarget.src = likeRedBtn)}
                    onMouseLeave={e => (e.currentTarget.src = likeBtn)}
                /></Link>
        }
    }

    renderStarComponent = () => {
        if (this.props.authenticated) {
            return <StarRatingComponent 
            name="gifRating" 
            value={this.props.selectedGif.rating}
            starCount={5}
            onStarClick={this.onStarClick.bind(this)}
            />
        }
    }

    onStarClick(nextValue, prevValue, name) {
        console.log(nextValue, prevValue, name)
        this.props.actions.updateRating(this.props.selectedGif, nextValue)
        this.props.actions.closeModal()
    }

    render() {
        
        return (
            <div className={classes.outerStyle} style={{ display: this.props.isModalOpen ? 'block' : 'none' }}>
                <div className={classes.overlay} onClick={this.props.closeModal}></div>
                <div onClick={this.props.closeModal}></div>
                <div className={classes.modal} >
                    {this.props.children}

                    <div className={classes.modalActions}>
                        <div className={classes.starRating}>
                            {this.renderStarComponent()}
                        <div className={classes.likeBtn + ' ' + classes.pulse}>
                            {this.determineLikedPhoto()}
                        </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        selectedGif: state.modal.currentlyViewingGif,
        favorites: state.gif.favorites,
        authenticated: state.auth.authenticated
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsModal);
