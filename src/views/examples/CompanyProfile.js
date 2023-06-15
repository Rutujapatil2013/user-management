import React, { useState, useEffect } from 'react';
import axios from "axios";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody
} from 'mdb-react-ui-kit';

export default function CompanyProfile() {
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const url = "http://localhost:8200/companies";
      try {
        const response = await axios.get(url);
        const allCompanies = response.data;
        const tempEmail = localStorage.getItem('adminEmail');
        let flag = false;

        allCompanies.forEach((item) => {
          const userList = item.users;
          if (flag === false) {
            userList.forEach((usr) => {
              if (usr.email === tempEmail && flag === false) {
                console.log(usr)
                localStorage.setItem("companyId", item.companyId);
                console.log("the companyid we get is here",localStorage.getItem("companyId"));
              }
            });
          }
        });
        setEmail(tempEmail);
        setPassword('');
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCompanyData = async () => {
      const companyId = localStorage.getItem("companyId");
      const url = "http://localhost:8200/companies/"+localStorage.getItem("companyId")
      try {
        const response = await axios.get(url);
        // const companyData = response.data.company;
        const companyData = response.data;
        console.log(companyData)
        setCompanyName(companyData.companyName);
        setCompanyEmail(companyData.emailId);
        setPhoneNumber(companyData.phoneNumber);
        setAddress(companyData.address);

      } catch (error) {
        console.error(error);
      }
    };

    fetchCompanyData();
  }, [email,password]);

  return (
    <div className="container">
      <section style={{ backgroundColor: 'rgb(129, 161, 190)' }}>
        <MDBContainer className="py-5">
          <MDBRow>
            <MDBCol lg="8">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Company Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{companyName}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Company Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{companyEmail}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Phone Number</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{phoneNumber}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Address</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{address}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </div>
  );
}









