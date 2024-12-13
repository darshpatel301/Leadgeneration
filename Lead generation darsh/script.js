// script.js
document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        gender: document.getElementById('gender').value,
        location: document.getElementById('location').value,
        email: document.getElementById('email').value,
    };

    // Add user data to Firestore
    db.collection('users').add(formData)
        .then(() => {
            const feedback = document.getElementById('feedback');
            feedback.textContent = 'User  information stored successfully!';
            feedback.style.color = 'green';
            document.getElementById('userForm').reset(); // Reset the form
        })
        .catch((error) => {
            const feedback = document.getElementById('feedback');
            feedback.textContent = 'Error: ' + error.message;
            feedback.style.color = 'red';
        });
});