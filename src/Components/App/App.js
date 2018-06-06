import React, { Component} from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Redirect } from 'react-router-dom'
import { history } from '../../Store/configureStore';
import { connect } from 'react-redux';

import Topbar from '../Topbar/Topbar';
import Home from '../Home/Home';
import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import Favorites from '../Favorites/Favorites';

const PrivateRoute = ({component: Component, authenticated, ...props}) => {
    return (
        <Route
            {...props}
            render={(props) => authenticated === true
                ? <Component {...props} />
                : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
        />
    );
};

const PublicRoute = ({component: Component, authenticated, ...props}) => {
    return (
        <Route
            {...props}
            render={(props) => authenticated === false
                ? <Component {...props} />
                : <Redirect to='/favorites' />}
        />
    );
}


class App extends Component {
    render() {
        return (
            <ConnectedRouter history={history}>
                <div>
                    <Topbar />

                    <div className="container">
                        <Route exact path="/" component={ Home }/>
                        <PublicRoute authenticated={this.props.authenticated }  path="/signup" component={ Signup } />
                        <PublicRoute authenticated={this.props.authenticated }  path="/login" component={ Login } />
                        <PrivateRoute authenticated={this.props.authenticated }  path="/favorites" component={ Favorites } />
                    </div>
                </div>
            </ConnectedRouter>
        );
    }
}

const mapStateToProps = (state) => {
    return { authenticated: false };
};

export default connect(mapStateToProps)(App);
