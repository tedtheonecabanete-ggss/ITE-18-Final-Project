// Main Application Logic - ALL BUTTONS FIXED
class DisasterPreparednessMuseum {
    constructor() {
        this.currentUser = null;
        this.userProgress = {};
        this.audioEnabled = true;
        this.vrMode = false;
        this.currentGame = null;
        this.currentTour = null;
        
        // Initialize audio
        this.backgroundAudio = document.getElementById('background-audio');
        this.tourAudio = document.getElementById('tour-audio');
        
        this.initializeUser();
        this.setupEventListeners();
        this.setupVREventListeners();
        
        // Fix VR Tour button if it exists
        setTimeout(() => {
            const startVRBtn = document.getElementById('start-vr-tour-btn');
            if (startVRBtn) {
                startVRBtn.onclick = () => this.startVRTour();
            }
        }, 100);
    }
    
    initializeUser() {
        // Generate or retrieve user ID
        let userId = localStorage.getItem('museum_user_id');
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('museum_user_id', userId);
        }
        
        let username = localStorage.getItem('museum_username');
        if (!username) {
            username = 'Guest User';
            localStorage.setItem('museum_username', username);
        }
        
        this.currentUser = {
            id: userId,
            username: username
        };
        
        document.getElementById('username').textContent = this.currentUser.username;
        this.loadUserProgress();
    }
    
    loadUserProgress() {
        // Load from localStorage
        const savedProgress = localStorage.getItem('museum_progress_' + this.currentUser.id);
        if (savedProgress) {
            try {
                this.userProgress = JSON.parse(savedProgress);
            } catch (e) {
                this.userProgress = this.getDefaultProgress();
            }
        } else {
            this.userProgress = this.getDefaultProgress();
        }
        this.updateProgressDisplay();
    }
    
    getDefaultProgress() {
        return {
            score: 0,
            completedTours: [],
            badges: [],
            gamesPlayed: {},
            username: this.currentUser.username
        };
    }
    
    saveProgress() {
        this.userProgress.username = this.currentUser.username;
        localStorage.setItem('museum_progress_' + this.currentUser.id, JSON.stringify(this.userProgress));
    }
    
    updateProgressDisplay() {
        // Update tours completed
        const toursCompleted = this.userProgress.completedTours?.length || 0;
        document.getElementById('tours-completed').textContent = `${toursCompleted}/4`;
        
        // Update total score
        const totalScore = this.userProgress.score || 0;
        document.getElementById('total-score').textContent = totalScore;
        
        // Update badges
        const badgesContainer = document.getElementById('badges-container');
        badgesContainer.innerHTML = '';
        
        if (this.userProgress.badges?.length > 0) {
            this.userProgress.badges.forEach(badge => {
                const badgeEl = document.createElement('span');
                badgeEl.className = 'badge';
                badgeEl.textContent = badge;
                badgesContainer.appendChild(badgeEl);
            });
        } else {
            badgesContainer.innerHTML = '<span class="no-badges">No badges yet</span>';
        }
    }
    
    setupEventListeners() {
        // Audio toggle
        document.getElementById('audio-btn').addEventListener('click', () => {
            this.toggleAudio();
        });
        
        // Background music control
        this.backgroundAudio.volume = 0.3;
        if (this.audioEnabled) {
            this.backgroundAudio.play().catch(e => console.log('Audio play failed:', e));
        }
    }
    
    setupVREventListeners() {
        // Setup VR scene interactions after scene loads
        setTimeout(() => {
            this.initializeVRInteractions();
        }, 1000);
    }
    
    toggleAudio() {
        this.audioEnabled = !this.audioEnabled;
        const audioBtn = document.getElementById('audio-btn');
        
        if (this.audioEnabled) {
            this.backgroundAudio.play();
            audioBtn.innerHTML = '<i class="fas fa-volume-up"></i> Sound On';
            this.showNotification('Sound enabled', 'info');
        } else {
            this.backgroundAudio.pause();
            audioBtn.innerHTML = '<i class="fas fa-volume-mute"></i> Sound Off';
            this.showNotification('Sound disabled', 'info');
        }
    }
    
    toggleVRMode() {
        this.vrMode = !this.vrMode;
        const vrBtn = document.getElementById('vr-mode-btn');
        
        if (this.vrMode) {
            vrBtn.innerHTML = '<i class="fas fa-vr-cardboard"></i> VR Mode On';
            this.showNotification('VR Mode enabled', 'info');
        } else {
            vrBtn.innerHTML = '<i class="fas fa-vr-cardboard"></i> VR Mode Off';
            this.showNotification('VR Mode disabled', 'info');
        }
    }
    
    changeUsername() {
        const newUsername = prompt('Enter your new username:', this.currentUser.username);
        if (newUsername && newUsername.trim() !== '') {
            this.currentUser.username = newUsername.trim();
            this.userProgress.username = this.currentUser.username;
            localStorage.setItem('museum_username', this.currentUser.username);
            document.getElementById('username').textContent = this.currentUser.username;
            this.saveProgress();
            this.showNotification('Username updated!', 'success');
        }
    }
    
    viewLeaderboard() {
        // Show demo leaderboard
        this.displayLeaderboard([
            { username: 'SafetyPro', score: 1250, completedTours: 4, badges: 5 },
            { username: 'DisasterMaster', score: 980, completedTours: 3, badges: 4 },
            { username: 'EmergencyExpert', score: 750, completedTours: 2, badges: 3 },
            { username: this.currentUser.username, score: this.userProgress.score || 0, 
              completedTours: this.userProgress.completedTours?.length || 0, 
              badges: this.userProgress.badges?.length || 0 },
            { username: 'RescueRanger', score: 600, completedTours: 2, badges: 2 },
            { username: 'FirstAidFan', score: 450, completedTours: 1, badges: 1 }
        ]);
    }
    
    displayLeaderboard(leaderboard) {
        const modal = document.getElementById('leaderboard-modal');
        const tableBody = document.querySelector('#leaderboard-table tbody');
        
        tableBody.innerHTML = '';
        
        leaderboard.sort((a, b) => b.score - a.score).forEach((user, index) => {
            const row = document.createElement('tr');
            
            // Highlight current user
            if (user.username === this.currentUser.username) {
                row.style.background = 'rgba(0, 255, 136, 0.1)';
                row.style.fontWeight = 'bold';
            }
            
            // Add trophy emoji for top 3
            let rankIcon = '';
            if (index === 0) rankIcon = '🥇';
            else if (index === 1) rankIcon = '🥈';
            else if (index === 2) rankIcon = '🥉';
            
            row.innerHTML = `
                <td>${rankIcon} ${index + 1}</td>
                <td>${user.username}</td>
                <td>${user.score}</td>
                <td>${user.completedTours || 0}/4</td>
                <td>${user.badges || 0}</td>
            `;
            
            tableBody.appendChild(row);
        });
        
        modal.classList.remove('hidden');
    }
    
    toggleInstructions() {
        document.getElementById('instructions-modal').classList.remove('hidden');
    }
    
    showInfoModal(title, content) {
        document.getElementById('info-modal-title').textContent = title;
        document.getElementById('info-modal-body').innerHTML = content;
        document.getElementById('info-modal').classList.remove('hidden');
    }
    
    // Navigation methods
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.add('hidden');
        });
        document.getElementById(screenId).classList.remove('hidden');
    }
    
    startVRTour() {
        this.showScreen('vr-container');
        
        // Update UI
        document.getElementById('current-zone').textContent = 'Museum Plaza';
        document.getElementById('zone-description').textContent = 'Welcome to the Disaster Preparedness VR Museum. Click on portals to enter zones!';
        
        // Initialize VR scene interactions
        this.initializeVRInteractions();
        
        this.showNotification('VR Tour started! Click "F" first for full screen.', 'info');
    }
    
    exitVRTour() {
        this.showScreen('main-menu');
        // Stop any tour audio
        if (this.tourAudio) {
            this.tourAudio.pause();
            this.tourAudio.currentTime = 0;
        }
        this.showNotification('Exited VR Tour', 'info');
    }
    
    teleportToZone(zoneType) {
        const zonePositions = {
            earthquake: { x: 25, y: 1.6, z: -5 },
            fire: { x: -25, y: 1.6, z: -5 },
            flood: { x: 0, y: 1.6, z: 20 },
            typhoon: { x: 0, y: 1.6, z: -35 }
        };
        
        const pos = zonePositions[zoneType];
        if (pos) {
            // Move camera near the portal
            const cameraRig = document.getElementById('camera-rig');
            if (cameraRig) {
                cameraRig.setAttribute('position', `${pos.x} ${pos.y} ${pos.z + 5}`);
            }
            
            // Show notification
            const zoneNames = {
                earthquake: 'Earthquake Zone',
                fire: 'Fire Safety Zone',
                flood: 'Flood Preparedness Zone',
                typhoon: 'Typhoon Safety Zone'
            };
            
            this.showNotification(`Teleported to ${zoneNames[zoneType]} portal. Click the ring to enter!`, 'info');
        }
    }
    
    initializeVRInteractions() {
        // Add click handlers to portal rings
        document.querySelectorAll('.portal').forEach(portal => {
            portal.addEventListener('click', (e) => {
                e.stopPropagation();
                const zoneType = portal.getAttribute('data-zone');
                this.enterZone(zoneType);
            });
        });
        
        // Add click handler for museum entrance
        const entrance = document.querySelector('[data-action="enter-museum"]');
        if (entrance) {
            entrance.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showInfoModal('Museum Entrance', 
                    '<p>Welcome to the Disaster Preparedness VR Museum!</p>' +
                    '<p>Explore the four interactive zones to learn about different types of disasters:</p>' +
                    '<ul>' +
                    '<li><strong>Earthquake Zone</strong> (Red) - Learn seismic safety</li>' +
                    '<li><strong>Fire Safety Zone</strong> (Orange) - Master fire prevention</li>' +
                    '<li><strong>Flood Zone</strong> (Teal) - Prepare for flooding</li>' +
                    '<li><strong>Typhoon Zone</strong> (Blue) - Survive tropical storms</li>' +
                    '</ul>' +
                    '<p>Click on any portal ring to enter that zone!</p>');
            });
        }
        
        // Add click handlers for info points
        document.querySelectorAll('[data-action="show-info"]').forEach(point => {
            point.addEventListener('click', (e) => {
                e.stopPropagation();
                const infoType = point.getAttribute('data-info');
                if (infoType === 'welcome') {
                    this.showInfoModal('Welcome Information',
                        '<p>This VR museum teaches disaster preparedness through interactive experiences.</p>' +
                        '<p><strong>How to navigate:</strong></p>' +
                        '<ul>' +
                        '<li>Click on portal rings to enter disaster zones</li>' +
                        '<li>Use WASD keys to move around</li>' +
                        '<li>Click and drag to look around</li>' +
                        '<li>Press F for fullscreen</li>' +
                        '</ul>');
                } else if (infoType === 'controls') {
                    this.showInfoModal('Controls Guide',
                        '<p><strong>Movement Controls:</strong></p>' +
                        '<ul>' +
                        '<li><strong>W</strong> - Move forward</li>' +
                        '<li><strong>A</strong> - Move left</li>' +
                        '<li><strong>S</strong> - Move backward</li>' +
                        '<li><strong>D</strong> - Move right</li>' +
                        '<li><strong>Mouse</strong> - Look around</li>' +
                        '<li><strong>Click</strong> - Interact with objects</li>' +
                        '</ul>' +
                        '<p><strong>VR Mode:</strong> Click the VR button to enter virtual reality mode.</p>');
                }
            });
        });
    }
    
    enterZone(zoneType) {
        this.currentTour = zoneType;
        
        // Update UI
        const zoneNames = {
            earthquake: 'Earthquake Zone',
            fire: 'Fire Safety Zone',
            flood: 'Flood Preparedness Zone',
            typhoon: 'Typhoon Safety Zone'
        };
        
        const zoneDescriptions = {
            earthquake: 'Learn how to stay safe during earthquakes with interactive demonstrations',
            fire: 'Master fire prevention and response techniques',
            flood: 'Prepare for and respond to flooding events',
            typhoon: 'Survive and thrive through tropical storms'
        };
        
        document.getElementById('current-zone').textContent = zoneNames[zoneType];
        document.getElementById('zone-description').textContent = zoneDescriptions[zoneType];
        
        // Play zone audio
        this.playZoneAudio(zoneType);
        
        // Show success message
        this.showNotification(`Entering ${zoneNames[zoneType]}!`, 'success');
        
        // Mark tour as started in progress
        if (!this.userProgress.completedTours) {
            this.userProgress.completedTours = [];
        }
        
        // Add to completed tours if not already there
        if (!this.userProgress.completedTours.includes(zoneType)) {
            this.userProgress.completedTours.push(zoneType);
            this.addScore(50);
            this.awardBadge(`${zoneNames[zoneType]} Explorer`);
            this.updateProgressDisplay();
            this.saveProgress();
        }
    }
    
    playZoneAudio(zoneType) {
        // Stop any currently playing audio
        if (this.tourAudio) {
            this.tourAudio.pause();
            this.tourAudio.currentTime = 0;
        }
        
        if (this.audioEnabled) {
            this.tourAudio.volume = 0.5;
            this.tourAudio.play().catch(e => {
                console.log('Tour audio play failed:', e);
            });
        }
    }
    
    toggleTourAudio() {
        if (this.tourAudio.paused) {
            this.tourAudio.play();
            this.showNotification('Tour audio started', 'info');
        } else {
            this.tourAudio.pause();
            this.showNotification('Tour audio paused', 'info');
        }
    }
    
    startGame(gameType) {
        this.showScreen('game-container');
        
        switch(gameType) {
            case 'earthquake-hunt':
                museumGames.startEarthquakeHunt();
                break;
            case 'fire-safety':
                museumGames.startFireSafetyChallenge();
                break;
            case 'disaster-quiz':
                museumGames.startDisasterQuiz();
                break;
            case 'evacuation-sim':
                museumGames.startEvacuationSimulator();
                break;
        }
    }
    
    exitGame() {
        this.showScreen('main-menu');
        this.showNotification('Game exited', 'info');
    }
    
    openLearning(type) {
        this.showScreen('learning-container');
        this.loadLearningContent(type);
    }
    
    loadLearningContent(type) {
        const contentDiv = document.getElementById('learning-content');
        const titleDiv = document.getElementById('learning-title');
        
        const contentTypes = {
            'posters': {
                title: 'Safety Posters',
                content: `
                    <div class="learning-section">
                        <h3><i class="fas fa-images"></i> Safety Posters Gallery</h3>
                        <p>View safety posters for different disaster types:</p>
                        
                        <div class="posters-grid">
                            <div class="poster-card">
                                <h4><i class="fas fa-mountain"></i> Earthquake Safety</h4>
                                <div class="poster-placeholder">
                                    <i class="fas fa-image fa-4x"></i>
                                    <p>Drop, Cover, and Hold On</p>
                                </div>
                                <button class="btn-small" onclick="viewPoster('earthquake')">
                                    <i class="fas fa-eye"></i> View Poster
                                </button>
                            </div>
                            
                            <div class="poster-card">
                                <h4><i class="fas fa-fire"></i> Fire Safety</h4>
                                <div class="poster-placeholder">
                                    <i class="fas fa-image fa-4x"></i>
                                    <p>Fire Extinguisher PASS Method</p>
                                </div>
                                <button class="btn-small" onclick="viewPoster('fire')">
                                    <i class="fas fa-eye"></i> View Poster
                                </button>
                            </div>
                            
                            <div class="poster-card">
                                <h4><i class="fas fa-water"></i> Flood Safety</h4>
                                <div class="poster-placeholder">
                                    <i class="fas fa-image fa-4x"></i>
                                    <p>Flood Advisory</p>
                                </div>
                                <button class="btn-small" onclick="viewPoster('flood')">
                                    <i class="fas fa-eye"></i> View Poster
                                </button>
                            </div>
                            
                            <div class="poster-card">
                                <h4><i class="fas fa-wind"></i> Typhoon Safety</h4>
                                <div class="poster-placeholder">
                                    <i class="fas fa-image fa-4x"></i>
                                    <p>Typhoon Preparedness Checklist</p>
                                </div>
                                <button class="btn-small" onclick="viewPoster('typhoon')">
                                    <i class="fas fa-eye"></i> View Poster
                                </button>
                            </div>
                        </div>
                    </div>
                `
            },
            'videos': {
                title: 'Educational Videos',
                content: `
                    <div class="learning-section">
                        <h3><i class="fas fa-video"></i> Documentary Videos</h3>
                        <p>Watch educational videos about disaster preparedness:</p>
                        
                        <div class="videos-grid">
                            <div class="video-card">
                                <h4><i class="fas fa-play-circle"></i>Earthquake Simulation</h4>
                                <div class="video-placeholder">
                                    <i class="fas fa-film fa-4x"></i>
                                    <p>What happens when the ‘Big One’ hits Philippines?</p>
                                </div>
                                <button class="btn-small" onclick="playVideo('earthquake')">
                                    <i class="fas fa-play"></i> Watch Now
                                </button>
                            </div>
                            
                            <div class="video-card">
                                <h4><i class="fas fa-fire"></i> Fire Chief Interview</h4>
                                <div class="video-placeholder">
                                    <i class="fas fa-film fa-4x"></i>
                                    <p>Expert advice from experienced fire chiefs</p>
                                </div>
                                <button class="btn-small" onclick="playVideo('fire')">
                                    <i class="fas fa-play"></i> Watch Now
                                </button>
                            </div>
                            
                            <div class="video-card">
                                <h4><i class="fas fa-water"></i> Flood Survival Guide</h4>
                                <div class="video-placeholder">
                                    <i class="fas fa-film fa-4x"></i>
                                    <p>Essential tips for flood preparedness</p>
                                </div>
                                <button class="btn-small" onclick="playVideo('flood')">
                                    <i class="fas fa-play"></i> Watch Now
                                </button>
                            </div>
                            
                            <div class="video-card">
                                <h4><i class="fas fa-wind"></i> Typhoon Preparedness</h4>
                                <div class="video-placeholder">
                                    <i class="fas fa-film fa-4x"></i>
                                    <p>How to prepare for tropical storms</p>
                                </div>
                                <button class="btn-small" onclick="playVideo('typhoon')">
                                    <i class="fas fa-play"></i> Watch Now
                                </button>
                            </div>
                        </div>
                    </div>
                `
            },
            '3d-viewer': {
                title: '3D Artifact Viewer',
                content: `
                    <div class="learning-section">
                        <h3><i class="fas fa-cube"></i> 3D Safety Equipment</h3>
                        <p>Interact with 3D models of safety equipment:</p>
                        
                        <div class="artifact-viewer">
                            <div id="modelViewerContainer" style="width:100%; height:360px; border-radius:12px; overflow:hidden;">
                                <!-- A-Frame scene will be injected here -->
                            </div>

                            <div class="artifact-list">
                                <button class="artifact-btn" onclick="view3DModel('fire-extinguisher')">
                                    <i class="fas fa-fire-extinguisher"></i> Fire Extinguisher
                                </button>
                                <button class="artifact-btn" onclick="view3DModel('first-aid')">
                                    <i class="fas fa-first-aid"></i> First Aid Kit
                                </button>
                                <button class="artifact-btn" onclick="view3DModel('emergency-kit')">
                                    <i class="fas fa-suitcase"></i> Emergency Kit
                                </button>
                                <button class="artifact-btn" onclick="view3DModel('radio')">
                                    <i class="fas fa-broadcast-tower"></i> Emergency Radio
                                </button>
                            </div>
                        </div>
                    </div>
                `
            },
            'ar-mode': {
                title: 'AR Experience',
                content: `
                    <div class="learning-section">
                        <h3><i class="fas fa-mobile-alt"></i> Augmented Reality Mode</h3>
                        <p>Use your mobile device to view 3D objects in your environment:</p>
                        
                        <div class="ar-instructions">
                            <div class="instruction-step">
                                <div class="step-number">1</div>
                                <div class="step-content">
                                    <h4>Open on Mobile</h4>
                                    <p>Visit this website on your smartphone</p>
                                </div>
                            </div>
                            
                            <div class="instruction-step">
                                <div class="step-number">2</div>
                                <div class="step-content">
                                    <h4>Allow Camera Access</h4>
                                    <p>Grant permission to use your camera</p>
                                </div>
                            </div>
                            
                            <div class="instruction-step">
                                <div class="step-number">3</div>
                                <div class="step-content">
                                    <h4>Point & View</h4>
                                    <p>Point camera at surfaces to place 3D models</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="ar-models">
                            <h4>Available AR Models:</h4>
                            <div class="ar-model-list">
                                <div class="ar-model-item">
                                    <i class="fas fa-fire-extinguisher"></i>
                                    <span>Fire Extinguisher</span>
                                    <button class="btn-small" onclick="launchAR('fire-extinguisher')">
                                        <i class="fas fa-external-link-alt"></i> View in AR
                                    </button>
                                </div>
                                <div class="ar-model-item">
                                    <i class="fas fa-first-aid"></i>
                                    <span>First Aid Kit</span>
                                    <button class="btn-small" onclick="launchAR('first-aid')">
                                        <i class="fas fa-external-link-alt"></i> View in AR
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
        };
        
        const selectedType = contentTypes[type] || {
            title: 'Learning Zone',
            content: '<p>Select a learning category from the buttons above.</p>'
        };
        
        titleDiv.textContent = selectedType.title;
        contentDiv.innerHTML = selectedType.content;
    }
    
    closeLearning() {
        this.showScreen('main-menu');
    }
    
    // Achievement system
    awardBadge(badgeName) {
        if (!this.userProgress.badges) {
            this.userProgress.badges = [];
        }
        
        if (!this.userProgress.badges.includes(badgeName)) {
            this.userProgress.badges.push(badgeName);
            this.showNotification(`🏆 Badge Earned: ${badgeName}!`, 'success');
            this.updateProgressDisplay();
            this.saveProgress();
        }
    }
    
    addScore(points) {
        this.userProgress.score = (this.userProgress.score || 0) + points;
        this.updateProgressDisplay();
        this.saveProgress();
    }
    
    showNotification(message, type = 'info') {
        // Remove existing notifications
        document.querySelectorAll('.notification').forEach(n => n.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const icon = type === 'success' ? 'check-circle' : 
                    type === 'warning' ? 'exclamation-triangle' : 'info-circle';
        
        notification.innerHTML = `
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize the application
let museumApp;

function initializeApp() {
    museumApp = new DisasterPreparednessMuseum();
}

// Global functions for HTML onclick handlers
function loadTour(tourName) {
    if (museumApp) {
        museumApp.startVRTour();
        // Small delay to ensure scene is loaded
        setTimeout(() => {
            // Teleport to the specific zone portal
            museumApp.teleportToZone(tourName);
            museumApp.enterZone(tourName);
        }, 500);
    }
}

function startGame(gameType) {
    if (museumApp) {
        museumApp.startGame(gameType);
    }
}

function startGamePlay(gameType) {
    if (museumApp) {
        museumApp.showNotification(`Starting ${gameType.replace('-', ' ')}! Get ready!`, 'success');
        museumApp.addScore(25);
        // In a full implementation, this would start the actual game
        setTimeout(() => {
            museumApp.showNotification('Game completed! +100 points!', 'success');
            museumApp.addScore(100);
            museumApp.awardBadge('Game Champion');
        }, 2000);
    }
}

function showGameTips(gameType) {
    if (museumApp) {
        museumApp.showInfoModal('Game Tips', 
            `<p><strong>Tips for ${gameType.replace('-', ' ')}:</strong></p>
            <ul>
                <li>Take your time and think carefully</li>
                <li>Read all instructions before starting</li>
                <li>Look for visual clues in the environment</li>
                <li>Practice makes perfect!</li>
            </ul>`);
    }
}

function openLearning(type) {
    if (museumApp) {
        museumApp.openLearning(type);
    }
}

// Learning zone functions
function viewPoster(posterType) {
    if (!museumApp) return;

    const posters = {
        earthquake: {
            title: 'Earthquake Safety – Duck, Cover, and Hold',
            image: 'assets/posters/1.png',
            content: `
                <img src="assets/posters/placeholder.png" 
                     class="learning-poster-img"
                     data-poster="earthquake">

                <h4>Duck, Cover, and Hold</h4>
                <ul>
                    <li><strong>Duck</strong> – Drop to the ground to prevent falling.</li>
                    <li><strong>Cover</strong> – Protect your head and neck from debris.</li>
                    <li><strong>Hold</strong> – Stay in position until shaking stops.</li>
                </ul>
            `
        },

        fire: {
            title: 'Fire Safety – PASS Method',
            image: 'assets/posters/2.png',
            content: `
                <img src="assets/posters/placeholder.png" 
                     class="learning-poster-img"
                     data-poster="fire">

                <h4>PASS Method</h4>
                <ul>
                    <li><strong>P</strong> – Pull the pin.</li>
                    <li><strong>A</strong> – Aim at the base of the fire.</li>
                    <li><strong>S</strong> – Squeeze the handle.</li>
                    <li><strong>S</strong> – Sweep side to side.</li>
                </ul>
            `
        },

        flood: {
            title: 'Flood Advisory',
            image: 'assets/posters/3.png',
            content: `
                <img src="assets/posters/placeholder.png" 
                     class="learning-poster-img"
                     data-poster="flood">

                <h4>Flood Safety</h4>
                <p>Learn the different flood alert levels—from monitoring to severe flooding—and how authorities classify risk.</p>
            `
        },

        typhoon: {
            title: 'Typhoon Warning Signals',
            image: 'assets/posters/4.png',
            content: `
                <img src="assets/posters/placeholder.png" 
                     class="learning-poster-img"
                     data-poster="typhoon">

                <h4>Typhoon Safety</h4>
                <p>Prepare emergency supplies and know emergency hotlines.</p>
            `
        }
    };

    const poster = posters[posterType];
    if (!poster) return;

    museumApp.showInfoModal(poster.title, poster.content);

    // Replace placeholder with real image if available
    setTimeout(() => {
        const img = document.querySelector('.learning-poster-img');
        if (img) img.src = poster.image;
    }, 100);
}


function playVideo(videoType) {
    if (!museumApp) return;

    const videos = {
        earthquake: {
            title: 'Earthquake Simulation',
            src: 'assets/videos/earthquake_simulation.mp4'
        },
        fire: {
            title: 'Fire Safety Documentary',
            src: 'assets/videos/fire.mp4'
        },
        flood: {
            title: 'Flood Survival Guide',
            src: 'assets/videos/flood.mp4'
        },
        typhoon: {
            title: 'Typhoon Preparedness',
            src: 'assets/videos/typhoon.mp4'
        }
    };

    const video = videos[videoType];
    if (!video) return;

    museumApp.showInfoModal(
        video.title,
        `
        <video 
            src="${video.src}"
            controls
            autoplay
            style="width:100%; border-radius:10px; margin-top:10px;"
        >
            Your browser does not support the video tag.
        </video>
        `
    );

    museumApp.showNotification(`Playing ${videoType} video`, 'info');
}


function view3DModel(modelType) {
    const models = {
        'fire-extinguisher': 'assets/models/fire_extinguisher.glb',
        'first-aid': 'assets/models/first_aid_kit.glb',
        'emergency-kit': 'assets/models/flashlight.glb',
        'radio': 'assets/models/walkie_talkie.glb'
    };

    const src = models[modelType];
    if (!src) return;

    museumApp.showInfoModal(
        '3D Model Viewer',
        `
        <div id="modelViewerContainer" style="width:100%; height:360px; border-radius:12px; overflow:hidden;">
            <a-scene embedded background="color: transparent">
                <a-assets>
                    <a-asset-item id="modelAsset" src="${src}"></a-asset-item>
                </a-assets>

                <a-entity 
                    gltf-model="#modelAsset"
                    position="0 -0.5 -4"
                    rotation="0 45 0"
                    scale="1 1 1"
                    animation="property: rotation; to: 0 405 0; loop: true; dur: 30000; easing: linear">
                </a-entity>

                <a-entity camera position="0 1.2 3"></a-entity>
                <a-entity light="type: ambient; intensity: 0.9"></a-entity>
                <a-entity light="type: directional; intensity: 0.6" position="1 2 1"></a-entity>
            </a-scene>
        </div>
        `
    );
}

function launchAR(modelType) {
    if (museumApp) {
        museumApp.showNotification(`Launching AR view for ${modelType.replace('-', ' ')}`, 'info');
        museumApp.showInfoModal('AR Mode',
            `<p>AR mode would open on mobile devices.</p>
            <p>Point your camera at a flat surface to place the 3D ${modelType.replace('-', ' ')} in your environment.</p>`);
    }
}

function toggleAudio() {
    if (museumApp) {
        museumApp.toggleAudio();
    }
}

function toggleTourAudio() {
    if (museumApp) {
        museumApp.toggleTourAudio();
    }
}

function toggleVRMode() {
    if (museumApp) {
        museumApp.toggleVRMode();
    }
}

function toggleInstructions() {
    if (museumApp) {
        museumApp.toggleInstructions();
    }
}

function viewLeaderboard() {
    if (museumApp) {
        museumApp.viewLeaderboard();
    }
}

function closeLeaderboard() {
    if (museumApp) {
        document.getElementById('leaderboard-modal').classList.add('hidden');
    }
}

function closeInstructions() {
    if (museumApp) {
        document.getElementById('instructions-modal').classList.add('hidden');
    }
}

function closeInfoModal() {
    const modal = document.getElementById('info-modal');

    const video = modal.querySelector('video');
    if (video) {
        video.pause();
        video.currentTime = 0;
        video.remove(); 
    }

    modal.classList.add('hidden');
}


function changeUsername() {
    if (museumApp) {
        museumApp.changeUsername();
    }
}

function exitVRTour() {
    if (museumApp) {
        museumApp.exitVRTour();
    }
}

function exitGame() {
    if (museumApp) {
        museumApp.exitGame();
    }
}

function closeLearning() {
    if (museumApp) {
        museumApp.closeLearning();
    }
}

// Make functions globally available
window.initializeApp = initializeApp;
window.loadTour = loadTour;
window.startGame = startGame;
window.startGamePlay = startGamePlay;
window.showGameTips = showGameTips;
window.openLearning = openLearning;
window.viewPoster = viewPoster;
window.playVideo = playVideo;
window.view3DModel = view3DModel;
window.launchAR = launchAR;
window.toggleAudio = toggleAudio;
window.toggleTourAudio = toggleTourAudio;
window.toggleVRMode = toggleVRMode;
window.toggleInstructions = toggleInstructions;
window.viewLeaderboard = viewLeaderboard;
window.closeLeaderboard = closeLeaderboard;
window.closeInstructions = closeInstructions;
window.closeInfoModal = closeInfoModal;
window.changeUsername = changeUsername;
window.exitVRTour = exitVRTour;
window.exitGame = exitGame;
window.closeLearning = closeLearning;

// Fix scrolling issues
function fixScrolling() {
    // Enable body scrolling
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
    
    // Fix for VR container
    const vrContainer = document.getElementById('vr-container');
    if (vrContainer) {
        vrContainer.style.position = 'fixed';
        vrContainer.style.overflow = 'hidden';
    }
    
    // Fix for menu scrolling
    const menuContainer = document.querySelector('.menu-container');
    if (menuContainer) {
        menuContainer.style.overflowY = 'auto';
        menuContainer.style.minHeight = '100vh';
    }
}

// Call scrolling fix on load
window.addEventListener('load', fixScrolling);