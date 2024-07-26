document.addEventListener('DOMContentLoaded', () => {
    const fileList = document.getElementById('file-list');

 // Function to load the list of uploaded files from both /api/list and /api/uploaded
 async function loadFiles() {
    try {
        const [listResponse, uploadedResponse] = await Promise.all([
            fetch('/api/list'),
            fetch('/api/uploaded')
        ]);

        if (!listResponse.ok) {
            const errorText = await listResponse.text();
            throw new Error(`HTTP error! status: ${listResponse.status}, ${errorText}`);
        }

        if (!uploadedResponse.ok) {
            const errorText = await uploadedResponse.text();
            throw new Error(`HTTP error! status: ${uploadedResponse.status}, ${errorText}`);
        }

        const listFiles = await listResponse.json();
        const uploadedFiles = await uploadedResponse.json();
        const files = [...listFiles, ...uploadedFiles];

        const fileList = document.getElementById('file-list');
        fileList.innerHTML = '';

        files.forEach(file => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span class="file-name">${file.filename}</span>
                <button class="edit-btn">✏️</button>
                <button class="delete-btn">🗑️</button>
            `;

            const editBtn = listItem.querySelector('.edit-btn');
            const deleteBtn = listItem.querySelector('.delete-btn');
            const fileNameSpan = listItem.querySelector('.file-name');

            editBtn.addEventListener('click', () => editFile(file.filename, fileNameSpan));
            deleteBtn.addEventListener('click', () => deleteFile(file.filename));

            listItem.querySelector('.file-name').addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = `/files/${file.filename}`;
            });

            fileList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while loading files. Please try again.');
    }
}

async function editFile(filename, fileNameSpan) {
    const newFilename = prompt('Enter new file name:', filename);
    if (newFilename && newFilename !== filename) {
        try {
            const response = await fetch(`/api/files/${filename}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ newFilename })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, ${errorText}`);
            }

            fileNameSpan.textContent = newFilename;
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while editing the file name. Please try again.');
        }
    }
}

async function deleteFile(filename) {
    if (confirm('Are you sure you want to delete this file?')) {
        try {
            const response = await fetch(`/api/files/${filename}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, ${errorText}`);
            }

            loadFiles(); // Reload the file list after deletion
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while deleting the file. Please try again.');
        }
    }
}

    // Initial load of files
    loadFiles();

    // Add event listener to the Create New File button
    document.getElementById('create-file-btn').addEventListener('click', () => {
        window.location.href = '/files'; // Redirect to the file creation page
    });
});
