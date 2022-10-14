import React, { useState, useEffect } from "react";
import useScreenType from "react-screentype-hook";
import "../assets/css/Auth.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
require("firebase/auth");

const SignUp = () => {
  const defValues = {
    username: "",
    phone: "",
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  const [isSmallScrn, setIsSmallScrn] = useState(false);
  const [formData, setFormData] = useState(defValues);
  const [isNewUser, setIsNewUser] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isExploreBtnToggle, setIsExploreBtnToggle] = useState(false);
  const validate = () => {
    const { username, email, phone, password } = formData;
    if (
      (!username?.trim() && isNewUser) ||
      !email?.trim() ||
      (!phone?.trim() && isNewUser) ||
      !password?.trim()
    ) {
      setShowError(true);
      return false;
    }
    setShowError(false);
    return true;
  };
  const screenType = useScreenType();
  useEffect(() => {
    if (screenType.isMobile || screenType.isTablet) {
      setIsSmallScrn(true);
    } else {
      setIsSmallScrn(false);
    }
  }, [screenType]);

  const handleSubmit = () => {
    if (validate()) {
      const auth = getAuth();
      if (!isNewUser) {
        signInWithEmailAndPassword(auth, formData.email, formData.password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            localStorage.setItem("user-details", JSON.stringify(user));
            navigate("/home");
            setErrorMessage(null);
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            setErrorMessage(errorCode);
          });
      } else {
        createUserWithEmailAndPassword(auth, formData.email, formData.password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            localStorage.setItem("user-details", JSON.stringify(user));
            navigate("/home");
            setErrorMessage(null);

            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            setErrorMessage(errorCode);

            // ..
          });
      }
    }
  };

  return (
    <section className="vh-100 ">
      <div className="px-4 py-5 px-md-5 text-center text-lg-start vh-100 bg-img-main">
        <div className="container h-100">
          <div className="row gx-lg-5 align-items-center h-100">
            {((!isExploreBtnToggle && isSmallScrn) || !isSmallScrn) && (
              <div className="col-lg-6 mb-5 mb-lg-0">
                <h1 className="my-5 display-3 fw-bold ls-tight">
                  Explore all the <br />
                  <span className="text-primary">Countries flags....</span>
                </h1>
                <p style={{ color: "hsl(217, 10%, 50.8%)" }}>
                  You will get the details about all the countries from this
                  website.
                </p>
              </div>
            )}
            {!isExploreBtnToggle && isSmallScrn && (
              <button
                type="button"
                className="btn btn-primary btn-lg explore-btn"
                onClick={() => setIsExploreBtnToggle(true)}
              >
                Lets Explore
              </button>
            )}
            {((isExploreBtnToggle && isSmallScrn) || !isSmallScrn) && (
              <div class="shadow-lg p-3 col-lg-6  mb-5 mb-lg-0 bg-white rounded">
                {/* <div className="col-lg-6 mb-5 mb-lg-0 shadow-lg"> */}
                <div className="card shadow-lg">
                  <div className="card-body py-5 px-md-5">
                    <h3 className="mb-5 text-center">
                      {isNewUser ? "Create an account" : "Sign In"}
                    </h3>
                    <form autoComplete="off">
                      <p className="mb-2 font-weight-bold csr-ptr">
                        {isNewUser ? "Already a user? " : "New User? "}
                        <span
                          onClick={() => setIsNewUser(isNewUser ? false : true)}
                          className="text-primary pe-auto"
                        >
                          {isNewUser
                            ? "Login your account"
                            : "Create an account"}
                        </span>
                      </p>
                      {isNewUser && (
                        <div className="row">
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <input
                                type="text"
                                id="form3Example1"
                                className={`form-control ${
                                  formData?.username?.trim() === "" &&
                                  showError &&
                                  " input-error"
                                }`}
                                autoComplete="off"
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    username: e.target.value,
                                  })
                                }
                              />
                              <label
                                className="form-label"
                                htmlFor="form3Example1"
                              >
                                User Name
                              </label>
                            </div>
                          </div>
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <input
                                type="text"
                                id="form3Example2"
                                className={`form-control ${
                                  formData?.phone?.trim() === "" &&
                                  showError &&
                                  " input-error"
                                }`}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    phone: e.target.value,
                                  })
                                }
                              />
                              <label
                                className="form-label"
                                htmlFor="form3Example2"
                              >
                                Phone
                              </label>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="form3Example3"
                          className={`form-control ${
                            formData?.email?.trim() === "" &&
                            showError &&
                            " input-error"
                          }`}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                        <label
                          className={`form-label}`}
                          htmlFor="form3Example3"
                        >
                          {`Email address`}
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form3Example4"
                          className={`form-control ${
                            formData?.password?.trim() === "" &&
                            showError &&
                            " input-error"
                          }`}
                          autoComplete="new-password"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              password: e.target.value,
                            })
                          }
                        />
                        <label className="form-label" htmlFor="form3Example4">
                          Password
                        </label>
                      </div>
                      <div className="form-outline mb-4">
                        <button
                          type="button"
                          className="w-100 btn btn-primary btn-block mb-4"
                          onClick={() => handleSubmit()}
                        >
                          {isNewUser ? "Create Account" : "Sign In"}
                        </button>
                        {errorMessage && (
                          <label
                            className="form-label text-centre text-danger"
                            htmlFor="form3Example3"
                          >
                            {errorMessage}
                          </label>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
