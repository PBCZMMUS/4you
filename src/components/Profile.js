import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Import Firestore instance
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import "./Profile.css";

const Profile = ({ user }) => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    photo: "https://via.placeholder.com/150",
  });
  const [isEditingName, setIsEditingName] = useState(false);

  const [socialLinks, setSocialLinks] = useState([]);
  const [newSocialLink, setNewSocialLink] = useState("");
  const [socialLinkTitle, setSocialLinkTitle] = useState("");

  const [photos, setPhotos] = useState([]);
  const [deleteMode, setDeleteMode] = useState(false);
  const [expandedPhoto, setExpandedPhoto] = useState(null);

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchProfile = async () => {
      const email = localStorage.getItem('userEmail');
      if (!email) return;
  
      try {
        const docRef = doc(db, 'users', email);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setProfile({
            name: userData.name,
            photo: userData.photo,
          });
          setSocialLinks(userData.socialLinks || []);
          setPhotos(userData.photos || []);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
  
    fetchProfile();
  }, []);

  const saveProfile = async () => {
    const email = localStorage.getItem('userEmail');
    if (!email) return;
  
    try {
      const docRef = doc(db, 'users', email);
      await setDoc(docRef, {
        name: profile.name,
        photo: profile.photo,
        socialLinks,
        photos,
      });
    } catch (error) {
      console.error('Error saving profile data:', error);
    }
  };
  
  // Call `saveProfile` whenever profile, socialLinks, or photos change.
  useEffect(() => {
    saveProfile();
  }, [profile, socialLinks, photos]);
  const saveToFirestore = async (field, value) => {
    const userDoc = doc(db, "users", user.uid);
    await updateDoc(userDoc, { [field]: value });
  };

  const handleAddSocialLink = async () => {
    if (newSocialLink.trim()) {
      const newLink = {
        id: Date.now(),
        title: socialLinkTitle || newSocialLink.trim(),
        url: newSocialLink.trim(),
      };

      setSocialLinks((prev) => [...prev, newLink]);
      setNewSocialLink("");
      setSocialLinkTitle("");

      // Save to Firestore
      await saveToFirestore("socialLinks", [...socialLinks, newLink]);
    }
  };

  const handleDeleteSocialLink = async (id) => {
    const updatedLinks = socialLinks.filter((link) => link.id !== id);
    setSocialLinks(updatedLinks);

    // Update Firestore
    await saveToFirestore("socialLinks", updatedLinks);
  };

  const handleAddPhoto = async (event) => {
    const files = Array.from(event.target.files);
    const newPhotos = files.map((file) => ({
      id: Date.now() + Math.random(),
      url: URL.createObjectURL(file),
    }));

    const updatedPhotos = [...photos, ...newPhotos];
    setPhotos(updatedPhotos);

    // Save to Firestore
    await saveToFirestore("photos", updatedPhotos);
  };

  const handleDeleteSelectedPhotos = async () => {
    const updatedPhotos = photos.filter((photo) => !photo.selected);
    setPhotos(updatedPhotos);

    // Update Firestore
    await saveToFirestore("photos", updatedPhotos);

    setDeleteMode(false);
  };

  return (
    <div className="profile-container">
      {/* Profile Section */}
      <div className="profile-header">
        <div className="profile-image-container">
          <input
            id="upload-profile-picture"
            type="file"
            accept="image/*"
            onChange={(e) =>
              setProfile({
                ...profile,
                photo: URL.createObjectURL(e.target.files[0]),
              })
            }
            hidden
          />
        </div>
        <div className="profile-name">
          {isEditingName ? (
            <input
              type="text"
              value={profile.name}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
              onBlur={() => setIsEditingName(false)}
              autoFocus
            />
          ) : (
            <h1 onClick={() => setIsEditingName(true)}>{profile.name}</h1>
          )}
        </div>
      </div>

      {/* Social Links Section */}
      <div className="social-links-section">
        <h3 id="social-title">Social Links</h3>
        <div className="add-social-link">
          <input
            id="social-input"
            type="text"
            value={newSocialLink}
            onChange={(e) => setNewSocialLink(e.target.value)}
            placeholder="Add social link URL"
          />
          <input
            id="social-title-input"
            type="text"
            value={socialLinkTitle}
            onChange={(e) => setSocialLinkTitle(e.target.value)}
            placeholder="Add social link title (optional)"
          />
          <button id="social-btn" onClick={handleAddSocialLink}>
            Add
          </button>
        </div>
        <ul className="social-links-list">
          {socialLinks.map((link) => (
            <li key={link.id}>
              <span onClick={() => window.open(link.url, "_blank")}>
                {link.title || link.url}
              </span>
              <button onClick={() => handleDeleteSocialLink(link.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Photo Gallery Section */}
      <div className="photo-gallery-section">
        <h3 id="photo-title">Photo Gallery</h3>
        <input
          type="file"
          id="upload-photos"
          accept="image/*"
          multiple
          onChange={handleAddPhoto}
          hidden
        />
        <label htmlFor="upload-photos" id="upload">
          Upload Photos
        </label>
        {deleteMode && <button onClick={handleDeleteSelectedPhotos}>Delete</button>}
        <div className="photo-grid">
          {photos.map((photo) => (
            <div key={photo.id}>
              <img src={photo.url} alt="Uploaded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;