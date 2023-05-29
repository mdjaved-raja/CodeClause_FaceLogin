// Get the login form element
const loginForm = document.getElementById('login-form');

// Add an event listener to the form submission
loginForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting

  // Get the entered username and password values
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Perform validation and login logic
  if (username === 'admin' && password === 'password') {
    alert('Login successful!');
    // Perform any further actions on successful login
  } else {
    alert('Invalid username or password. Please try again.');
  }
});

// Get the video element
const video = document.getElementById('video-feed');

// Check if getUserMedia is supported by the browser
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  // Access the webcam stream
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
      // Set the video source to the webcam stream
      video.srcObject = stream;
    })
    .catch(function(error) {
      console.error('Error accessing webcam:', error);
    });
} else {
  console.error('getUserMedia is not supported by this browser');
}

// Get the canvas element
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// Get the capture button
const captureButton = document.getElementById('capture-btn');

// Add click event listener to the capture button
captureButton.addEventListener('click', function() {
  // Draw the current frame from the video onto the canvas
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Get the image data from the canvas
  const imageData = canvas.toDataURL('image/jpeg');

  // Send the image data to the server for face recognition
  sendImageToServer(imageData);
});

// Function to send the captured image to the server
function sendImageToServer(imageData) {
  // Make an AJAX request or use fetch to send the image data to the server
  // Example using fetch:
  fetch('/face-recognition', {
    method: 'POST',
    body: JSON.stringify({ image: imageData }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(function(response) {
      // Handle the response from the server
      if (response.ok) {
        // Successful response
        console.log('Image sent to server for face recognition');
      } else {
        // Error response
        console.error('Error sending image to server:', response.status, response.statusText);
      }
    })
    .catch(function(error) {
      console.error('Error sending image to server:', error);
    });
}
