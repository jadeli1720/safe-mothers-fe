import React, {useEffect} from 'react';
import {Form, Field, withFormik} from 'formik/dist/index';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import {loginUser, errorClean} from '../../actions/authActions';
import Logo from './WhatsApp Image 2019-10-20 at 5.31 1.svg'
import SVG from 'react-inlinesvg/lib/index';
import {Container} from './auth-style'
import {Button} from 'pcln-design-system'
import Map from "./Map";
import Errors from "../reusableParts/Errors";


const LoginForm = (props) => {

    useEffect(() => {
        props.errorClean();
    }, [props.values])
    


    return (
        <>
            <Container className="container">
                <div className="map">
                    <Map/>
                </div>
                <div className="form-container">
                    <SVG className="svg-logo" src={Logo}/>
                    <Form className="form-contents">
                        <h1>Login</h1>
                        <Errors errMsg = {props.error} />
                        {console.log("BINGO", props.errors)}
                        <label>Username
                            <Field className="form-inputs" type="text" name="username"/>
                            {props.touched.username && props.errors.username && (
                                <p className="error-message">{props.errors.username}</p>
                            )}
                        </label>
                        <label>Password
                            <Field className="form-inputs" type="password" name="password"/>
                            {props.touched.password && props.errors.password && (
                                <p className="error-message">{props.errors.password}</p>
                            )}
                        </label>
                        <div className="btn-container">
                            <Button className="submit-btn" color="primary" type="submit">Submit</Button>
                        </div>
                    </Form>
                    <div style={{textAlign:"center"}}>
                        <h3 className="demo" style={{margin:"10px 0px 12px"}} >Demo purposes only:</h3>
                        <p style={{fontSize:'12px', margin:"4px 0px"}}><span className="bold">Username:</span> admin</p>
                        <p style={{fontSize:'12px', margin:"4px 0px 12px"}}><span className="bold">Password:</span> password</p>
                        <a href="https://github.com/jadeli1720/safe-mothers-fe" className="bold" style={{color:"#3D689E", fontSize:'14px',margin: "10px"}} >GitHub Repo</a>
                    </div>
                </div>
            </Container>
        </>
    );
};


const FormikLoginForm = withFormik({
    mapPropsToValues({username, password}) {
        return {
            username: username || '',
            password: password || ''
        };
    },

    validationSchema: Yup.object().shape({
        username: Yup.string().required('Please enter a username'),
        password: Yup.string().required('Enter a password')
    }),

    handleSubmit(values, {props}) {
        props.loginUser(values, props.history);
    }
})(LoginForm);

const mapStateToProps = state => {
    return {
        token: state.authReducer.token,
        error: state.authReducer.error
    };
};


export default connect(
    mapStateToProps,
    {loginUser, errorClean}
)(FormikLoginForm);
