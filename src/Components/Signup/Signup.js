import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import classes from './Signup.scss';
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
    if (!values.firstname) {
        errors.firstname = "Please enter your first name";
    } else if (!/[a-zA-Z]+/i.test(values.firstname)) {
        errors.firstname = 'Firstname must only contain letters';
    }
    if (!values.lastname) {
        errors.lastname = "Please enter your last name"
    } else if (!/[a-zA-Z]+/i.test(values.lastname)) {
        errors.lastname = 'Firstname must only contain letters';
    }

    if (!values.password) {
        errors.password = "Please enter a password.";
    }

    if (!values.passwordConfirmation) {
        errors.passwordConfirmation = "Please enter a password confirmation.";
    }

    if (values.password !== values.passwordConfirmation) {
        errors.password = 'Passwords do not match';
    }

    return errors;
};


class Signup extends Component {

    handleFormSubmit = (values) => {
        this.props.signUpUser(values);
        if (this.props.authenticationError) {
            throw new SubmissionError({
                password: this.props.authenticationError,
                errors: 'Login failed!'
            }) 
        }
    };

    render(props) {
        return (
            <div className={classes.formContainer}>
                <Paper elevation={10} className={classes.formContent}>
                    <Typography variant="headline" align="center" component="h3">
                        Signup
                    </Typography>

                    <form className={classes.form} >

                        <label htmlFor="firstname"></label>
                        <Field name="firstname"
                            component={TextField}
                            label="First Name"
                            className={classes.textFields}
                            type="text" />

                        <label htmlFor="lastname"></label>
                        <Field name="lastname"
                            component={TextField}
                            label="Last Name"
                            className={classes.textFields}
                            type="text" />

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

                        <label htmlFor='passwordConfirmation'></label>
                        <Field name="passwordConfirmation"
                            component={TextField}
                            className={classes.textFields}
                            label="Confirm Password"
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


function mapStateToProps(state) {
    return {
      authenticationError: state.auth.error
    }
}

export default connect(mapStateToProps, Actions)(
reduxForm({
    form: 'signup',
    validate
})(Signup));
