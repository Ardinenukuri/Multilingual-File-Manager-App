const express = require('express');
const bodyParser = require('body-parser');
const i18next = require('./config/i18n');
const middleware = require('i18next-http-middleware');
const userController = require('./controllers/userController');
const fileController = require('./controllers/fileController');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(middleware.handle(i18next));

app.post('/register', userController.register);
app.post('/login', userController.login);

app.post('/files', fileController.createFile);
app.get('/files/:filename', fileController.readFile);
app.put('/files', fileController.updateFile);
app.delete('/files/:filename', fileController.deleteFile);


app.get('/translate', (req, res) => {
    res.send(req.t('welcome_message'));
  });


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = app;