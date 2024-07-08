// Function to retrieve user data from localStorage
function getUserData() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return userData;
}

// Function to calculate unlocked blooks
function calculateUnlockedBlooks(userData) {
    // Assuming blooks are stored in an array within userData
    const blooks = userData && userData.Blooks ? userData.Blooks : [];
    let unlockedCount = 0;

    // Check if at least one of each blook exists
    for (const blook in blooks) {
        if (blooks.hasOwnProperty(blook) && blooks[blook].quantity > 0) {
            unlockedCount++;
        }
    }

    return unlockedCount;
}

// Function to update dashboard with user data
function updateDashboard(userData) {
    if (userData) {
        document.getElementById('username').textContent = userData.username || 'Unknown';
        document.getElementById('tokens').textContent = userData.tokens || 0;

        const unlockedBlooks = calculateUnlockedBlooks(userData);
        document.getElementById('unlockedBlooks').textContent = unlockedBlooks;

        // Set default avatar image
        const avatarImg = document.querySelector('.avatar img');
        avatarImg.src = userData.avatar || 'blooks/Default.webp';

        // Check if user has claimed tokens today
        const lastClaimedDate = userData.lastClaimedDate ? new Date(userData.lastClaimedDate) : null;
        const currentDate = new Date();
        const isSameDay = lastClaimedDate && lastClaimedDate.getDate() === currentDate.getDate() &&
            lastClaimedDate.getMonth() === currentDate.getMonth() &&
            lastClaimedDate.getFullYear() === currentDate.getFullYear();

        if (!isSameDay) {
            // Enable claim button
            document.getElementById('claimButton').disabled = false;
        } else {
            // Disable claim button
            document.getElementById('claimButton').disabled = true;
        }
    } else {
        alert('User data not found.');
    }
}

// Function to handle claiming daily tokens
function claimDailyTokens() {
    const userData = getUserData();

    // Add tokens
    userData.tokens = (userData.tokens || 0) + 2000;

    // Update last claimed date
    userData.lastClaimedDate = new Date().toISOString();

    // Save updated userData to localStorage
    localStorage.setItem('userData', JSON.stringify(userData));

    // Update dashboard with new data
    updateDashboard(userData);

    // Disable claim button after claiming
    document.getElementById('claimButton').disabled = true;

    // Optionally, notify the user
    alert('You have claimed 2000 daily tokens!');
}

// Event listener for claim button click
document.getElementById('claimButton').addEventListener('click', claimDailyTokens);

// On page load, update dashboard with user data
document.addEventListener('DOMContentLoaded', function () {
    const userData = getUserData();
    updateDashboard(userData);
});
