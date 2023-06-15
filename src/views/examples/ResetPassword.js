import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
import { FiLock, FiCheckCircle } from "react-icons/fi";
import "./ResetPassword.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate()

  

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle form submission, e.g., send reset password email
  //   console.log("Email:", email);

  //   const formData={
  //     email,
  //     code,
  //     newPassword
  //   };

  //   console.log(formData);
  //   axios.post("http://localhost:8200/reset-password/{email}/{code}/{newPassword}",formData)
  //   .then(response=>{
  //     console.log(response.data);
  //     })
  //   .catch(error => {
  //     console.error(error)
  // });
  // }
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., reset the password
    console.log("Email:", email);
    console.log("Code:", code);
    console.log("New Password:", newPassword);
    const url = "http://localhost:8200/reset-password?email="+email+"&code=" + code+ "&newPassword="+newPassword;
    console.log(url)
    axios.post(url).then(response=>{
      console.log(response.data)
      alert("Password reset successfully!")
      navigate('/')
    } ).catch(error=>{
      console.error(error)
    })
  };

  return (
    <>
    <div className="reset-password-container">
      <Col lg="5" md="5">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <h4 className="reset-password-heading">
                <FiLock className="reset-password-icon" /> Reset Password
              </h4>
              <p className="reset-password-message">
                Please enter your email, verification code, and new password.
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
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-badge" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Verification Code"
                    type="text"
                    autoComplete="off"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="New Password"
                    type="password"
                    autoComplete="off"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit" onClick={handleSubmit}>
                  <FiCheckCircle className="reset-password-icon" /> Reset Password
                </Button>
                <Row className="mt-3">
                <Col className="text-center" xs="12">
                    <p className="back-to-login">
                    {" "}
                    <Link to="/login">Back to Login</Link>
                    </p>
                </Col>
                </Row>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </div>
  </>
  );
};

export default ResetPassword;
