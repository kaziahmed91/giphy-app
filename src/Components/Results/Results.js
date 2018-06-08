import React, { Component } from 'react';
import Result from './Result/Result';
import * as Actions from '../../Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classes from './Results.scss';
import DetailsModal from '../DetailsModal/DetailsModel';
import Aux from '../../Hoc/Aux';
import Typography from '@material-ui/core/Typography';
import nowShowing from '../../Assets/now-showing.png'


class Results extends Component {
    
    componentDidMount() {
		const options = {
			root: null, // Page as root
			rootMargin: "0px",
			threshold: 1.0
		};

        if(!this.props.gif.length) {
            this.props.actions.fetchRandomGif();
        }

		this.observer = new IntersectionObserver(
			this.handleObserver.bind(this), //callback
			options
		);

        this.observer.observe(this.loadingRef);

        //         // if (this.props.authenticated) {
        //     this.props.actions.verifyAuth();
        //     this.props.actions.fetchFavoriteGif();
        //     console.log(this.props.favorites)
        // // } else {
        // //     console.log('not authn')
        // // }
    }



    
	handleObserver(entities, observer) {
		const y = entities[0].boundingClientRect.y;
		if (this.props.prevY > y) {
			this.props.actions.fetchGif(this.props.term, this.props.offset);
		}
		this.props.actions.updatePrevY(y);
	}

    render() {
        const loadingCSS = {
            height: "100px",
			margin: "30px"
		};
        
        const results = this.props.posts.map( (result) => {
          return <Result 
                key={result.id} 
                id={result.id}
                imgUrl={result.images.downsized.url}
                onClickHandler = {this.props.actions.openModal}
                
            />
        })


        // console.log(this.props.favorites)
        return (
            
            
        <Aux>
            <div className={classes.modalAppStyle}>
                <DetailsModal                    
                    isModalOpen={this.props.isModalOpen}
                    closeModal={this.props.actions.closeModal}
                >
                    <img width="100%" style={{ borderRadius: 3 }} src={this.props.currentlyViewingGif.imgUrl} alt="activeGif" />
                    
                </DetailsModal>
            </div>
            <div className={classes.header}>
                <img src={nowShowing} className={classes.nowShowing} alt='nowshowing'></img>
                <Typography variant="display3" gutterBottom className={classes.headerText}>
                    {this.props.term ? this.props.term : "Currently Trending..."}
                </Typography>
            </div>
            <div className={classes.masonry} id="masonry">
                {results}
            </div>
            <div
                ref={loadingRef => (this.loadingRef = loadingRef)}
                id="searchMore"
                style={loadingCSS}
			></div>
        </Aux>
        );
    }

}

function mapStateToProps(state) {
    // console.log(state)
	return {
		gif: state.gif.data,
		prevY: state.gif.prevY,
		page: state.gif.page, 
        term: state.gif.term, 
        isFetching: state.gif.isFetching,
        offset: state.gif.offset, 
        isModalOpen: state.modal.isModalOpen,
        currentlyViewingGif : state.modal.currentlyViewingGif,
        favorites: state.gif.favorites, 
        authenticated :  state.auth.authenticated
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(Actions, dispatch)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Results);