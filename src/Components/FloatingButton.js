import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import PopupForm from './PopupForm';

const FloatingButton = ({ onAddCard }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (formData) => {
    // Call the onAddCard function passed as prop with form data
    onAddCard(formData);

    // Close the popup after form submission
    setShowPopup(false);
  };

  return (
    <>
      {/* Conditionally render the popup form when showPopup is true */}
      {showPopup && <PopupForm onSubmit={handleSubmit} onClose={() => setShowPopup(false)} />}

      {/* Floating action button */}
      <button
        className="floating-button"
        onClick={() => setShowPopup(true)}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: '50%',
          backgroundColor: '#007bff',
          color: '#ffffff',
          border: 'none',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 24,
        }}
      >
        <FiPlus />
      </button>
    </>
  );
};

export default FloatingButton;
