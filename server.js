const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors'); // Add CORS support

const app = express();
const PORT = 3700;

// Setup file upload storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileTypes = /mp3|mp4|wav|ogg|m4a/;
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimeType && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only audio and video files are allowed.'));
    }
  },
});

// Middleware for JSON parsing and CORS
app.use(cors()); // Allow cross-origin requests
app.use(express.json());
app.use(express.static('public')); // Serve public directory
app.use('/uploads', express.static('uploads')); // Serve uploads directory

// Mock file and log data for testing
const fileHistory = [];
const userHistory = [];

// File upload route
app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).send('No file uploaded.');

  fileHistory.push({
    filename: file.filename,
    path: file.path,
    uploadDate: new Date(),
    fileType: file.mimetype,
    size: file.size,
  });

  userHistory.push({
    action: 'File Upload',
    timestamp: new Date(),
    file: file.filename,
  });

  res.status(200).send('File uploaded successfully.');
});

// Route to get uploaded files
app.get('/files', (req, res) => {
  res.json(fileHistory);
});

// Route to get activity logs
app.get('/activity-logs', (req, res) => {
  res.json(userHistory);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});