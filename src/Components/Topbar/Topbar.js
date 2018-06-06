import React, { Component } from 'react';
import classes from './Topbar.scss';
import searchImg from '../../Assets/magnifier.png';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Actions from '../../Actions';


class Topbar extends React.Component {
    handleSignout() {
        this.props.userSignOut();
    }

    renderAuthLinks() {
        if (this.props.authenticated) {
            return [
                <li  className={classes.navLink} key={1}>
                    <Link to="/favorites">My Favorites</Link>
                </li>,
                <li className={classes.navLink} key={2}>
                    <a href="#" onClick={() => this.handleSignout()}>Sign Out</a>
                </li>
            ] 
        } else {
            return [
                <li className={classes.navLink}  key={1}>
                    <Link to="/login">Login</Link>
                </li>,
                <li className={classes.navLink}  key={2}>
                    <Link to="/signup">Sign Up</Link>
                </li>
            ]
        }
    }

    render() {
        return (
            <nav className={classes.topbar}>
                <div className={classes.topbar}>
                    <Link to="/" className={classes.header}>Giphy Search</Link>
                    <nav>
                        <ul className={classes.navLinks}>
                            {this.renderAuthLinks()}
                        </ul>
                        <div className={classes.searchBtn}>
                            <img src={searchImg} alt="search"></img>
                        </div>
                    </nav>
                </div>
            </nav>
        );
    }
}


function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    }
  }

export default connect(mapStateToProps, Actions)(Topbar);
