// Function to handle form submission
function handleSignUp(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get username and password from form inputs
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check if username or password is empty
    if (!username || !password) {
        alert('Username and password are required');
        return;
    }

    // Simulate user data storage (replace with actual storage logic)
    const userData = {
        username: username,
        password: password,
        tokens: 0, // Initialize tokens (if needed)
        profilePic: 'blooks/Default.webp', // Default profile picture
        blooks: {
            Xotic: {
                value: 15,
                rarity: 'Rare',
                amount: 0,
                image: 'blooks/xotic.jpg' // Replace with actual image URL
            },
            Pig: {
                value: 8,
                rarity: 'Common',
                amount: 0,
                image: 'blooks/pig.jpg' // Replace with actual image URL
            },
            Hmm: {
                value: 20,
                rarity: 'Legendary',
                amount: 0,
                image: 'blooks/hmm.jpg' // Replace with actual image URL
            }
        }
        // Add more properties as needed
    };

    // Save user data to localStorage (or database)
    localStorage.setItem('userData', JSON.stringify(userData));

    // Optionally, notify the user that signup was successful
    alert('Sign up successful!');

    // Redirect to stats.html or any other page
    window.location.href = 'stats.html';

    // Reset the form (if needed)
    document.getElementById('signupForm').reset();
}

// Event listener for form submission
document.getElementById('signupForm').addEventListener('submit', handleSignUp);

// Function to set profile picture
function setProfilePic(imageUrl) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    userData.profilePic = imageUrl;
    localStorage.setItem('userData', JSON.stringify(userData));
    document.getElementById('profilePic').src = imageUrl;
}

// Function to reset profile picture to default
function resetProfilePic() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    userData.profilePic = 'blooks/Default.webp';
    localStorage.setItem('userData', JSON.stringify(userData));
    document.getElementById('profilePic').src = 'blooks/Default.webp';
}
