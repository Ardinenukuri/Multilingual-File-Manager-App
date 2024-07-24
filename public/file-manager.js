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
                loadFiles(); // Reload the list of files
            } else {
                alert('Failed to upload file: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during file upload. Please try again.');
        }
    });

    // Function to load the list of uploaded files
    async function loadFiles() {
        try {
            const response = await fetch('/files');
            if (!response.ok) {
                throw new Error('Network response was not ok');
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
            alert('An error occurred while loading files. Please try again.');
        }
    }

    // Initial load of files
    loadFiles();
});
