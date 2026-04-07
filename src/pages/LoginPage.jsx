import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";

import axios from "axios";
import Swal from "sweetalert2";

const LoginPage = () => {
const navigate = useNavigate();
const [formData, setFormData] = useState({
    email: "",
    password: "",
});

const [errors, setErrors] = useState({});
const handleChange = (e) => {
    setFormData({
    ...formData,
    [e.target.name]: e.target.value,
    });
};

const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
    const res = await axios.post("http://127.0.0.1:8000/api/login", formData);

    Swal.fire({
        icon: "success",
        title: "Login success",
        text: res.data?.message || "Welcome",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data?.errors);
      } else if (error.response && error.response.status === 401) {
        Swal.fire({
          icon: "warning",
          title: "Login failed",
          text:
            error.response.data?.message ||
            "Please check your email or password",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong",
        });
      }
    }
  };

  return (
    <AuthCard title="Login Form">
      <Form onSubmit={handleLogin}>
        {/* EMAIL */}
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            isInvalid={!!errors.email}
            type="email"
            name="email"
            placeholder="Enter Your Email"
            value={formData.email}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.[0]}
          </Form.Control.Feedback>
        </Form.Group>

        {/* PASSWORD */}
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            isInvalid={!!errors.password}
            type="password"
            name="password"
            placeholder="Enter Your Password"
            value={formData.password}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.[0]}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Login
        </Button>

        <div className="text-center">
          <small>
            Dont have an account ? <Link to="/register">Register</Link>
          </small>
        </div>
      </Form>
    </AuthCard>
  );
};

export default LoginPage;
