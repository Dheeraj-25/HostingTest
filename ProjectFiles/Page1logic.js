// script.js

// JavaScript to handle form submission
async  function handleSubmit(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Retrieve input values
    const formData = new FormData(document.getElementById('regform'));
    const data = {
        username : formData.get('username'),
        email: formData.get('email'),
        password : formData.get('password'),
        gender : formData.get('gender'),
        hobbies : formData.get('hobbies'),
        country : formData.get('country'),
    };

    try {
        const response = await fetch('http://localhost:3001/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
    if (response.ok) {
        const message = await response.text();
        document.getElementById('output').innerText = message; // Display success message
      } else {
        const errorMessage = await response.text();
        console.error('Error:', errorMessage);
        document.getElementById('output').innerText = 'Error: ' + errorMessage; // Display error message
      }
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('output').innerText = 'Error: ' + error.message; // Display error message
    }
  
  function resetForm() {
    document.getElementById('regform').reset(); // Reset the form fields
    document.getElementById('output').innerText = ''; // Clear any messages
  }
}