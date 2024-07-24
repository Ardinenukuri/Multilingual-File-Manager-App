const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const i18next = require('./config/i18n');
const middleware = require('i18next-http-middleware');
const userController = require('./controllers/userController');
const uploadRoutes = require('./routes/uploadRoutes');
const fileController = require('./controllers/fileController');
const session = require('express-session');
const passport = require('./config/passport');
require('dotenv').config();

const app = express();

app.use(session({
  secret: '966290a9bfec4678973d9d147d064ae2948f18327e56289a602acc2f2f1adf3dc0f8db8697ef51e74707bb65fa93584f46cbef7bbe1720dc860e5eda51f7a4d', 
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(middleware.handle(i18next));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/files', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'files.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/logout', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.use('/files', uploadRoutes);

app.post('/register', userController.register);
app.post('/login', userController.login);

app.post('/file', fileController.uploadFile);
app.get('/files/:filename', fileController.readFile);
app.put('/files', fileController.updateFile);
app.delete('/files/:filename', fileController.deleteFile);

app.get('/translate', (req, res) => {
  res.send(req.t('welcome_message'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = app;
