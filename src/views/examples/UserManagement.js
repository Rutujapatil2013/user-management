
import React, { useState, useEffect } from 'react';
import './UserManagement.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { Link , useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [adminuserEmail, setAdminuserEmail] = useState("")
  const [editingUser, setEditingUser] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleName, setRoleName] = useState("");
  const [deleted, setDeleted] = useState("false");
  const [roleId, setRoleId] = useState(0);
  const [id, setId] = useState(0);
  const [companyName, setCompanyName] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [options, setOptions] = useState([])

  
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
    id:''
  });

    useEffect(() => {
    const fetchCompanyData = async () => {
      const compId = localStorage.getItem('companyId');
      if (compId !== null) {
        const url = 'http://localhost:8200/companies/' + compId;
        axios
          .get(url)
          .then((response) => {
            const allUsersGot = response.data.users;
            const updatedUsers = allUsersGot
              .filter((item) => !item.deleted) // Filter out deleted users
              .map((item) => ({
                firstName: item.firstName,
                lastName: item.lastName,
                email: item.email,
                password: item.password,
                role: item.role.roleName,
                id: item.userId,
              }));
    
            setUsers(updatedUsers);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        // window.location.reload();
      }
    };
    fetchCompanyData();
    },[users]);
  
  const pressed = ()=>{
    console.log("button pressed")
  }
  
  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const addUser = () => {
    setUsers([...users, newUser]);
    setNewUser({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: '',
      id:''
    });
    setShowAddModal(false);
  };

  const editUser = (user) => {
    console.log("this user is getting updated", user)
    setEditingUser(user);
  };

  const updateUserDetails = (e,gotUser) => {
    e.preventDefault();
    console.log("Updating user...", gotUser);
    const url = "http://localhost:8200/users/getById/"+gotUser.id;
    axios.get(url).then(response=>{
      console.log("User data",response.data)
      const updatingData = {
          "userId":gotUser.id,
          "firstName":gotUser.firstName,
          "lastName":gotUser.lastName,
          "email":gotUser.email,
          "password":response.data.password,
          "verificationEnabled":false,
          "deleted":false,
          "role":{
            "roleId":0,
            "roleName":gotUser.role
          },
          "company":{
            "companyId":localStorage.getItem("companyId")
          }
        }
        console.log("final data for update",updatingData)
        const api = "http://localhost:8200/users/update/"+gotUser.id
        axios.put(api,updatingData).then(response=>{
          console.log("we got updated data as", response.data)
          toast.success("User updated successfully")
          setEditingUser(null);
        }).catch(error=>{
          console.error(error)
        })
    }).catch(error=>{
      console.error(error)
    })
    
  };


  const deleteUser = (user) => {
    const url = "http://localhost:8200/users/delete/" + user.id;
    axios
      .delete(url)
      .then((response) => {
        console.log("User deleted successfully");
        toast.success("User deleted successfully");
        // Remove the deleted user from the frontend list
        setUsers(users.filter((u) => u.id !== user.id));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };
  


  useEffect( () => {

    // Fetch data from the API
     axios.get("http://localhost:8200/roles/getall")
      .then(response => {
        // Update the options state with the data
        setOptions(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  const navigate = useNavigate();
  
  const handleSubmit= async(e)=>{
    e.preventDefault();
    console.log("the state is here in the user management *****************************************")
    const tempEmail = localStorage.getItem('adminEmail')
    console.log("-----------------------------the local storage value of email is", tempEmail);
      // setAdminuserEmail(temp)
    console.log("Adding the user")

  
    const formData = {
      firstName,
      lastName,
      email,
      password,
      "verificaitonEnabled":false,
      "role":{
        "roleId":roleId,
        "roleName":roleName
      },
      deleted,
      "company": {
        "companyId": companyId,
        "companyName": companyName,
        "phoneNumber": "string",
        "emailId": "string",
        "address": "string",
        "isDeleted": true,
        "users": [
          "string"
        ],
        "present": true,
        "roleId": [
          {
            "roleId": 0,
            "roleName": "string"
          }
        ]
      },
    }
    axios.get("http://localhost:8200/roles/getall").then(response=>{

      console.log("______________________________________________________________got the api call to get the data for the list of roles")
      response.data.forEach((item)=>{
        // console.log(roleName)
        
        if(item.roleName===roleName){
          // console.log(item.roleId, item.roleName)
          formData['role']['roleId'] = item.roleId

          setRoleId(item.roleId)
          
        }
      })
    }).catch(error=>{
      console.error(error)
    })
    console.log("we are here")
    
    const url = "http://localhost:8200/companies";
    await axios.get(url)
      .then(response=>{
        const allCompanies = response.data;
        // company.user.email
        // console.log("got the response as -> ", allCompanies)
        var flag=false;
        allCompanies.forEach((item) => {
          const userList = item.users
          if(flag===false){
            
          userList.forEach((usr) =>{
            // console.log(usr.email)
            if(usr.email===tempEmail && flag===false){
              console.log("email found")
              formData['company']['companyId'] = item.companyId
              // localStorage.setItem('companyId', item.companyId)
              formData['company']['companyName'] = item.companyName
              // formData['role']['roleId'] = roleId
              console.log("final formdata",formData)
              axios.post("http://localhost:8200/adduser/post", formData)
                .then(response => {
                  newUser.firstName = firstName
                  newUser.lastName = lastName
                  newUser.email = email
                  // newUser.password = password
                  newUser.role = roleName

                  

                  console.log("we got response", response.data);
                  newUser.id = response.data.userId

                  setUsers([...users, newUser]); // Add the new user returned by the API to the local state
                  
                  setNewUser({
                    firstName: '',
                    lastName: '',
                    email: '',
                    // password: '',
                    role: '',
                    id:''
                  });
                  setShowAddModal(false);
                  // alert("User added successfully")
                  toast.success("User added successfully")
                  console.log("user added successfully")
                  // Perform further actions if needed
                })
                .catch(error => {
                  console.log("failed to add user")
                  console.error(error); // Handle any errors that occur during the request
                });
              setCompanyName(item.companyName)
              setCompanyId(item.companyId)
              console.log("email found", item)
              flag = true;
            }
          })
        }
          // console.log(" ")
        });
      }).catch(error=>{
        console.error(error);
      })

      
      console.log(formData)
    }
  
    
  // Make a POST request to the backend API
  // axios.post("http://localhost:8200/adduser/post", formData)
  //   .then(response => {
  //     console.log(response.data)
  //   });
  // };


  return (
    <div className="editable-table-container">
      <h2>User Management Table</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            {/* <th>Password</th> */}
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
            
          {users.map((user) => (
            <tr key={user.email}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              {/* <td>{user.password}</td> */}
              <td>{user.role}</td>
              <td>
                <button className="edit-button" onClick={() => editUser(user)}>
                  <FaEdit />
                </button>
                <br />
                <br />
                <button className="delete-button" onClick={() => deleteUser(user)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
          {editingUser && (
            <tr>
              <td colSpan="6">
                <div className="edit-modal">
                  <div className="edit-modal-content">
                    <h3>Edit User</h3>
                    <input
                      type="text"
                      name="firstName"
                      value={editingUser.firstName}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          firstName: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={editingUser.lastName}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          lastName: e.target.value,
                        })
                      }
                    />
                    <input
                      type="email"
                      name="email"
                      value={editingUser.email}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          email: e.target.value,
                        })
                      }
                    />
                    {/* <input
                      type="password"
                      name="password"
                      value={editingUser.password}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          password: e.target.value,
                        })
                      }
                    /> */}
                    <input
                      type="text"
                      name="role"
                      value={editingUser.role}
                      onChange={(e) =>
                        setEditingUser({ ...editingUser, role: e.target.value })
                      }
                    />
                    {/* <button onClick={pressed}>Save</button> */}
                    <button onClick={(e)=>{updateUserDetails(e,editingUser)}}>Save</button>
                  </div>
                </div>
              </td>
            </tr>
          )}
          <tr>
            <td colSpan="6">
              <button className="add-button" onClick={() => setShowAddModal(true)}>
                Add User
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {showAddModal && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h3>Add User</h3>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={firstName}
              // onChange={handleInputChange}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              // value={newUser.lastName}
              // onChange={handleInputChange}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              // value={newUser.email}
              // onChange={handleInputChange}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              // value={newUser.password}
              // onChange={handleInputChange}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
          />
            {/* <input
              type="text"
              name="role"
              placeholder="Role"
              // value={newUser.role}
              // onChange={handleInputChange}
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              required
            /> */}
            <div>
          <select id="role" value={roleName} onChange={(e) => setRoleName(e.target.value)} required>
          {options.map(option => (
          <option key={option.id} value={option.id}>{option.roleName}</option>
            
        ))}
          </select>
        </div>
            <button type="submit" onClick={handleSubmit} >Add</button>
            <button onClick={() => setShowAddModal(false)}>Cancel</button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default UserManagement;