document.addEventListener("DOMContentLoaded", function () {
    const languageMap = {
        "en": "english",
        "fr": "french",
        "sw": "swahili",
        "kin": "kinyarwanda"
    };

    const defaultLanguage = "english";

    async function loadTranslations(language) {
        const mappedLanguage = languageMap[language] || defaultLanguage;
        console.log(`Loading translations for language: ${mappedLanguage}`);
        const response = await fetch(`/locales/${mappedLanguage}/translation.json`);
        if (response.ok) {
            return response.json();
        } else {
            console.error(`Failed to load translations for language: ${mappedLanguage}`);
            return {};
        }
    }

    function updateTranslations(translations) {
        console.log('Updating translations:', translations);

        const welcomeElement = document.getElementById('welcome');
        if (welcomeElement) {
            welcomeElement.textContent = translations.home_page?.welcome || 'Welcome to the File Manager';
        }

        const navHomeElement = document.getElementById('nav-home');
        if (navHomeElement) {
            navHomeElement.textContent = translations.navbar?.home || 'Home';
        }

        const navFileListElement = document.getElementById('nav-file-list');
        if (navFileListElement) {
            navFileListElement.textContent = translations.navbar?.file_list || 'File List';
        }

        const navActionsElement = document.getElementById('nav-actions');
        if (navActionsElement) {
            navActionsElement.textContent = translations.navbar?.actions || 'Actions';
        }

        const navLogoutElement = document.getElementById('nav-logout');
        if (navLogoutElement) {
            navLogoutElement.textContent = translations.navbar?.logout || 'Logout';
        }

        const pageTitleElement = document.getElementById('page-title');
        if (pageTitleElement) {
            pageTitleElement.textContent = translations.file_manager?.title || 'File Manager';
        }

        const uploadTextElement = document.getElementById('upload_text');
        if (uploadTextElement) {
            uploadTextElement.textContent = translations.file_manager?.upload_text || 'Upload a file';
        }

        const createTextElement = document.getElementById('create_text');
        if (createTextElement) {
            createTextElement.textContent = translations.file_manager?.create_text || 'Create a File';
        }
    }

    function changeLanguage(language) {
        loadTranslations(language).then(updateTranslations).catch(error => {
            console.error('Error updating translations:', error);
            changeLanguage(defaultLanguage);  // Fallback to default language
        });
    }

    const userLanguage = (navigator.language || 'en').split('-')[0];
    changeLanguage(userLanguage);

    document.getElementById('language-dropdown').addEventListener('change', function (event) {
        const selectedLanguage = event.target.value;
        console.log(`Selected language: ${selectedLanguage}`);
        changeLanguage(selectedLanguage);
    });
});