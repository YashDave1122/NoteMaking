import React, { useState, useEffect } from 'react';
import Popup from './Popup';
import './Card.css';

const Card = ({ id, title, description, mediaLink, timestamp, onDelete }) => {
  // Retrieve the last selected background color from localStorage, default to white
  const savedBackgroundColor = localStorage.getItem(`backgroundColor-${id}`) || '#ffffff';
  const [showPopup, setShowPopup] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(savedBackgroundColor);

  useEffect(() => {
    // Save the selected background color to localStorage when it changes
    localStorage.setItem(`backgroundColor-${id}`, backgroundColor);
  }, [id, backgroundColor]);

  const handleDelete = () => {
    const existingCards = JSON.parse(localStorage.getItem('Notes')) || [];
    const updatedCards = existingCards.filter((card) => card.id !== id);
    localStorage.setItem('Notes', JSON.stringify(updatedCards));
    window.location.reload(); // Refresh the page to reflect the updated list (optional)
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const formattedTimestamp = new Date(timestamp).toLocaleString();

  return (
    <div className='Card' style={{ backgroundColor }}>
      <div className="card-header">
        <h3>{title}</h3>
        <p className="timestamp">Created: {formattedTimestamp}</p>
      </div>
      {description && (
        <div dangerouslySetInnerHTML={{ __html: description }} />
      )}
      {mediaLink && <img src={mediaLink} alt="Media" />}
      <button onClick={togglePopup} className="view-button">
        View Details
      </button>

      {showPopup && (
        <Popup
          title={title}
          description={description}
          mediaLink={mediaLink}
          onClose={togglePopup}
        />
      )}

      <button onClick={handleDelete} className="delete-button">
        Delete
      </button>

      <div className="color-palette">
        <label>Select Background Color:</label>
        <input
          type="color"
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Card;
