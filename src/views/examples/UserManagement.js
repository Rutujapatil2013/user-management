import React, { useState, useEffect } from 'react';
import './UserManagement.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { Link , useNavigate} from 'react-router-dom';
import axios from "axios";

// const handleSubmit = (e) => {
//   e.preventDefault();
//   console.log('submitting the form');
//   // Rest of the code for handling form submission and axios POST request
// };

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
  const [deleted, setDeleted] = useState(false);
  const [roleId, setRoleId] = useState(0);
  const [id, setId] = useState(0);
  // const [message, setMessage] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyId, setCompanyId] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [emailId, setEmailId] = useState("");
  // const [address, setAddress] = useState("");
  const [options, setOptions] = useState([])

  
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
    id:''
  });


  useEffect(()=>{
    const url = "http://localhost:8200/companies";
    axios.get(url)
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
    // const url = "http://localhost:8200/companies/"+"companyId"
    // axios.get(url)
  },[])


  useEffect(() => {
    const url = 'http://localhost:8200/companies/' + localStorage.getItem('companyId');
    axios
      .get(url)
      .then((response) => {
        console.log('we got the users data as');
        const allUsersGot = response.data.users;
        const updatedUsers = allUsersGot.map((item) => ({
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
  }, []);
  
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

  const updateUser = (gotUser) => {
    console.log("Updating user...", gotUser);

    // console.log(user)
    // const url = "http://localhost:8200/users/getByEmail/"+email;

    // axios.get(url)
    //   .then(response => {
    //     const userData = response.data[0]
    //     const userId = userData['userId']
    //     // console.log("the response is here",userData);
    //     setFirstName(userData['firstName'])
    //     setLastName(userData['lastName'])
    //     setEmail(userData['email'])
    //     setPassword(userData['password'])
    //     setRoleName(userData['roleName'])
    //     setId(userId)
    //     formData['userId'] = userId
    //     formData['firstName'] = firstName
    //     formData['lastName'] = lastName
    //     formData['email'] = email
    //     formData['password'] = userData['password']
    //     formData['role']['roleName'] = roleName
    //     console.log('formdata -------',formData)
    //     console.log("userId--------", id)

    //     const updateUrl = "http://localhost:8200/users/update/"+userId
    //     console.log("the updatedurl is : ",updateUrl)
        
    //     axios.put(updateUrl, formData)
    //     .then(response => {
    //       console.log(response.data);
    //       console.log("the details are updated")
    //       // Perform further actions if needed
    //     })
    //     .catch(error => {
    //       console.error("error has occured",error); // Handle any errors that occur during the request
    //     });

    //     // Perform further actions if needed
    //   })
    //   .catch(error => {
    //     console.error(error); // Handle any errors that occur during the request
    //   });

    // setUsers(
    //   users.map((user) => (user === editingUser ? { ...editingUser } : user)));
    //   setEditingUser(null);
     

    setUsers(
      users.map((user) => {
      if(user === editingUser){
         console.log("user is getting edited___----------",user)
         const updateData = {
          "userId":user.id,
          "firstName":user.firstName,
          "lastName":user.lastName,
          "email":user.email,
          "password":user.password,
          "verificaitonEnabled":false,
          "role":{
            "roleId":0,
            "roleName":user.role
          },
          deleted,
          "company":{
            "companyId":user.companyId
          }
        }
        console.log("updated data",updateData)
         const updateUrl = "http://localhost:8200/users/update/"+user.id
         axios.put(updateUrl, updateData).then(response =>{
          console.log("we got updated response as ",response)
         }).catch(error =>{
          console.error(error)
         })
      }})
    );
    setEditingUser(null);
  };


  const deleteUser = (user) => {
    if (window.confirm('Do you really want to delete this user?')) {
      setUsers(users.filter((u) => u !== user));
    }
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
    console.log("the state is here in the user maanagement *****************************************")
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
          console.log(item.roleId, item.roleName)
          formData['role']['roleId'] = item.roleId

          setRoleId(item.roleId)
          
        }
      })
    }).catch(error=>{
      console.error(error)
    })

    
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
            console.log(usr.email)
            if(usr.email===tempEmail && flag===false){

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
                  alert("User added successfully")
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
                    <button onClick={updateUser(editingUser)}>Save</button>
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
    </div>
  );
};

export default UserManagement;

// ---------------------------------------------------------------------------------------------------

// // import React, { useState } from 'react';
// // import './UserManagement.css';
// // import { FaEdit, FaTrash } from 'react-icons/fa';
// // import { useLocation } from 'react-router-dom';
// // import { Link, useNavigate } from 'react-router-dom';
// // import axios from 'axios';

// // const UserManagement = () => {
// //   const [users, setUsers] = useState([]);
// //   const [editingUser, setEditingUser] = useState(null);
// //   const [showAddModal, setShowAddModal] = useState(false);

// //   const [newUser, setNewUser] = useState({
// //     firstName: '',
// //     lastName: '',
// //     email: '',
// //     password: '',
// //     role: '',
// //   });

// //   const location = useLocation();
// //   const navigate = useNavigate();

// //   const handleInputChange = (e) => {
// //     setNewUser({ ...newUser, [e.target.name]: e.target.value });
// //   };

// //   const addUser = () => {
// //     // Make a POST request to the backend API
// //     axios
// //       .post("http://localhost:8200/adduser/post", newUser) // Replace with your backend API endpoint
// //       .then((response) => {
// //         console.log(response.data);
// //         setUsers([...users, response.data]); // Add the new user returned by the API to the local state
// //         setNewUser({
// //           firstName: '',
// //           lastName: '',
// //           email: '',
// //           password: '',
// //           role: '',
// //         });
// //         setShowAddModal(false);
// //       })
// //       .catch((error) => {
// //         console.error(error);
// //         // Handle error scenarios
// //       });
// //   };

// //   const editUser = (user) => {
// //     setEditingUser(user);
// //   };

// //   const updateUser = () => {
// //     setUsers(
// //       users.map((user) => (user === editingUser ? { ...editingUser } : user))
// //     );
// //     setEditingUser(null);
// //   };

// //   const deleteUser = (user) => {
// //     if (window.confirm('Do you really want to delete this user?')) {
// //       setUsers(users.filter((u) => u !== user));
// //     }
// //   };

// //   return (
// //     <div className="editable-table-container">
// //       <h2>User Management Table</h2>
// //       <table>
// //         <thead>
// //           <tr>
// //             <th>First Name</th>
// //             <th>Last Name</th>
// //             <th>Email</th>
// //             <th>Password</th>
// //             <th>Role</th>
// //             <th>Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {users.map((user) => (
// //             <tr key={user.email}>
// //               <td>{user.firstName}</td>
// //               <td>{user.lastName}</td>
// //               <td>{user.email}</td>
// //               <td>{user.password}</td>
// //               <td>{user.role}</td>
// //               <td>
// //                 <button className="edit-button" onClick={() => editUser(user)}>
// //                   <FaEdit />
// //                 </button>
// //                 <br />
// //                 <br />
// //                 <button className="delete-button" onClick={() => deleteUser(user)}>
// //                   <FaTrash />
// //                 </button>
// //               </td>
// //             </tr>
// //           ))}
// //           {editingUser && (
// //             <tr>
// //               <td colSpan="6">
// //                 <div className="edit-modal">
// //                   <div className="edit-modal-content">
// //                     <h3>Edit User</h3>
// //                     <input
// //                       type="text"
// //                       name="firstName"
// //                       value={editingUser.firstName}
// //                       onChange={(e) =>
// //                         setEditingUser({
// //                           ...editingUser,
// //                           firstName: e.target.value,
// //                         })
// //                       }
// //                     />
// //                     <input
// //                       type="text"
// //                       name="lastName"
// //                       value={editingUser.lastName}
// //                       onChange={(e) =>
// //                         setEditingUser({
// //                           ...editingUser,
// //                           lastName: e.target.value,
// //                         })
// //                       }
// //                     />
// //                     <input
// //                       type="email"
// //                       name="email"
// //                       value={editingUser.email}
// //                       onChange={(e) =>
// //                         setEditingUser({
// //                           ...editingUser,
// //                           email: e.target.value,
// //                         })
// //                       }
// //                     />
// //                     <input
// //                       type="password"
// //                       name="password"
// //                       value={editingUser.password}
// //                       onChange={(e) =>
// //                         setEditingUser({
// //                           ...editingUser,
// //                           password: e.target.value,
// //                         })
// //                       }
// //                     />
// //                     <input
// //                       type="text"
// //                       name="role"
// //                       value={editingUser.role}
// //                       onChange={(e) =>
// //                         setEditingUser({ ...editingUser, role: e.target.value })
// //                       }
// //                     />
// //                     <button onClick={updateUser}>Save</button>
// //                   </div>
// //                 </div>
// //               </td>
// //             </tr>
// //           )}
// //           <tr>
// //             <td colSpan="6">
// //               <button className="add-button" onClick={() => setShowAddModal(true)}>
// //                 Add User
// //               </button>
// //             </td>
// //           </tr>
// //         </tbody>
// //       </table>
// //       {showAddModal && (
// //         <div className="edit-modal">
// //           <div className="edit-modal-content">
// //             <h3>Add User</h3>
// //             <input
// //               type="text"
// //               name="firstName"
// //               placeholder="First Name"
// //               value={newUser.firstName}
// //               onChange={handleInputChange}
// //             />
// //             <input
// //               type="text"
// //               name="lastName"
// //               placeholder="Last Name"
// //               value={newUser.lastName}
// //               onChange={handleInputChange}
// //             />
// //             <input
// //               type="email"
// //               name="email"
// //               placeholder="Email"
// //               value={newUser.email}
// //               onChange={handleInputChange}
// //             />
// //             <input
// //               type="password"
// //               name="password"
// //               placeholder="Password"
// //               value={newUser.password}
// //               onChange={handleInputChange}
// //             />
// //             <input
// //               type="text"
// //               name="role"
// //               placeholder="Role"
// //               value={newUser.role}
// //               onChange={handleInputChange}
// //             />
// //             <button onClick={addUser}>Add</button>
// //             <button onClick={() => setShowAddModal(false)}>Cancel</button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default UserManagement;

// ___________________________________________________________________________________________________________

