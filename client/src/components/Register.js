import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import { BsPersonPlusFill } from "react-icons/bs";

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    firstname: "",
    lastName: "",
    address: "",
    role: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  //TODO: authorization
  const signedUser = localStorage.getItem("username");

  const handleChange = (input) => (e) => {
    setValues({ ...values, [input]: e.target.value });
    console.log(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      username: values.username,
      firstname: values.firstName,
      lastName: values.lastName,
      address: values.address,
      role: values.role,
      email: values.email,
      password: values.password,
    };

    axios({
      url: "/api/register",
      method: "POST",
      data: payload,
    })
      .then(() => {
        console.log("Data has been sent to the server");
        signedUser === null ? navigate("/login") : navigate("/dashboard");
        alert("Registration was succesfull");
      })
      .catch((error) => {
        console.log(payload);
        console.log(error);
      });
  };

  return (
    <section className="container">
      <h1 className="large text-primary">{signedUser === null ? "Registration" : "Add new user"}</h1>
      <p className="lead">
        <BsPersonPlusFill />
        Create new account{" "}
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" name="username" placeholder="username" value={values.username} onChange={handleChange("username")} required />
        </div>
        <div className="form-group">
          <input type="email" name="email" placeholder="email" value={values.email} onChange={handleChange("email")} required />
        </div>
        <div className="form-group">
          <input type="text" name="firstName" placeholder="firstName" value={values.firstName} onChange={handleChange("firstName")} />
        </div>
        <div className="form-group">
          <input type="text" name="lastName" placeholder="lastName" value={values.lastName} onChange={handleChange("lastName")} />
        </div>
        <div className="form-group">
          <input type="text" name="address" placeholder="address" value={values.address} onChange={handleChange("address")} />
        </div>{" "}
        <div className="form-group">
          <input type="text" name="role" placeholder="role" value={values.role} onChange={handleChange("role")} />
          <div className="form-group">
            <input type="password" name="password" placeholder="password" value={values.password} onChange={handleChange("password")} />
          </div>
        </div>
        <input type="submit" value="Submit" className="btn btn-primary" />
        {/*<button>Submit</button>*/}
      </form>
      {signedUser === null && (
        <div>
          {" "}
          <p className="my-1">
            Already have an account? <Link to="/login"> Sign in</Link>
          </p>
        </div>
      )}
    </section>
  );
};

export default Register;
