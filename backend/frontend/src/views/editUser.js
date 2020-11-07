/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, memo } from "react";
import { ToastMessage } from '../context/ToastMessage';
import { NotificationManager } from 'react-notifications';
import { postData } from "../context/Common";
import "./ContactForm.css";
import { useHistory } from "react-router-dom";
import refresh from '../assets/images/svgs/refresh.svg';
const EditUser = memo(() => {
    const history = useHistory()
    const initialState = {
        errors: {}
    }
    console.log(history.location.state)
    const [loading, setLoading] = useState(false);
    const [contactDetails, setContactDetails] = useState(initialState);
    const [forms, setForms] = useState({
        
    })
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (handleValidation()) {
            const params = {
                userID:history.location.state.userID,
                fullName: forms.fullName,
                email: forms.email,
                mobile: forms.mobile,
                password: forms.password
            };
            postData("/submitForm", params, {
                method_type: "put",
            }).then((response) => {
                var data = response.data;
                ToastMessage(data.message, "s");
                setLoading(false);
                setContactDetails(initialState)
            }).catch((error) => {
                    ToastMessage(error.data.error, "e");
                    setLoading(false);
                });
        } else {
            NotificationManager.error("Form has errors.");
            setLoading(false);
        }
    }
    useEffect(() => {
        postData(`/user/${history.location.state.userID}`, "", {
            method_type: "get",
        }).then((todo) => {
            setForms({
                ...forms,
                fullName:todo.data.user.fullName ,
                password:todo.data.user.password,
                mobile:todo.data.user.mobile,
                email:todo.data.user.email,
            })
        })
    }, [])
    const handleValidation = () => {
        console.log(forms)
        let fields = forms;
        let errors = {};
        let formIsValid = true;
        if (!fields["fullName"]) {
            formIsValid = false;
            errors["fullName"] = "FullName cannot be empty";
        }
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
        if (!fields["mobile"]) {
            formIsValid = false;
            errors["mobile"] = "Mobile cannot be empty";
        } else if (!/^\d{10}$/.test(fields["mobile"])) {
            formIsValid = false;
            errors["mobile"] = "Should be at least 10 digits";
        } else if (!/^[1-9]\d*$/.test(fields["mobile"])) {
            formIsValid = false;
            errors["mobile"] = "Mobile number should not be start with 0";
        }

        setContactDetails({ ...contactDetails, errors: errors });
        return formIsValid;
    }

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setForms({
            ...forms,
            [name]: value
        })
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
                                        <label htmlFor="placeholder">Name</label>
                                        {console.log(contactDetails)}
                                        <input
                                            className={`form-control mb-0${contactDetails.errors && contactDetails.errors.fullName ? ' is-invalid' : ''}`}
                                            name="fullName"
                                            value={forms.fullName}
                                            onChange={handleChange}
                                            required=""
                                        />
                                        <div className="invalid-feedback text-left">
                                            {contactDetails.errors && contactDetails.errors.fullName}
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="placeholder">password</label>
                                        <input
                                            className={`form-control mb-0${contactDetails.errors && contactDetails.errors.password ? ' is-invalid' : ''}`}
                                            name="password"
                                            value={forms.password}
                                            onChange={handleChange}
                                            required=""
                                        />
                                        <div className="invalid-feedback text-left">
                                            {contactDetails.errors && contactDetails.errors.password}
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="placeholder">Mobile</label>
                                        <input
                                            className={`form-control mb-0${contactDetails.errors && contactDetails.errors.mobile ? ' is-invalid' : ''}`}
                                            maxLength={10}
                                            name="mobile"
                                            value={forms.mobile}
                                            onChange={handleChange}
                                            required=""
                                        />
                                        <div className="invalid-feedback text-left" >
                                            {contactDetails.errors && contactDetails.errors.mobile}
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="email03">Email</label>
                                        <input
                                            className={`form-control mb-0${contactDetails.errors && contactDetails.errors.email ? ' is-invalid' : ''}`}
                                            name="mobile"
                                            value={forms.email}
                                            onChange={handleChange}
                                            required=""
                                        ></input>
                                        <div className="invalid-feedback text-left">
                                            {contactDetails.errors && contactDetails.errors.email}
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
                                            {loading ? `${'\t'}Loading...` : 'Submit'}
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

export default EditUser;
