const mongoose = require('mongoose'); // Import mongoose

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true }, // Ensure username is unique
    password: { type: String, required: true }, // Ensure password is required
    totalVolunteerHours: { type: Number, default: 0 },
    donationHistory: { type: [Number], default: [] },
    milestones: { type: [String], default: [] },
    recommendedOpportunities: { type: [String], default: [] },
    upcomingEvents: { type: [String], default: [] },
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;