
import Index from "views/Index.js";
import Maps from "views/examples/Maps.js";
import CompanyProfile from "views/examples/CompanyProfile";
import UserProfile from "views/examples/UserProfile";
import UserManagement from "./views/examples/UserManagement"; 
// import UserManagement from "views/examples/UserManagement"; 
// import CompanyAllusers from "views/examples/CompanyAllUsers"
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
// import Tables from "views/examples/Tables.js";
// import Icons from "views/examples/Icons.js";
// var compName = localStorage.getItem("companyName")
var routes = [
  {
    path: "/index",
    name: "dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: <Icons />,
  //   layout: "/admin",
  // },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: <Maps />,
    layout: "/admin",
  },
  {
    path: "/company-profile",
    name: "Company Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <CompanyProfile />,
    layout: "/admin",
  },
  {
    path: "/user-management",
    name: "User Management",
    icon: "ni ni-circle-08 text-pink",
    component: <UserManagement />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <UserProfile />,
    layout: "/admin",
  },
  // {
  //   path: "/companies-all-users",
  //   name: "Company All Users",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: <CompanyAllusers />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: <Tables />,
  //   layout: "/admin",
  // },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
  },
];
export default routes;
