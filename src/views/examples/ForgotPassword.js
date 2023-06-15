
import React, { useState } from "react";
import "./ForgotPassword.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Col,
} from "reactstrap";
import { FiLock } from "react-icons/fi"; // Importing the FiLock icon from react-icons
import "./Login.css"; // Import the CSS file

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send reset password email
    console.log("Email:", email);
    // Reset the email field
    // setEmail("");

    const formData={
      email
    };

    console.log(formData);
    axios.post("http://localhost:8200/forget_password",formData)
    .then(response=>{
      navigate('/reset-Password')
      console.log("we got the response",response.data);
      })
    .catch(error => {
      console.error(error)
  });
};

  return (
    <div className="forgot-password-container"> {/* Add a container */}
      <Col lg="5" md="5">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <h4 className="forgot-password-heading">
                <FiLock size={64} /> Forgot Password
              </h4>
              <p className="forgot-password-message">
                Enter your email we will send you instructions to reset your password.
              </p>
            </div>
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit" onClick={handleSubmit}>
                  Reset Password
                </Button>
              </div>
            </Form>
            <Row className="mt-3">
              <Col className="text-center" xs="12">
                <p className="back-to-login">
                  Remembered your password?{" "}
                  <Link to="/login">Back to Login</Link>
                </p>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </div>
  );
};

export default ForgotPassword;
