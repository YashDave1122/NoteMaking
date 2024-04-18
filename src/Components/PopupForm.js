import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './popup.css';
import CustomToolbar from './CustomToolbar'; // Import CustomToolbar component

const PopupForm = ({ onSubmit, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mediaFile, setMediaFile] = useState(null);

  const handleSubmit = () => {
    const mediaLink = mediaFile ? URL.createObjectURL(mediaFile) : '';
    onSubmit({ title, description, mediaLink });
    setTitle('');
    setDescription('');
    setMediaFile(null);
    onClose();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMediaFile(file);
    }
  };

  return (
    <div className="popup-form-container">
      <div className="popup-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        {/* Use ReactQuill with custom toolbar */}
        <ReactQuill
          theme="snow"
          placeholder="Description"
          value={description}
          onChange={setDescription}
          modules={{
            toolbar: {
              container: "#toolbar", // Specify toolbar container
            },
          }}
        />
        
        {/* Render custom toolbar outside ReactQuill */}
        <CustomToolbar />
        
        {/* File Input for Media Upload */}
        <div className="media-upload">
          <input
            type="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
          />
        </div>
        
        {/* Display Preview of Uploaded Media */}
        {mediaFile && (
          <div className="media-preview">
            {mediaFile.type.startsWith('image/') ? (
              <img src={URL.createObjectURL(mediaFile)} alt="Uploaded Media" />
            ) : mediaFile.type.startsWith('video/') ? (
              <video controls>
                <source src={URL.createObjectURL(mediaFile)} type={mediaFile.type} />
                Your browser does not support the video tag.
              </video>
            ) : (
              <p>Unsupported media type</p>
            )}
          </div>
        )}
        
        <button onClick={handleSubmit}>Add Card</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default PopupForm;
