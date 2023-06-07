/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
// import {
//   Button,
//   Card,
//   CardHeader,
//   CardBody,
//   FormGroup,
//   Form,
//   Input,
//   InputGroupAddon,
//   InputGroupText,
//   InputGroup,
//   Row,
//   Col,
// } from "reactstrap";

// const Register = () => {
//   return (
//     <>
//       <Col lg="6" md="2">
//         <Card className="bg-secondary shadow border-0">
//           <CardBody className="px-lg-5 py-lg-5">
//             <div className="text-center text-muted mb-4">
//               <small></small>
//             </div>
//             <Form role="form">
//               <FormGroup>
//                 <InputGroup className="input-group-alternative mb-3">
//                   <InputGroupAddon addonType="prepend">
//                     <InputGroupText>
//                       <i className="ni ni-hat-3" />
//                     </InputGroupText>
//                   </InputGroupAddon>
//                   <Input placeholder="Company Name" type="text" />
//                 </InputGroup>
//               </FormGroup>
//               <FormGroup>
//                 <InputGroup className="input-group-alternative mb-3">
//                   <InputGroupAddon addonType="prepend">
//                     <InputGroupText>
//                       <i className="ni ni-hat-3" />
//                     </InputGroupText>
//                   </InputGroupAddon>
//                   <Input placeholder="Phone Number" type="text" />
//                 </InputGroup>
//               </FormGroup>
//               <FormGroup>
//                 <InputGroup className="input-group-alternative mb-3">
//                   <InputGroupAddon addonType="prepend">
//                     <InputGroupText>
//                       <i className="ni ni-email-83" />
//                     </InputGroupText>
//                   </InputGroupAddon>
//                   <Input
//                     placeholder="Company Email"
//                     type="email"
//                     autoComplete="new-email"
//                   />address 
//                 </InputGroup>
//               </FormGroup>
//               <FormGroup>
//                 <InputGroup className="input-group-alternative mb-3">
//                   <InputGroupAddon addonType="prepend">
//                     <InputGroupText>
//                       <i className="ni ni-hat-3" />
//                     </InputGroupText>
//                   </InputGroupAddon>
//                   <Input placeholder="Address" type="text" />
//                 </InputGroup>
//               </FormGroup>
//               <FormGroup>
//                 <InputGroup className="input-group-alternative mb-3">
//                   <InputGroupAddon addonType="prepend">
//                     <InputGroupText>
//                       <i className="ni ni-hat-3" />
//                     </InputGroupText>
//                   </InputGroupAddon>
//                   <Input placeholder="First Name" type="text" />
//                 </InputGroup>
//               </FormGroup>
//               <FormGroup>
//                 <InputGroup className="input-group-alternative mb-3">
//                   <InputGroupAddon addonType="prepend">
//                     <InputGroupText>
//                       <i className="ni ni-hat-3" />
//                     </InputGroupText>
//                   </InputGroupAddon>
//                   <Input placeholder="Last Name" type="text" />
//                 </InputGroup>
//               </FormGroup>
//               <FormGroup>
//                 <InputGroup className="input-group-alternative mb-3">
//                   <InputGroupAddon addonType="prepend">
//                     <InputGroupText>
//                       <i className="ni ni-email-83" />
//                     </InputGroupText>
//                   </InputGroupAddon>
//                   <Input
//                     placeholder="User Email"
//                     type="email"
//                     autoComplete="new-email"
//                   />
//                 </InputGroup>
//               </FormGroup>
//               <FormGroup>
//                 <InputGroup className="input-group-alternative">
//                   <InputGroupAddon addonType="prepend">
//                     <InputGroupText>
//                       <i className="ni ni-lock-circle-open" />
//                     </InputGroupText>
//                   </InputGroupAddon>
//                   <Input
//                     placeholder="Password"
//                     type="password"
//                     autoComplete="new-password"
//                   />
//                 </InputGroup>
//               </FormGroup>
//               <FormGroup>
//                 <InputGroup className="input-group-alternative mb-3">
//                   <InputGroupAddon addonType="prepend">
//                     <InputGroupText>
//                       <i className="ni ni-hat-3" />
//                     </InputGroupText>
//                   </InputGroupAddon>
//                   <Input placeholder="User-Role" type="text" />
//                 </InputGroup>
//               </FormGroup>

//               <div className="text-muted font-italic">
//                 <small>
//                   password strength:{" "}
//                   <span className="text-success font-weight-700">strong</span>
//                 </small>
//               </div>

//               <div className="text-center">
//                 <Button className="mt-4" color="primary" type="button">
//                   Create account
//                 </Button>
//               </div>
              
//             </Form>
//           </CardBody>
//         </Card>
//       </Col>
//     </>
//   );
// };

// export default Register;


import React from 'react';
import { Link } from 'react-router-dom';
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
  return (
    <div className="register-container">
      <Card className="bg-secondary shadow border-0">
        <CardBody className="px-lg-5 py-lg-5">
          <div className="text-center text-muted mb-4">
            <h4>Company with User Details</h4>
          </div>
          <Form role="form">
            <Row>
              <Col md="6">
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Company Name" type="text" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Phone Number" type="text" />
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
                    <Input placeholder="Address" type="text" />
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
                    <Input placeholder="First Name" type="text" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Last Name" type="text" />
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
                    <Input placeholder="User Role" type="text" />
                  </InputGroup>
                </FormGroup>
              </Col>
            </Row>
          </Form>
          <div className="text-muted font-italic">
            <small>
              password strength:{" "}
              <span className="text-success font-weight-700">strong</span>
            </small>
          </div>
          <div className="text-center">
            <Button className="mt-4" color="primary" type="button">
              Create account
            </Button>
          </div>
          <div className="text-center mt-3">
            <span>Already have an account?</span>
            <Link to="/auth/login" className="ml-2">
              Login
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Register;
