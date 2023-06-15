import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";

const AdminNavbar = (props) => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [defaultRole, setDefaultRole] = useState("")
  useEffect(()=>{
      const url = "http://localhost:8200/users/getByEmail/"+localStorage.getItem('userEmail')
    axios.get(url).then(response=>{
      console.log("we are fetching the data")
      setFirstName(response.data[0].firstName)
      setLastName(response.data[0].lastName)
      setDefaultRole(localStorage.getItem("defaultRole"))

      
        const newUrl = "http://localhost:8200/companies";
        axios.get(newUrl)
          .then(response=>{
            const allCompanies = response.data;
            const tempEmail = localStorage.getItem('adminEmail')
            var flag = false;
            allCompanies.forEach((item)=>{
              const userList = item.users
              if(flag===false){
                userList.forEach((usr)=>{
                  if(usr.email===tempEmail && flag===false){
                    localStorage.setItem("companyId",item.companyId)
                    console.log(localStorage.getItem("companyId"))
                  }
                })
              }
            })
          }).catch(error=>{
            console.error(error)
          })
    
    }).catch(error=>{
      console.error(error)
    })
  },[firstName])
  
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            {props.brandText}
          </Link>
          <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <FormGroup className="mb-0">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search" type="text" />
              </InputGroup>
            </FormGroup>
          </Form>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={require("../../assets/img/theme/team-4-800x800.jpg")}
                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                     {firstName} {lastName}
                    </span>
                    {/* <p>{defaultRole}</p> */}
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                {/* <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem> */}
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-settings-gear-65" />
                  <span>Settings</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-calendar-grid-58" />
                  <span>Activity</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-support-16" />
                  <span>Support</span>
                </DropdownItem>
                <DropdownItem divider />
                {/* <DropdownItem to="/auth/login" href="#pablo" onClick={(e) => e.preventDefault()}> */}
                <DropdownItem to="/auth/login" href="#pablo" tag={Link}>
                  <i className="ni ni-user-run" />
                  <span onClick={()=>{console.clear();localStorage.clear();}}>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;


// import { Link } from "react-router-dom";
// // reactstrap components
// import {
//   DropdownMenu,
//   DropdownItem,
//   UncontrolledDropdown,
//   DropdownToggle,
//   Form,
//   FormGroup,
//   InputGroupAddon,
//   InputGroupText,
//   Input,
//   InputGroup,
//   Navbar,
//   Nav,
//   Container,
//   Media,
// } from "reactstrap";

// const AdminNavbar = (props) => {
//   return (
//     <>
//       <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
//         <Container fluid>
//           <Link
//             className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
//             to="/"
//           >
//             {props.brandText}
//           </Link>
//           <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
//             <FormGroup className="mb-0">
//               <InputGroup className="input-group-alternative">
//                 <InputGroupAddon addonType="prepend">
//                   <InputGroupText>
//                     <i className="fas fa-search" />
//                   </InputGroupText>
//                 </InputGroupAddon>
//                 <Input placeholder="Search" type="text" />
//               </InputGroup>
//             </FormGroup>
//           </Form>
//           <Nav className="align-items-center d-none d-md-flex" navbar>
//             <UncontrolledDropdown nav>
//               <DropdownToggle className="pr-0" nav>
//                 <Media className="align-items-center">
//                   <span className="avatar avatar-sm rounded-circle">
//                     <img
//                       alt="..."
//                       src={require("../../assets/img/theme/team-4-800x800.jpg")}
//                     />
//                   </span>
//                   <Media className="ml-2 d-none d-lg-block">
//                     <span className="mb-0 text-sm font-weight-bold">
//                       Jessica Jones
//                     </span>
//                   </Media>
//                 </Media>
//               </DropdownToggle>
//               <DropdownMenu className="dropdown-menu-arrow" right>
//                 <DropdownItem className="noti-title" header tag="div">
//                   <h6 className="text-overflow m-0">Welcome!</h6>
//                 </DropdownItem>
//                 <DropdownItem to="/admin/user-profile" tag={Link}>
//                   <i className="ni ni-single-02" />
//                   <span>My profile</span>
//                 </DropdownItem>
//                 <DropdownItem to="/admin/user-profile" tag={Link}>
//                   <i className="ni ni-settings-gear-65" />
//                   <span>Settings</span>
//                 </DropdownItem>
//                 <DropdownItem to="/admin/user-profile" tag={Link}>
//                   <i className="ni ni-calendar-grid-58" />
//                   <span>Activity</span>
//                 </DropdownItem>
//                 <DropdownItem to="/admin/user-profile" tag={Link}>
//                   <i className="ni ni-support-16" />
//                   <span>Support</span>
//                 </DropdownItem>
//                 <DropdownItem divider />
//                 {/* <DropdownItem to="/auth/login" href="#pablo" onClick={(e) => e.preventDefault()}> */}
//                 <DropdownItem to="/auth/login" href="#pablo" tag={Link}>
//                   <i className="ni ni-user-run" />
//                   <span>Logout</span>
//                 </DropdownItem>
//               </DropdownMenu>
//             </UncontrolledDropdown>
//           </Nav>
//         </Container>
//       </Navbar>
//     </>
//   );
// };

// export default AdminNavbar;
