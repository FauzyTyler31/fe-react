import { useState } from "react";

import { Form, Button } from "react-bootstrap";
import AuthCard from "../components/AuthCard";
import { useNavigate, Link } from "react-router-dom";

import axios from "axios";
import Swal from "sweetalert2";

function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = async (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors([]);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/register",
        formData,
      );
      const successMsg = res.data.message;
      ("Registration successful!");
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: successMsg,
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        const errorMsg =
          error.response?.data?.message || "Internal Server Error";
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: errorMsg,
          timer: 2000,
          showConfirmButton: false,
        });
      }
    }
  };

  return (
    <AuthCard title="Register Form">
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3">
          <Form.Label className="form-label">Name</Form.Label>
          <Form.Control
            isInvalid={!!errors.name}
            name="name"
            type="text"
            placeholder="Enter Your name"
            onChange={handleChange}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.name?.[0]}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="form-label">Email</Form.Label>
          <Form.Control
            isInvalid={!!errors.email}
            name="email"
            type="email"
            placeholder="Enter Your Email"
            onChange={handleChange}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.email?.[0]}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="form-label">Password</Form.Label>
          <Form.Control
            isInvalid={!!errors.password}
            name="password"
            type="password"
            placeholder="Enter Your Password"
            onChange={handleChange}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.password?.[0]}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="form-label">Password Confirmation</Form.Label>
          <Form.Control
            isInvalid={!!errors.password_confirmation}
            name="password_confirmation"
            type="password"
            placeholder="Re-Enter Your Password"
            onChange={handleChange}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.password_confirmation?.[0]}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" className="w-100" type="submit">
          Register
        </Button>

        <div className="text-center">
          <small>
            Already have an account?
            <Link to="/login">Login</Link>
          </small>
        </div>
      </Form>
    </AuthCard>
  );
}

export default RegisterPage;
