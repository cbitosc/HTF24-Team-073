// dashboard.js

// document.addEventListener("DOMContentLoaded", () => {
//   // Example of setting values dynamically
//   document.getElementById("total-hours").textContent = "120";  // dynamically set volunteer hours
//   document.getElementById("total-donated").textContent = "800"; // dynamically set donation amount
//   document.getElementById("people-helped").textContent = "300"; // dynamically set people helped
  
//   // Fetch data from an API (optional)
//   // Example fetch request (replace 'your-api-url' with actual URL)
//   fetch('your-api-url')
//     .then(response => response.json())
//     .then(data => {
//       // Update the dashboard elements with fetched data
//       document.getElementById("total-hours").textContent = data.totalHours;
//       document.getElementById("total-donated").textContent = data.totalDonated;
//       document.getElementById("people-helped").textContent = data.peopleHelped;
//     })
//     .catch(error => console.error('Error fetching data:', error));
// });
async function fetchDashboard() {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:5005/dashboard', {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${token}`,
      },
  });

  const data = await response.json();
  if (response.ok) {
    document.getElementById('username').innerText = data.username;
    document.getElementById('email').innerText = data.email;
    document.getElementById('totalHours').innerText = data.totalHours;
    document.getElementById('totalDonated').innerText = data.totalDonated; // Use this data in your dashboard
  } else {
      console.error('Error fetching dashboard:', data);
  }
}
// Update Hours
document.getElementById('update-hours-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const hours = document.getElementById('hours').value;

  try {
      const response = await fetch('http://localhost:5005/api/update-hours', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ hours: Number(hours) }),
      });
      const data = await response.json();
      alert(data.message); // Alert the user with the response message
  } catch (error) {
      console.error('Error:', error);
  }
});

// Update Donations
document.getElementById('update-donations-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const donation = document.getElementById('donation').value;

  try {
      const response = await fetch('http://localhost:5005/api/update-donations', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ amount: Number(donation) }),
      });
      const data = await response.json();
      alert(data.message); // Alert the user with the response message
  } catch (error) {
      console.error('Error:', error);
  }
});
// Get User Dashboard Data
router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
      const user = await User.findById(req.user.id);
      res.json({
          totalHours: user.totalVolunteerHours,
          totalDonated: user.totalDonated,
      });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});
// Function to display user dashboard
async function displayDashboard() {
  try {
      const response = await fetch('http://localhost:5005/api/dashboard', {
          headers: {
              'Authorization': `Bearer ${token}`,
          },
      });
      const data = await response.json();
      document.getElementById('totalHours').innerText = `Total Volunteer Hours: ${data.totalHours}`;
      document.getElementById('totalDonated').innerText = `Total Donations: ${data.totalDonated}`;
  } catch (error) {
      console.error('Error fetching dashboard data:', error);
  }
}
document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('token'); // Clear token
    window.location.href = 'login.html'; // Redirect to login
});

// Event listener for logout button
document.getElementById('logoutButton').addEventListener('click', logout);

// Call fetchUserInfo when the dashboard loads
window.onload = fetchUserInfo;