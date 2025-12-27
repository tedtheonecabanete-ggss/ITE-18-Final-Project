const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));
app.use('/assets', express.static('assets'));
app.use('/src', express.static('src'));
app.use(fileUpload());

// Progress file path
const PROGRESS_FILE = 'user-progress.json';

// Initialize progress file if it doesn't exist
if (!fs.existsSync(PROGRESS_FILE)) {
    fs.writeFileSync(PROGRESS_FILE, JSON.stringify({
        users: {},
        lastUpdated: new Date().toISOString()
    }, null, 2));
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API to save user progress
app.post('/api/save-progress', (req, res) => {
    try {
        const { userId, progress } = req.body;
        const progressData = JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
        
        progressData.users[userId] = {
            ...progress,
            lastUpdated: new Date().toISOString()
        };
        
        fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progressData, null, 2));
        res.json({ success: true, message: 'Progress saved' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// API to get user progress
app.get('/api/get-progress/:userId', (req, res) => {
    try {
        const progressData = JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
        const userProgress = progressData.users[req.params.userId] || {};
        res.json({ success: true, progress: userProgress });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// API to get leaderboard
app.get('/api/leaderboard', (req, res) => {
    try {
        const progressData = JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
        const users = Object.entries(progressData.users)
            .map(([id, data]) => ({
                userId: id,
                username: data.username || 'Anonymous',
                score: data.score || 0,
                completedTours: data.completedTours || [],
                badges: data.badges || []
            }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 10);
        
        res.json({ success: true, leaderboard: users });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Disaster Preparedness VR Museum is ready!`);
});