import React, { useState, useEffect } from 'react';

const UserForm = ({ addUser, userBeingEdited }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    address: ''
  });

  useEffect(() => {
    if (userBeingEdited) {
      setFormData(userBeingEdited);  // Populate form with user's data when editing
    }
  }, [userBeingEdited]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(formData);  // Call the addUser function, whether adding or updating
    setFormData({ firstName: '', lastName: '', phoneNumber: '', email: '', address: '' });  // Reset form
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
      <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
      <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
      <button type="submit">{userBeingEdited ? 'Update User' : 'Add User'}</button>
    </form>
  );
};

export default UserForm;
