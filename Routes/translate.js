const express = require('express');
const router = express.Router();
const i18next = require('../config/i18n');

router.get('/translate', (req, res) => {
  const { lang } = req.query; // Get the language from the query parameter

  // Set the language preference for i18next
  i18next.changeLanguage(lang || 'en');

  // Example message key (this could be dynamic based on your needs)
  const messageKey = req.query.messageKey || 'welcome_message';

  // Get the translated message
  const translatedMessage = i18next.t(messageKey);

  // Send the response
  res.json({ message: translatedMessage });
});

module.exports = router;
