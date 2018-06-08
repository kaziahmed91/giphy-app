import React, { Component} from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Redirect } from 'react-router-dom'
import { history } from '../../Store/configureStore';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import SearchBar from '../Search/Search';
import { debounce } from 'lodash';
import Topbar from '../Topbar/Topbar';
import Home from '../Home/Home';
import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import Favorites from '../Favorites/Favorites';
import * as Actions from '../../Actions';

const PrivateRoute = ({component: Component, authenticated, ...props}) => {
    return (
        <Route
            {...props}
            render={(props) => authenticated === true
                ?
                 <Component {...props} />
                : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
        />
    );
};

const PublicRoute = ({component: Component, authenticated, ...props}) => {
    return (
        <Route {...props} render={(props) => authenticated === false ? 
                <Component {...props} />
                : <Redirect to='/favorites' />}
        />
    );
}


class App extends Component {

    loadInitialGif = (props) => {
		this.props.actions.resetState();
		this.props.actions.fetchGif(props, this.props.offset);
    }
    
    render() {
        return (
            <ConnectedRouter history={history}>
                <div>
                    <Topbar />
                    <SearchBar onTermChange={debounce(this.loadInitialGif, 1000)}></SearchBar>
                    <div className="container">
                        <Route exact path="/" component={ Home }/>
                        <PublicRoute authenticated={this.props.authenticated }  path="/login" component={ Login } />
                        <PublicRoute authenticated={this.props.authenticated }  path="/signup" component={ Signup } />
                        <PrivateRoute authenticated={this.props.authenticated }  path="/favorites" component={ Favorites } />
                    </div>
                </div>
            </ConnectedRouter>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        authenticated: state.auth.authenticated 
    };
};

let mapDispatchToProps = dispatch => {
    return {
        actions : bindActionCreators(Actions, dispatch)
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(App);
