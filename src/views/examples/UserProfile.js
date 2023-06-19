import React from "react";
import { useState, useEffect } from "react";
import "./UserProfile.css";
import axios from "axios";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";

export default function UserProfile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleName, setRoleName] = useState("");

  const tempEmail = localStorage.getItem("userEmail");
  console.log(tempEmail);

  useEffect(() => {
    const fetchUserData = async () => {
      const tempEmail = localStorage.getItem("userEmail");
      console.log("User data as: ");
      const url =
        "http://localhost:8200/users/getByEmail/" +
        localStorage.getItem("userEmail");
      try {
        const response = await axios.get(url);
        const userData = response.data[0];
        console.log(userData);
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setEmail(userData.email);
        setPassword(userData.password);
        setRoleName(userData.role.roleName);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="user_container">
      <section style={{ backgroundColor: "rgb(129, 161, 190)" }}>
        <MDBContainer className="py-5">
          <MDBRow>
            <MDBCol lg="4">
              <MDBCard className="mb-4 userProfileImage">
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: "150px" }}
                    fluid
                  />
                  {/* <p className="text-muted mb-1">Full Stack Developer</p>
                <p className="text-muted mb-4">Bay Area, San Francisco, CA</p> */}
                  {/* <div className="d-flex justify-content-center mb-2">
                  <MDBBtn>Follow</MDBBtn>
                  <MDBBtn outline className="ms-1">Message</MDBBtn>
                </div> */}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            <MDBCol lg="8">
              <MDBCard className="mb-4 userInfo">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>First Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {firstName}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Last Name </MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {lastName}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{email}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  {/* <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Password</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">123456789</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr /> */}
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Role</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {roleName}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </div>
  );
}

// import React from 'react';
// import {useState,useEffect} from "react";
// import "./UserProfile.css";
// import axios from "axios";
// import {
//   MDBCol,
//   MDBContainer,
//   MDBRow,
//   MDBCard,
//   MDBCardText,
//   MDBCardBody,
//   MDBCardImage,
//   MDBBtn,
//   MDBBreadcrumb,
//   MDBBreadcrumbItem,
//   MDBProgress,
//   MDBProgressBar,
//   MDBIcon,
//   MDBListGroup,
//   MDBListGroupItem
// } from 'mdb-react-ui-kit';

// export default function UserProfile() {

//   const[firstName,setFirstName]=useState("");
//   const[lastName,setLastName]=useState("");
//   const[email,setEmail]=useState("");
//   const [password, setPassword] = useState("");
//   const [roleName, setRoleName] = useState("");

//   const tempEmail = localStorage.getItem('userEmail')
//   console.log(tempEmail)

//   useEffect(() => {
//     const fetchUserData = async () => {

//       const userEmail = localStorage.getItem('userEmail');
//       const adminEmail = localStorage.getItem('adminEmail');
//       const url = adminEmail
//         ? `http://localhost:8200/users/getByEmail/${adminEmail}`
//         : `http://localhost:8200/users/getByEmail/${userEmail}`;
//     // const tempEmail = localStorage.getItem('userEmail')
//     console.log("User data as: ")
//     // const url = "http://localhost:8200/users/getByEmail/"+localStorage.getItem('userEmail')
//       try {
//         const response = await axios.get(url);
//         const userData = response.data[0];
//         console.log(userData)
//         setFirstName(userData.firstName);
//         setLastName(userData.lastName);
//         setEmail(userData.email);
//         setPassword(userData.password);
//         setRoleName(userData.role.roleName);

//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchUserData();
//   }, []);

//   return (
//   <div className="container">
//     <section style={{ backgroundColor: 'rgb(129, 161, 190)' }}>
//       <MDBContainer className="py-5">
//         <MDBRow>
//           <MDBCol lg="4">
//             <MDBCard className="mb-4">
//               <MDBCardBody className="text-center">
//                 <MDBCardImage
//                   src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
//                   alt="avatar"
//                   className="rounded-circle"
//                   style={{ width: '150px' }}
//                   fluid />
//                 {/* <p className="text-muted mb-1">Full Stack Developer</p>
//                 <p className="text-muted mb-4">Bay Area, San Francisco, CA</p> */}
//                 {/* <div className="d-flex justify-content-center mb-2">
//                   <MDBBtn>Follow</MDBBtn>
//                   <MDBBtn outline className="ms-1">Message</MDBBtn>
//                 </div> */}
//               </MDBCardBody>
//             </MDBCard>
//           </MDBCol>

//           <MDBCol lg="8">
//             <MDBCard className="mb-4">
//               <MDBCardBody>
//                 <MDBRow>
//                   <MDBCol sm="3">
//                     <MDBCardText>First Name</MDBCardText>
//                   </MDBCol>
//                   <MDBCol sm="9">
//                     <MDBCardText className="text-muted">{firstName}</MDBCardText>
//                   </MDBCol>
//                 </MDBRow>
//                 <hr />
//                 <MDBRow>
//                   <MDBCol sm="3">
//                     <MDBCardText>Last Name </MDBCardText>
//                   </MDBCol>
//                   <MDBCol sm="9">
//                     <MDBCardText className="text-muted">{lastName}</MDBCardText>
//                   </MDBCol>
//                 </MDBRow>
//                 <hr />
//                 <MDBRow>
//                   <MDBCol sm="3">
//                     <MDBCardText>Email</MDBCardText>
//                   </MDBCol>
//                   <MDBCol sm="9">
//                     <MDBCardText className="text-muted">{email}</MDBCardText>
//                   </MDBCol>
//                 </MDBRow>
//                 <hr />
//                 {/* <MDBRow>
//                   <MDBCol sm="3">
//                     <MDBCardText>Password</MDBCardText>
//                   </MDBCol>
//                   <MDBCol sm="9">
//                     <MDBCardText className="text-muted">123456789</MDBCardText>
//                   </MDBCol>
//                 </MDBRow>
//                 <hr /> */}
//                 <MDBRow>
//                   <MDBCol sm="3">
//                     <MDBCardText>Role</MDBCardText>
//                   </MDBCol>
//                   <MDBCol sm="9">
//                     <MDBCardText className="text-muted">{roleName}</MDBCardText>
//                   </MDBCol>
//                 </MDBRow>
//               </MDBCardBody>
//             </MDBCard>
//           </MDBCol>
//         </MDBRow>
//       </MDBContainer>
//     </section>
//   </div>

//   );
// }
