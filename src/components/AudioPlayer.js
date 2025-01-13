// src/components/AudioPlayer.js
import React, { useState } from 'react';
import './AudioPlayer.css';

const AudioPlayer = () => {
  const [audioUrl, setAudioUrl] = useState('');

  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="audio-player">
      <h1>Audio Player</h1>
      <input type="file" accept="audio/*" onChange={handleAudioUpload} />
      {audioUrl && <audio controls src={audioUrl}></audio>}
    </div>
  );
};

export default AudioPlayer;