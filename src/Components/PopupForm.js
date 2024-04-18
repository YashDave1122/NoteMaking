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

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const resizedFile = await resizeImage(file);
        setMediaFile(resizedFile);
      } catch (error) {
        console.error('Error resizing image:', error);
      }
    }
  };

  const resizeImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const MAX_WIDTH = 400;
          const MAX_HEIGHT = 300;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob((blob) => {
            resolve(new File([blob], file.name, { type: 'image/jpeg', lastModified: Date.now() }));
          }, 'image/jpeg', 0.7); // Adjust JPEG quality as needed (0.7 is 70% quality)
        };
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
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

        <ReactQuill
          theme="snow"
          placeholder="Description"
          value={description}
          onChange={setDescription}
          modules={{
            toolbar: {
              container: "#toolbar",
            },
          }}
        />

        <CustomToolbar />

        <div className="media-upload">
          <input
            type="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
          />
        </div>

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
