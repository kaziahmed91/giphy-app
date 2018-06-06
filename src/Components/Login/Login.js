import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import classes from './Login.scss';
// import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import * as Actions from '../../Actions';
import { TextField } from 'redux-form-material-ui'

const validate = values => {
    const errors = {};

    if (!values.email) {
        errors.email = "Please enter an email.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }

    if (!values.password) {
        errors.password = "Please enter a password.";
    }

    return errors;
};


class Login extends Component {

    handleFormSubmit = (values) => {
        this.props.userSignIn(values);
        console.log(values);
    };

    render(props) {
        return (
            <div className={classes.formContainer}>
                <Paper elevation={10} className={classes.formContent}>
                    <Typography variant="headline" align="center" component="h3">
                        Login
                    </Typography>

                    <form className={classes.form} >

                        <label htmlFor="email"></label>
                        <Field name="email"
                            component={TextField}
                            label="Email"
                            className={classes.textFields}
                            type="text" />

                        <label htmlFor='password'></label>
                        <Field name="password"
                            component={TextField}
                            className={classes.textFields}
                            label="Password"
                            type="password" />

                        <br /> <br />
                        <Button variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={this.props.handleSubmit(this.handleFormSubmit)}
                        >
                            Login
                        </Button>
                        <br />
                    </form>

                    <Typography variant="caption" align="center" component="p">
                        Forgot Password?
                    </Typography>

                </Paper>
            </div>
        );
    }
}

export default connect(null, Actions)(
    reduxForm({
        form: 'login',
        validate
    })(Login));
