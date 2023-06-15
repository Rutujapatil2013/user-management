

import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // New state for error message
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const creds = {
      email,
      password,
    };
    console.log("login button pressed", creds);

    const url =
      "http://localhost:8200/users/login?email=" + email + "&password=" + password;
    console.log(url);
    try {
      const response = await axios.post(url);
      const user = response.data;
      if (user === "Password does not match" || user === "User not found") {
        console.log(user);
        // setErrorMessage("Invalid credentials"); // Set error message
        toast.error(user)
      } else {
        const newUrl = "http://localhost:8200/users/getByEmail/" + email;
        console.log(newUrl);
        axios
          .get(newUrl)
          .then((response) => {
            const newData = response.data;
            const newDatas = newData[0];
            const gotrole = newDatas.role.roleName;
            if (gotrole === "Admin") {
              console.log("Login Successful", true);
              localStorage.setItem("adminEmail", email);
              localStorage.setItem("userEmail", email);
              localStorage.setItem("defaultRole", "Admin");
              // toast.error("login successfully")
              navigate("/admin/index", { state: "true", email: email });
              // toast.success("Login Successful!")
            } else {
              console.log("Login Successful ", false);
              localStorage.setItem("userEmail", email);
              localStorage.setItem("defaultRole", "User");
              toast.success("Login Successful!")
              navigate("/admin/index", { state: "false" });
            }
          })
          .catch((error) => {
            console.error(error);
            setErrorMessage("An error occurred"); // Set error message
          });
      }
    } catch (err) {
      const message = err.response.data.message;
      setErrorMessage("An error occurred"); // Set error message
    }
  };

  return (
    <>
      <Col lg="5" md="5">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small></small>
            </div>
            <Form role="form" onSubmit={handleLogin}>
              <h2 className="Login">Login</h2>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="new-email"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <div className="input">
                    <Input
                      placeholder="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="new-password"
                    />
                  </div>
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Sign In
                </Button>
              </div>
              {errorMessage && (
                <div className="text-center text-danger">{errorMessage}</div>
              )}
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <Link to="/forgot-Password" className="text-light">
                <small>Forgot password?</small>
              </Link>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <Link to="/auth/register" className="text-light">
              <small>Create new account</small>
            </Link>
          </Col>
        </Row>
      </Col>
      <ToastContainer />
    </>
  );
};

export default Login;
