document.addEventListener('DOMContentLoaded', () => {
    const languageDropdown = document.getElementById('language-dropdown');

    // Load saved language preference
    const savedLanguage = localStorage.getItem('appLanguage') || 'english';
    languageDropdown.value = savedLanguage;

    // Handle language change
    languageDropdown.addEventListener('change', (event) => {
        const selectedLanguage = event.target.value;
        localStorage.setItem('appLanguage', selectedLanguage);
        changeLanguage(selectedLanguage);
    });

    // Function to change language
    function changeLanguage(language) {
        fetch(`/translate?lang=${language}&messageKey=welcome_message`)
            .then(response => response.json())
            .then(data => {
                document.querySelector('h1').textContent = data.message;
                // Update other text on the page if needed
            })
            .catch(error => console.error('Error:', error));
    }

    // Function to load initial content
    function loadContent() {
        fetch(`/translate?lang=${languageDropdown.value}&messageKey=welcome_message`)
            .then(response => response.json())
            .then(data => {
                document.querySelector('h1').textContent = data.message;
                // Update other text on the page if needed
            })
            .catch(error => console.error('Error:', error));
    }

    // Initial load of content
    loadContent();
});
