import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { auth } from "./firebase";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
// import About from "./components/About";
// import Contact from "./components/Contact";
import AboutUs from "./components/AboutUs";
import Login from "./components/Login";
import Register from "./components/Register";
import Reset from "./components/Reset";
import CoursesPage from "./components/CoursesPage";
import VinayaPage from "./components/Vinaya";
import SuttantaPage from "./components/Suttanta";
import AbhidhammaPage from "./components/Abhidhamma";
import PaliPage from "./components/Pali";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<Home />} />
            {/* <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} /> */}
            <Route path="/about-contact-page" element={<AboutUs />} />
            <Route path="/courses-page" element={<CoursesPage />} />
            <Route path="/vinaya-page" element={<VinayaPage />} />
            <Route path="/suttanta-page" element={<SuttantaPage />} />
            <Route path="/abhidhamma-page" element={<AbhidhammaPage />} />
            <Route path="/pali-page" element={<PaliPage />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset" element={<Reset />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
