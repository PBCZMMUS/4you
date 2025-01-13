// src/components/FileReader.js
import React, { useState } from 'react';
import './FileReader.css';

const FileReader = () => {
  const [fileUrl, setFileUrl] = useState('');
  const [fileType, setFileType] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileType(file.type);
      setFileUrl(URL.createObjectURL(file));
    }
  };

  const renderFilePreview = () => {
    if (fileType.includes('image')) {
      return <img src={fileUrl} alt="Uploaded file preview" />;
    } else if (fileType.includes('audio')) {
      return <audio controls><source src={fileUrl} type={fileType} /></audio>;
    } else if (fileType.includes('video')) {
      return <video controls><source src={fileUrl} type={fileType} /></video>;
    } else if (fileType === 'application/pdf') {
      return <iframe src={fileUrl} width="100%" height="500px" title="PDF Preview"></iframe>;
    } else {
      return <p>Unsupported file type</p>;
    }
  };

  return (
    <div className="file-reader">
      <h1>File Reader</h1>
      <input type="file" onChange={handleFileUpload} />
      {fileUrl && (
        <div className="file-preview">
          {renderFilePreview()}
        </div>
      )}
    </div>
  );
};

export default FileReader;