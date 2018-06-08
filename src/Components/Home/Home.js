import React, { Component } from 'react';
import Results from '../Results/Results';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../Actions';
import Aux from '../../Hoc/Aux';



class Home extends Component {

	componentDidMount() {
		this.props.actions.verifyAuth();
	}

	render() {
		
		return (
			<Aux >
				<Results
					posts={this.props.gif}
				></Results>
			</Aux>
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
		offset: state.gif.offset,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(Actions, dispatch)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
