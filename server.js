const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    
});

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    mobileNo: { type: String, required: true, match: /^[0-9]{10}$/ },
    emailId: { type: String, required: true, match: /.+\@.+\..+/ },
    address: String,
    street: String,
    city: String,
    state: String,
    country: String,
    loginId: { type: String, required: true, minlength: 8, maxlength: 8, match: /^[a-zA-Z0-9]*$/ },
    password: { type: String, required: true, match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}$/ },
    creationTime: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Create User
app.post('/api/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json(error);
    }
});

// Read Users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
