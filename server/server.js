import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import jsonServer from 'json-server';
import express from 'express';
import multer from 'multer';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const server = jsonServer.create();
const router = jsonServer.router(join(__dirname, 'db.json'));

const middlewares = jsonServer.defaults();
server.use(middlewares);

// Ensure uploads directory exists
const uploadsDir = join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Handle file uploads
server.post('/api/files', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const fileUrl = `/api/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

// Serve uploaded files
server.use('/api/uploads', express.static(uploadsDir));

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

server.use((req, res, next) => {
  setTimeout(next, 500);
});

server.use('/api', router);

server.listen(3001, () => {
  console.log('JSON Server is running on port 3001');
});
