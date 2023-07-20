const BASE_URL = "https://mcs-backend.up.railway.app";

// Endpoint for verifying user for certificate
const verifyUserEndpoint = `${BASE_URL}/api/validate`;

let requestInProgress = false;

// DOM objects needed in the script
const emailField = document.querySelector("#email");

const trackField = document.querySelector("#track");

const validateButton = document.querySelector("#validateBtn");

const mainContent = document.querySelector(".main-contents");

// Asynchronous function for making network request
async function verifyUser(email, track) {
  try {
    const request = await fetch(`${verifyUserEndpoint}`, {
      method: "POST",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify({
        email: email,
        track: track,
      }),
    });
    const response = await request.json();
    requestInProgress = false;
    return response;
  } catch (error) {
    console.log(error);
    requestInProgress = false;
    return {
      error: "Network Error",
    };
  }
}

// Function to validate if user typed a valid email
const validateInput = (userInput) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailPattern.test(userInput);
};

// Function to make request and perfrom the neccessary post request functionality
const validateUser = async (e) => {
  e.preventDefault(); // Prevent the form reloading the page when submitting
  const userInput = emailField.value; // Get email value
  const track = trackField.value; // Get trackfield value
  const toastDiv = document.createElement("div"); // Create div element for toast

  validateButton.value = "Loading..."; // Button will show loading... wduring asynchronous request

  if (validateInput(userInput) && !requestInProgress) {
    requestInProgress = true;
    const verifyEndpointResponse = await verifyUser(userInput, track);
    validateButton.value = "Validate";
    if (verifyEndpointResponse) {
      // If the email is validated to collect certificate
      toastDiv.className = "toast_success";
      toastDiv.innerHTML = "Congratulations, You are validated!";
      setTimeout(() => {
        // Navigate the user to the certificate page on successful validation
        window.location.replace("/templates/certificate.html");
      }, 3000);
    } else {
      // If the user is not validated to collect a certificate
      toastDiv.className = "toast_failed";
      toastDiv.innerHTML = "Validation failed!";
    }
  } else {
    // If user did not put a valid email
    toastDiv.className = "toast_failed";
    toastDiv.innerHTML = "Enter valid email";
  }
  mainContent.appendChild(toastDiv);
};

// Event listener for the submit button
validateButton.addEventListener("click", validateUser);
