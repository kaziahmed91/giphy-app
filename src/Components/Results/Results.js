import React, { Component } from 'react';
import Result from './Result/Result';
import * as Actions from '../../Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classes from './Results.scss';
import DetailsModal from '../DetailsModal/DetailsModel';
import Aux from '../../Hoc/Aux';


class Results extends Component {
    
    componentDidMount() {
		const options = {
			root: null, // Page as root
			rootMargin: "0px",
			threshold: 1.0
		};

		this.observer = new IntersectionObserver(
			this.handleObserver.bind(this), //callback
			options
		);

		this.observer.observe(this.loadingRef);

    }

	handleObserver(entities, observer) {
		const y = entities[0].boundingClientRect.y;
		if (this.props.prevY > y) {
			console.log('fetching more')
			this.props.actions.fetchGif(this.props.term, this.props.offset);
		}
		this.props.actions.updatePrevY(y);
	}

    render() {
        const loadingCSS = {
            height: "100px",
            border: '1px solid',
			margin: "30px"
		};
        // console.log('in results class', this.props);
        const results = this.props.posts.map( (result) => {
          return <Result 
                key={result.id} 
                id={result.id}
                imgUrl={result.images.downsized.url}
                onClickHandler = {this.props.actions.openModal}
            />
        }) 
        
        return (
        <Aux>
            <div className={classes.modalAppStyle}>
                <DetailsModal                    
                    isModalOpen={this.props.isModalOpen}
                    closeModal={this.props.actions.closeModal}
                >
                    <img width="100%" style={{ borderRadius: 3 }} src={this.props.currentlyViewingGif} alt="activeGif" />
                    
                    {/* <button onClick={this.closeModal}>Close</button> */}
                </DetailsModal>
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
    console.log('map state', state)
	return {
		gif: state.gif.data,
		prevY: state.gif.prevY,
		page: state.gif.page, 
        term: state.gif.term, 
        isFetching: state.gif.isFetching,
        offset: state.gif.offset, 
        isModalOpen: state.modal.isModalOpen,
        currentlyViewingGif : state.modal.currentlyViewingGif
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(Actions, dispatch)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Results);