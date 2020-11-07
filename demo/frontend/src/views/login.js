/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, memo } from "react";
import { ToastMessage } from '../context/ToastMessage';
import { NotificationManager } from 'react-notifications';
import { postData } from "../context/Common";
import "./ContactForm.css";
import refresh from '../assets/images/svgs/refresh.svg';
import { useHistory } from "react-router-dom";

const login = memo(() => {
    const history = useHistory()

    const initialState = {
        fields: {
        },
        errors: {}
    }

    const [loading, setLoading] = useState(false);
    const [contactDetails, setContactDetails] = useState(initialState);

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (handleValidation()) {
            const params = {
                email: contactDetails.fields.email,
                password: contactDetails.fields.password
            };
            console.log(params, 'here')
            postData("/login", params, {
                method_type: "post",
            })
                .then((response) => {
                    var data = response.data;
                    localStorage.setItem('token', data.token);
                    ToastMessage(data.message, "s");
                    setLoading(false);
                    setContactDetails(initialState)
                    history.push('/secret')
                })
                .catch((error) => {
                    ToastMessage(error.data.message, "e");
                    setLoading(false);
                    history.push('/login')
                });
        } else {
            NotificationManager.error("Form has errors.");
            setLoading(false);
        }
    }

    const handleValidation = () => {
        // console.log(contactDetails.fields)
        let fields = contactDetails.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "Password cannot be empty";
        }
        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "Email cannot be empty";
        }
        if (fields["email"] && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(fields["email"])) {
            formIsValid = false;
            errors["email"] = "Email invalid";
        }
        setContactDetails({ ...contactDetails, errors: errors });
        return formIsValid;
    }

    const handleChange = (e, field) => {
        let fields = contactDetails.fields;
        let errors = contactDetails.errors;
        fields[field] = e.target.value;
        errors[field] = undefined
        setContactDetails({ ...contactDetails, fields, errors });
    }

    return (
        <section className="new-ctasection">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-12">
                        <div className="login-form-container bg-white p-5 form-signin" style={{ borderRadius: 10 }}>

                            <form className="needs-validation" noValidate="" onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="email03">Email</label>
                                        <input
                                            className={`form-control mb-0${contactDetails.errors && contactDetails.errors.email ? ' is-invalid' : ''}`}
                                            id="email03"
                                            placeholder="Email"
                                            value={(contactDetails.fields && contactDetails.fields.email) || ''}
                                            onChange={(e) => handleChange(e, "email")}
                                            required=""
                                        ></input>
                                        <div className="invalid-feedback text-left">
                                            {contactDetails.errors && contactDetails.errors.email}
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="placeholder">password</label>
                                        <input
                                            className={`form-control mb-0${contactDetails.errors && contactDetails.errors.password ? ' is-invalid' : ''}`}
                                            id="password01"
                                            placeholder="Password"
                                            value={(contactDetails.fields && contactDetails.fields.password) || ''}
                                            onChange={(e) => handleChange(e, "password")}
                                            required=""
                                        />
                                        <div className="invalid-feedback text-left">
                                            {contactDetails.errors && contactDetails.errors.password}
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <button
                                            className="call-usbtn ctc-btn mx-auto px-4 py-2 border-0 my-0"
                                            type="submit"
                                        >
                                            {loading ?
                                                <img className="lazyloaded" src={refresh} width="20" style={{ marginTop: -3 }} alt='' />
                                                : null}
                                            {loading ? `${'\t'}Loading...` : 'Login'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

export default login;
