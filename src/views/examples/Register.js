import React, {useState} from "react";
import { Link , useNavigate} from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from 'reactstrap';
import './Register.css'; // Import the custom CSS file for styling

const Register = () => {

  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailId, setEmailId] = useState("");
  const [address, setAddress] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleName, setRoleName] = useState("Admin");
  const [message, setMessage] = useState("");

  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitting the form")
    // if(companyName===""||phoneNumber===""||emailId===""||address===""||firstName===""||lastName===""||userEmail===""||password===""){

    // }

    // Create an object with the form data
    const formData = {
      companyName,
      phoneNumber,
      emailId,
      address,
      isDeleted:false,
      users: [
        {
          firstName,
          lastName,
          email: userEmail,
          password,
          verificationEnabled:false,
          role: {
            roleId:1,
            roleName,
          },
        },
      ],
    };

    // Handle form submission
    console.log(formData);
    // Make a POST request to the backend API
    axios.post("http://localhost:8200/register", formData)
      .then(response => {
        console.log(response.data);
        if(response.data==="Company Registered Successfully!"){

          setMessage(response.data)
          setCompanyName("")
          setPhoneNumber("")
          setEmailId("")
          setAddress("")
          setFirstName("")
          setLastName("")
          setUserEmail("")
          setPassword("")
          // alert(response.data)
          toast.success(response.data)
          // navigate('/login')
        } 
        else{
          // alert(response.data)
          // setMessage(response.data)
          const message = response.data;
          toast.error(message)

        }
        // Perform further actions if needed
      })
      .catch(error => {
        // const message = error.response.data.message;
        // toast.error("An error occurred");
        console.error(error); // Handle any errors that occur during the request
      });
  };

  return (
    <div className="register-container">
      <Card className="bg-secondary shadow border-0">
        <CardBody className="px-lg-5 py-lg-5">
          <div className="text-center text-muted mb-4">
            <h4>Company with User Details</h4>
          </div>
          <Form role="form" onSubmit={handleSubmit}>
            <Row>
              <Col md="6">
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Company Name" 
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          required
                           />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Phone Number" 
                          type="text" 
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          required
                           />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                        placeholder="Company Email"
                        type="email"
                        autoComplete="new-email"
                        value={emailId}
                        onChange={(e) => setEmailId(e.target.value)}
                        required
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Address" 
                      type="text" 
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      />
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="First Name" 
                           type="text" 
                           value={firstName}
                           onChange={(e) => setFirstName(e.target.value)}
                           required
                           />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Last Name" 
                           type="text" 
                           value={lastName}
                           onChange={(e) => setLastName(e.target.value)}
                           required
                           />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="User Email"
                      type="email"
                      autoComplete="new-email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      required
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
                    <Input
                      placeholder="Password"
                      type="password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </InputGroup>
                </FormGroup>
                {/* <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="User Role" 
                           type="text"
                           value={roleName}
                           onChange={(e) => setRoleName(e.target.value)} />
                  </InputGroup>
                </FormGroup> */}
              </Col>
            </Row>
            <div className="text-center">
              <Button className="mt-4" color="primary" type="submit">
                Create account
              </Button>
            </div>
          </Form>
          {/* <div className="text-muted font-italic">
            <small>
              password strength:{" "}
              <span className="text-success font-weight-700">strong</span>
            </small>
          </div> */}
          
          <div className="text-center mt-3">
            <span>Already have an account?</span>
            <Link to="/auth/login" className="ml-2">
              Login
            </Link>
          </div>
          {/* <div style={{display:"flex",width:"90%",justifyContent:"center"}}>{message}</div> */}
        </CardBody>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default Register;

