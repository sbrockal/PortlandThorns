"use strict"; // Enforces strict mode to avoid potential coding issues.

const themeToggleLink = document.getElementById('themeToggleLink');
const body = document.body;

// Check if a theme is saved in localStorage and apply it.
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.toggle('dark-mode', savedTheme === 'dark'); // Apply dark-mode class if theme is 'dark'.
    themeToggleLink.textContent = savedTheme === 'dark' ? 'Light Mode' : 'Dark Mode'; // Update the link text based on the saved theme.
}

// Add event listener to toggle between dark and light modes.
themeToggleLink.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default link behavior.
    const isDarkMode = body.classList.toggle('dark-mode'); // Toggle dark-mode class.

    themeToggleLink.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode'; // Update the link text.

    // Save the current theme in localStorage.
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

// Contact form validation and submission handling.
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission.

    // Clear previous error messages.
    document.querySelectorAll(".error-message").forEach(msg => {
        msg.textContent = "";
    });

    // Get form values.
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const phone = document.getElementById("number").value.trim();
    const email = document.getElementById("email").value.trim();
    const comments = document.getElementById("comments").value.trim();
    const preferredContact = document.querySelector('input[name="preferred_contact"]:checked');

    // Regular expressions for validation.
    const phoneRegex = /^[0-9]{10}$/; // Phone number must be exactly 10 digits.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple regex for email validation.

    let isValid = true; // Track whether the form is valid.

    // Validate first name.
    if (!firstName) {
        isValid = false;
        document.getElementById("firstNameError").textContent = "First name is required.";
    }

    // Validate last name.
    if (!lastName) {
        isValid = false;
        document.getElementById("lastNameError").textContent = "Last name is required.";
    }

    // Validate phone number if provided.
    if (phone && !phoneRegex.test(phone)) {
        isValid = false;
        document.getElementById("phoneError").textContent = "Phone number must be 10 digits.";
    }

    // Validate email.
    if (!email) {
        isValid = false;
        document.getElementById("emailError").textContent = "Email is required.";
    } else if (!emailRegex.test(email)) {
        isValid = false;
        document.getElementById("emailError").textContent = "Please enter a valid email address.";
    }

    // Validate comments.
    if (!comments) {
        isValid = false;
        document.getElementById("commentsError").textContent = "Comments are required.";
    }

    // Validate preferred contact method.
    if (!preferredContact) {
        isValid = false;
        document.getElementById("contactMethodError").textContent = "Please select a preferred contact method.";
    }

    // If the form is valid, proceed with processing.
    if (isValid) {
        const customer = {
            firstName,
            lastName,
            phone: phone || "Not provided", // Default to "Not provided" if phone is empty.
            email,
            comments,
            preferredContact: preferredContact.value
        };

        // Display thank you message and customer details.
        const thankYouMessage = document.getElementById("thankYouMessage");
        thankYouMessage.innerHTML = `
            <h3>Thank you for your submission, ${customer.firstName} ${customer.lastName}!</h3>
            <p>We have received your information:</p>
            <ul>
                <li><strong>First Name:</strong> ${customer.firstName}</li>
                <li><strong>Last Name:</strong> ${customer.lastName}</li>
                <li><strong>Phone:</strong> ${customer.phone}</li>
                <li><strong>Email:</strong> ${customer.email}</li>
                <li><strong>Comments:</strong> ${customer.comments}</li>
                <li><strong>Preferred Contact Method:</strong> ${customer.preferredContact}</li>
            </ul>
        `;
        thankYouMessage.style.display = "block"; // Show the thank you message.

        // Reset the form fields.
        this.reset();
    }
});

// Function to toggle between player containers (could be used for player details or jerseys).
const playerContainers = document.querySelectorAll('.player-container');
function showPlayer(index) {
    playerContainers.forEach((container, i) => {
        if (i === index) {
            container.classList.add('active'); // Show the active player container.
        } else {
            container.classList.remove('active'); // Hide inactive player containers.
        }
    });
}

// List of players and their jersey images.
const players = [
    { name: "Sophia Smith", jersey: "./images/sophiaSmith-jersey.webp" },
    { name: "Morgan Weaver", jersey: "./images/morganWeaver-jersey.avif" },
    { name: "Christine Sinclair", jersey: "./images/christineSinclair-jersey.webp" },
    { name: "Becky Sauerbrunn", jersey: "./images/beckySauerbrunn-jersey.webp" },
    { name: "Hina Sugita", jersey: "./images/hinaSugita-jersey.jpg" },
    { name: "Bella Bixby", jersey: "./images/bellaBixby-jersey.webp" },
    { name: "Jesse Flemming", jersey: "./images/jesseFlemming-jersey.avif" },
    { name: "Marie Müller", jersey: "./images/marieMuller-jersey.webp" },
    { name: "Meghan Klingenberg", jersey: "./images/meghanKlingenberg-jersey.jpg" },
    { name: "Olivia Moultrie", jersey: "./images/oliviaMoultrie-jersey.png" }
];

// Function to check if the user's guess matches a random player.
function checkGuess() {
    const userGuess = document.getElementById('userGuess').value.trim(); // Get user guess.
    const randomIndex = Math.floor(Math.random() * players.length); // Get random index.
    const randomPlayer = players[randomIndex]; // Get player object.
    const resultDiv = document.getElementById('result');
    const jerseyImage = document.getElementById('jerseyImage');

    // Clear previous guesses.
    resultDiv.innerHTML = "";

    // Check if the user has entered a name.
    if (userGuess === "") {
        resultDiv.innerHTML = "Please enter a name.";
        return;
    }

    // Display random index and player's name.
    resultDiv.innerHTML = `Random number: ${randomIndex}, Player: ${randomPlayer.name}`;

    // Compare the user's guess to the player's name.
    if (userGuess.toLowerCase() === randomPlayer.name.toLowerCase()) {
        resultDiv.innerHTML += `<br>You guessed correctly! Congratulations!`;
        jerseyImage.src = randomPlayer.jersey; // Set the jersey image source.
        jerseyImage.style.display = 'block'; // Show the jersey image.
    } else {
        resultDiv.innerHTML += `<br>Incorrect guess. Try again!`;
        jerseyImage.style.display = 'none'; // Hide the jersey image if not a winner.
    }
}
