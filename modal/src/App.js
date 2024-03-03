import React, { useState } from 'react';

const XModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [errors, setErrors] = useState({});

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    if (!username) {
      newErrors.username = 'Please enter your username.';
    }

    if (!email) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email. Please check your email address.';
    }

    if (!phone) {
      newErrors.phone = 'Please enter your phone number.';
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = 'Invalid phone number. Please enter a 10-digit phone number.';
    }

    if (!dob) {
      newErrors.dob = 'Please enter your date of birth.';
    } else {
      const currentDate = new Date();
      const inputDate = new Date(dob);

      if (inputDate > currentDate) {
        newErrors.dob = 'Invalid date of birth. Please enter a valid date.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setIsOpen(false);
      setUsername('');
      setEmail('');
      setPhone('');
      setDob('');
    }
  };

  return (
    <div>
      <h1>User Details Modal</h1>
      <button onClick={openModal}>Open Form</button>
      {isOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <div className="error">{errors.username}</div>}

            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="error">{errors.email}</div>}

            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && <div className="error">{errors.phone}</div>}

            <label htmlFor="dob">Date of Birth:</label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
            {errors.dob && <div className="error">{errors.dob}</div>}

            <button className="submit-button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default XModal;
