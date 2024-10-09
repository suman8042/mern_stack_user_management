import React from 'react';
import './UserList.css'; // Import the CSS file for styling

const UserList = ({ users, editUser, deleteUser }) => {
  return (
    <div className="user-list-container">
      <ul className="user-list">
        {users.map((user) => (
          <li className="user-item" key={user._id}>
            <div className="user-info">
              <span>{user.firstName} {user.lastName}</span>
              <span>{user.email}</span>
              <span>{user.phoneNumber}</span>
              <span>{user.address}</span>
            </div>
            <div className="action-buttons">
              <button className="edit-btn" onClick={() => editUser(user)}>Edit</button>
              <button className="delete-btn" onClick={() => deleteUser(user._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
