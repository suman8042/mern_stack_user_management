import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './UserForm';
import UserList from './UserList';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userBeingEdited, setUserBeingEdited] = useState(null);  // State to track the user being edited

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
      setError('');  // Clear any previous error
    } catch (error) {
      setError('Error fetching users: ' + error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (user) => {
    setLoading(true);
    try {
      if (userBeingEdited) {
        // If userBeingEdited is set, update the user
        const response = await axios.put(`http://localhost:5000/api/users/${userBeingEdited._id}`, user);
        setUsers((prevUsers) => prevUsers.map((u) => (u._id === userBeingEdited._id ? response.data : u)));
        setUserBeingEdited(null);  // Reset the edit state after update
      } else {
        // Otherwise, add a new user
        const response = await axios.post('http://localhost:5000/api/users', user);
        setUsers((prevUsers) => [...prevUsers, response.data]);
      }
      setError('');  // Clear any previous error
    } catch (error) {
      setError('Error adding or updating user: ' + error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const editUser = (user) => {
    setUserBeingEdited(user);  // Set the user to be edited in state
  };

  const deleteUser = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      setError('');  // Clear any previous error
    } catch (error) {
      setError('Error deleting user: ' + error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>User Management</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <UserForm addUser={addUser} userBeingEdited={userBeingEdited} />
      <UserList users={users} editUser={editUser} deleteUser={deleteUser} />
    </div>
  );
};

export default App;
