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


import React, { useState } from 'react';
import './UserManagement.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
  });

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
    });
    setShowAddModal(false);
  };

  const editUser = (user) => {
    setEditingUser(user);
  };

  const updateUser = () => {
    setUsers(
      users.map((user) => (user === editingUser ? { ...editingUser } : user))
    );
    setEditingUser(null);
  };

  const deleteUser = (user) => {
    if (window.confirm('Do you really want to delete this user?')) {
      setUsers(users.filter((u) => u !== user));
    }
  };

  return (
    <div className="editable-table-container">
      <h2>User Management Table</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Password</th>
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
              <td>{user.password}</td>
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
                    <input
                      type="password"
                      name="password"
                      value={editingUser.password}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          password: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      name="role"
                      value={editingUser.role}
                      onChange={(e) =>
                        setEditingUser({ ...editingUser, role: e.target.value })
                      }
                    />
                    <button onClick={updateUser}>Save</button>
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
              value={newUser.firstName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={newUser.lastName}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newUser.email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={newUser.password}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="role"
              placeholder="Role"
              value={newUser.role}
              onChange={handleInputChange}
            />
            <button onClick={addUser}>Add</button>
            <button onClick={() => setShowAddModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;



