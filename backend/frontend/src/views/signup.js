/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, memo } from "react";
import { ToastMessage } from '../context/ToastMessage';
import { NotificationManager } from 'react-notifications';
import { postData } from "../context/Common";
import "./ContactForm.css";
import refresh from '../assets/images/svgs/refresh.svg';
const register = memo(() => {
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
        fullName: contactDetails.fields.fullName,
        email: contactDetails.fields.email,
        mobile: contactDetails.fields.mobile,
        password: contactDetails.fields.password
      };
      console.log(params, 'here')
      postData("/submitForm", params, {
        method_type: "post",
      })
        .then((response) => {
          var data = response.data;
          console.log(data)
          ToastMessage(data.message, "s");
          setLoading(false);
          setContactDetails(initialState)
        })
        .catch((error) => {
          console.log(error)
          ToastMessage(error.data.error, "e");
          setLoading(false);
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

  const handleChange = (e, field) => {
    console.log(contactDetails, "here")

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
                    <label htmlFor="placeholder">Name</label>
                    <input
                      className={`form-control mb-0${contactDetails.errors && contactDetails.errors.fullName ? ' is-invalid' : ''}`}
                      id="name01"
                      placeholder="Name"
                      value={(contactDetails.fields && contactDetails.fields.fullName) || ''}
                      onChange={(e) => handleChange(e, "fullName")}
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
                    <label htmlFor="placeholder">Mobile</label>
                    <input
                      className={`form-control mb-0${contactDetails.errors && contactDetails.errors.mobile ? ' is-invalid' : ''}`}
                      maxLength={10}
                      id="validationCustom1012"
                      placeholder="10 Digits Mobile"
                      value={(contactDetails.fields && contactDetails.fields.mobile) || ''}
                      onChange={(e) => handleChange(e, "mobile")}
                      required=""
                    />
                    <div className="invalid-feedback text-left" >
                      {contactDetails.errors.mobile}
                    </div>
                  </div>
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

export default register;
