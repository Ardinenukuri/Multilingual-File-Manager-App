document.addEventListener('DOMContentLoaded', () => {
    // Function to handle file upload
    document.getElementById('upload-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const fileInput = document.getElementById('file-upload');
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/files', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorText = await response.text(); // Get the response text
                throw new Error(`HTTP error! status: ${response.status}, ${errorText}`);
            }

            const result = await response.json();
            if (result.success) {
                alert('File uploaded successfully!');
                loadFiles();
            } else {
                alert('Failed to upload file: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            console.log('An error occurred during file upload. Please try again.');
        }
    });

    // Function to load the list of uploaded files
    async function loadFiles() {
        try {
            const response = await fetch('/files');

            if (!response.ok) {
                const errorText = await response.text(); // Get the response text
                throw new Error(`HTTP error! status: ${response.status}, ${errorText}`);
            }

            const files = await response.json();

            const fileList = document.getElementById('file-list');
            fileList.innerHTML = '';

            files.forEach(file => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = file.url; // Link to the file
                link.textContent = file.filename;
                link.target = '_blank'; // Open in new tab
                listItem.appendChild(link);
                fileList.appendChild(listItem);
            });
        } catch (error) {
            console.error('Error:', error);
            console.log('An error occurred while loading files. Please try again.');
        }
    }

    // Initial load of files
    loadFiles();
});

document.addEventListener('DOMContentLoaded', () => {
    // Function to handle file upload
    document.getElementById('upload-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const fileInput = document.getElementById('file-upload');
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/files', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            if (result.success) {
                alert('File uploaded successfully!');
                loadFiles();
            } else {
                alert('Failed to upload file.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    

    // Function to handle language change
    document.querySelectorAll('#language-switcher button').forEach(button => {
        button.addEventListener('click', async (e) => {
            const lang = e.target.getAttribute('data-lang');
            await changeLanguage(lang);
        });
    });

    async function changeLanguage(lang) {
        try {
            const response = await fetch(`/translate?lang=${lang}&messageKey=file_manager`);
            const result = await response.json();
            
            document.getElementById('page-title').textContent = result.message.title;
            document.querySelector('#upload-form button').textContent = result.message.upload_button;
        

        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Initial load of translations
    changeLanguage('english'); // Default language
});
