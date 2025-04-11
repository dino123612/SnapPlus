document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const username = usernameInput.value;
        const password = passwordInput.value;

        try {
            const response = await fetch('https://saver-backend-api.onrender.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.text(); // Or response.json() if your backend sends JSON

            if (response.ok) {
                messageDiv.textContent = data; // Display success message from backend
                messageDiv.className = 'message success';
                loginForm.reset(); // Clear the form
            } else {
                messageDiv.textContent = `Error: ${data}`;
                messageDiv.className = 'message error';
            }

        } catch (error) {
            console.error('There was a network error:', error);
            messageDiv.textContent = 'Failed to connect to the server.';
            messageDiv.className = 'message error';
        }
    });
});