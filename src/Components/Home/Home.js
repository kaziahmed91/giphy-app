import React, { Component } from 'react';
import SearchBar from '../Search/Search';
import Results from '../Results/Results';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../Actions';
import { debounce } from 'lodash';



class Home extends Component {


	loadInitialGif = (props) => {
		console.log(props)
		this.props.actions.resetState();
		this.props.actions.fetchGif(props, this.props.offset);
		// this.props.actions.updatePage();
		// this.props.actions.updateOffset();
		// this.setState({ term, page: 1, offset: 25 });
	}


	render() {


		// console.log('props',this.props)
		return (

			<div >
				{/* <Topbar></Topbar> */}
				<SearchBar onTermChange={debounce(this.loadInitialGif, 1000)}></SearchBar>
				<Results
					posts={this.props.gif}
				></Results>

			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		gif: state.gif.data,
		prevY: state.gif.prevY,
		page: state.gif.page, 
        term: state.gif.term, 
		isFetching: state.gif.isFetching,
		offset: state.gif.offset

	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(Actions, dispatch)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
