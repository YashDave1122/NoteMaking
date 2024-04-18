import React from 'react';
import './Popupp.css';

const stripHtmlTags = (htmlString) => {
  // Create a temporary element to handle the HTML string
  const tempElement = document.createElement('div');
  tempElement.innerHTML = htmlString;
  // Return the text content (stripped of HTML tags)
  return tempElement.textContent || tempElement.innerText || '';
};

const Popup = ({ title, description, mediaLink, onClose }) => {
  // Strip HTML tags from description
  const sanitizedDescription = stripHtmlTags(description);

  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <h2>{title}</h2>
        <div>{sanitizedDescription}</div>
        {mediaLink && <img src={mediaLink} alt="Media" />}
      </div>
    </div>
  );
};

export default Popup;
