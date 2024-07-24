const i18next = require('i18next');
const Backend = require('i18next-fs-backend'); // File system backend to load translations
const Middleware = require('i18next-http-middleware');

i18next
  .use(Backend)
  .use(Middleware.LanguageDetector)
  .init({
    fallbackLng: 'en', 
    preload: ['en', 'fr', 'ki', 'sw'], 
    backend: {
      loadPath: __dirname + '/locales/{{lng}}/{{ns}}.json' 
    },
    interpolation: {
      escapeValue: false
    }
  });

module.exports = i18next;
