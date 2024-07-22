const fs = require('fs');
const path = require('path');
const db = require('../config/db');
const fileQueue = require('../config/queue');

// Create a new file
exports.createFile = (req, res) => {
  const { filename, content } = req.body;
  const filePath = path.join(__dirname, 'files', filename);

  fs.writeFile(filePath, content, (err) => {
    if (err) throw err;

    db.query('INSERT INTO files (filename, path) VALUES (?, ?)', [filename, filePath], (err, result) => {
      if (err) throw err;
      res.send('File created successfully');
    });
  });
};

// Read a file
exports.readFile = (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'files', filename);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) throw err;
    res.send(data);
  });
};

// Update a file
exports.updateFile = (req, res) => {
  const { filename, content } = req.body;
  const filePath = path.join(__dirname, 'files', filename);

  fs.writeFile(filePath, content, (err) => {
    if (err) throw err;
    res.send('File updated successfully');
  });
};

// Delete a file
exports.deleteFile = (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'files', filename);

  fs.unlink(filePath, (err) => {
    if (err) throw err;

    db.query('DELETE FROM files WHERE filename = ?', [filename], (err, result) => {
      if (err) throw err;
      res.send('File deleted successfully');
    });
  });
};

//upload file 
exports.uploadFile = async (req, res) => {
  try {
      if (!req.file) {
          return res.status(400).send('No file uploaded');
      }

      const { originalname, filename, size, mimetype } = req.file;
      const filePath = path.join(__dirname, '../uploads', req.user.id.toString(), filename);

      // Insert file information into the database
      await db.query('INSERT INTO files (user_id, filename, path, size, type) VALUES (?, ?, ?, ?, ?)', [
          req.user.id, originalname, filePath, size, mimetype
      ]);

      // Add the file to a processing queue if necessary
      fileQueue.add({ file: filename });

      res.send('File uploaded and queued for processing');
  } catch (err) {
      console.error('Error uploading file:', err);
      res.status(500).send('Server error');
  }
};