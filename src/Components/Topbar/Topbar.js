import React, { Component } from 'react';
import classes from './Topbar.scss';
import searchImg from '../../Assets/search.svg';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Actions from '../../Actions';
import giphyLogo from '../../Assets/giphy_logo.gif'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


class Topbar extends Component {
    handleSignout() {
        this.props.signOutUser();
    }

    renderAuthLinks() {
        if (this.props.authenticated) {
            return [


                <Button color="primary" variant='outlined' label='Login' className={classes.navLink} key={1}>
                    <Link to="/favorites">Favorites</Link>
                </Button>
                ,
                <Button color="primary" 
                    variant='outlined' label='Sign Out' 
                    className={classes.navLink} key={2}
                    onClick={() => this.props.actions.signOutUser()}>
                    <Link to="">Logout</Link>
                </Button>
            ]
        } else {
            return [
                // <li className={classes.navLink} key={1}>
                //     <Link to="/login">Login</Link>
                // </li>
                <Button color="primary" variant='outlined' label='Login' className={classes.navLink} key={1}>
                    <Link to="/login">Login</Link>
                </Button>,


                <Button color="primary" variant='outlined' label='Signup' className={classes.navLink} key={2}>
                    <Link to="/signup">Signup</Link>
                </Button>

                // <li className={classes.navLink} key={2}>
                // </li>
            ]
        }
    }

    render() {
        return (
            <nav className={classes.topbar}>
                <div className={classes.topbar}>
                    <Link to="/" className={classes.header}>
                        <img src={giphyLogo} className={classes.giphyLogo} alt='logo'></img>
                        <Typography variant="display2" align="center" className={classes.headerText}>
                            Search
                        </Typography>
                    </Link>
                    <nav>
                        <ul className={classes.navLinks}>
                            {this.renderAuthLinks()}
                        </ul>
                        <Link to="/">

                            <Button variant="fab" color="primary"
                                aria-label="add"
                                onClick={this.props.actions.openSearch}
                                className={classes.searchBtn}>
                                <img src={searchImg} alt="search" ></img>
                            </Button>


                        </Link>
                    </nav>
                </div>
            </nav>
        );
    }
}


let mapStateToProps = state => {
    return {
        authenticated: state.auth.authenticated
    }
}
let mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Topbar);
