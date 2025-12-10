// Learning Tour Module
class LearningTourManager {
    constructor() {
        this.currentContent = null;
        this.artifacts = [
            {
                id: 'fire-extinguisher',
                name: 'Fire Extinguisher',
                description: 'Learn proper fire extinguisher usage with PASS technique',
                model: null, // Would be GLTF model in production
                poster: 'assets/posters/fire-poster.png'
            },
            {
                id: 'emergency-kit',
                name: 'Emergency Kit',
                description: 'Essential items for disaster preparedness',
                model: null,
                poster: 'assets/posters/earthquake-poster.png'
            },
            {
                id: 'first-aid',
                name: 'First Aid Kit',
                description: 'Medical supplies for emergency situations',
                model: null,
                poster: null
            },
            {
                id: 'water-purifier',
                name: 'Water Purifier',
                description: 'Clean water solutions during floods',
                model: null,
                poster: 'assets/posters/flood-poster.png'
            }
        ];
        
        this.videos = [
            {
                id: 'japan-earthquake',
                title: 'Japan Earthquake Documentary',
                src: 'assets/videos/japan-earthquake.mp4',
                description: 'Learn from the 2011 Japan earthquake and tsunami'
            },
            {
                id: 'fire-chief',
                title: 'Fire Chief Interview',
                src: 'assets/videos/fire-chief-interview.mp4',
                description: 'Expert advice from experienced fire chiefs'
            },
            {
                id: 'curator-talk',
                title: 'Curator Explanations',
                src: 'assets/videos/curator-talk.mp4',
                description: 'Detailed explanations from museum curator'
            },
            {
                id: 'philippine-typhoons',
                title: 'Philippine Typhoons',
                src: 'assets/videos/philippine-typhoons.mp4',
                description: 'Documentary on typhoon preparedness in the Philippines'
            }
        ];
    }
    
    loadContent(type) {
        const contentDiv = document.getElementById('learning-content');
        contentDiv.innerHTML = '';
        
        switch(type) {
            case 'posters':
                this.loadPosters(contentDiv);
                break;
            case 'videos':
                this.loadVideos(contentDiv);
                break;
            case '3d-viewer':
                this.load3DViewer(contentDiv);
                break;
            case 'ar-mode':
                this.loadARMode(contentDiv);
                break;
        }
        
        document.getElementById('learning-title').textContent = 
            type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ');
    }
    
    loadPosters(container) {
        container.innerHTML = `
            <div class="posters-grid">
                <div class="poster-card">
                    <h3><i class="fas fa-mountain"></i> Earthquake Safety</h3>
                    <div class="poster-image">
                        <img src="assets/posters/earthquake-poster.png" alt="Earthquake Safety Poster" 
                             onerror="this.src='https://via.placeholder.com/400x600/FF6B6B/FFFFFF?text=Earthquake+Safety'">
                    </div>
                    <div class="poster-info">
                        <h4>Drop, Cover, and Hold On</h4>
                        <p>Proper earthquake response technique that can save your life during seismic events.</p>
                        <ul>
                            <li>Drop to your hands and knees</li>
                            <li>Cover your head and neck</li>
                            <li>Hold on until shaking stops</li>
                        </ul>
                    </div>
                </div>
                
                <div class="poster-card">
                    <h3><i class="fas fa-fire"></i> Fire Safety</h3>
                    <div class="poster-image">
                        <img src="assets/posters/fire-poster.png" alt="Fire Safety Poster"
                             onerror="this.src='https://via.placeholder.com/400x600/FFA500/FFFFFF?text=Fire+Safety'">
                    </div>
                    <div class="poster-info">
                        <h4>Fire Extinguisher PASS Method</h4>
                        <p>Remember PASS when using a fire extinguisher:</p>
                        <ul>
                            <li>PULL the pin</li>
                            <li>AIM at the base of the fire</li>
                            <li>SQUEEZE the lever</li>
                            <li>SWEEP from side to side</li>
                        </ul>
                    </div>
                </div>
                
                <div class="poster-card">
                    <h3><i class="fas fa-water"></i> Flood Preparedness</h3>
                    <div class="poster-image">
                        <img src="assets/posters/flood-poster.png" alt="Flood Safety Poster"
                             onerror="this.src='https://via.placeholder.com/400x600/4ECDC4/FFFFFF?text=Flood+Safety'">
                    </div>
                    <div class="poster-info">
                        <h4>Flood Safety Guidelines</h4>
                        <p>Stay safe during flood events with these important tips:</p>
                        <ul>
                            <li>Move to higher ground immediately</li>
                            <li>Never walk or drive through flood waters</li>
                            <li>Avoid electrical equipment in wet areas</li>
                            <li>Listen to emergency broadcasts</li>
                        </ul>
                    </div>
                </div>
                
                <div class="poster-card">
                    <h3><i class="fas fa-wind"></i> Typhoon Safety</h3>
                    <div class="poster-image">
                        <img src="assets/posters/typhoon-poster.png" alt="Typhoon Safety Poster"
                             onerror="this.src='https://via.placeholder.com/400x600/45B7D1/FFFFFF?text=Typhoon+Safety'">
                    </div>
                    <div class="poster-info">
                        <h4>Typhoon Preparedness Checklist</h4>
                        <p>Prepare your home and family for approaching typhoons:</p>
                        <ul>
                            <li>Secure loose outdoor items</li>
                            <li>Stock emergency supplies for 3 days</li>
                            <li>Identify evacuation routes</li>
                            <li>Monitor weather updates regularly</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }
    
    loadVideos(container) {
        container.innerHTML = `
            <div class="videos-container">
                ${this.videos.map(video => `
                    <div class="video-card">
                        <h3><i class="fas fa-video"></i> ${video.title}</h3>
                        <div class="video-player">
                            <video controls poster="https://via.placeholder.com/640x360/2c5364/FFFFFF?text=${encodeURIComponent(video.title)}">
                                <source src="${video.src}" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <div class="video-info">
                            <p>${video.description}</p>
                            <button class="btn-small" onclick="playVideo('${video.id}')">
                                <i class="fas fa-play"></i> Play
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    load3DViewer(container) {
        container.innerHTML = `
            <div class="artifact-viewer">
                <div class="viewer-controls">
                    <h3>3D Artifact Viewer</h3>
                    <p>Rotate and examine safety equipment in 3D</p>
                    
                    <div class="artifact-selector">
                        ${this.artifacts.map(artifact => `
                            <button class="artifact-btn" onclick="selectArtifact('${artifact.id}')">
                                <i class="fas fa-cube"></i> ${artifact.name}
                            </button>
                        `).join('')}
                    </div>
                </div>
                
                <div class="viewer-canvas">
                    <div id="artifact-canvas">
                        <canvas id="3d-canvas" width="800" height="600"></canvas>
                    </div>
                    
                    <div class="artifact-info" id="artifact-info">
                        <h4>Select an artifact to view</h4>
                        <p>Click on any artifact button to load its 3D model</p>
                    </div>
                    
                    <div class="viewer-instructions">
                        <h4>Controls:</h4>
                        <ul>
                            <li>Click and drag to rotate</li>
                            <li>Mouse wheel to zoom</li>
                            <li>Right-click to pan</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        // Initialize 3D viewer
        this.initialize3DViewer();
    }
    
    initialize3DViewer() {
        // This is a simplified 3D viewer using Three.js
        // In a production environment, you would load actual 3D models
        
        const canvas = document.getElementById('3d-canvas');
        const infoDiv = document.getElementById('artifact-info');
        
        // Create placeholder 3D scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 800/600, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
        renderer.setSize(800, 600);
        
        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);
        
        // Add a placeholder cube
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshPhongMaterial({ color: 0x00ff88 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        
        camera.position.z = 5;
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
        animate();
        
        // Store for later use
        this.viewerScene = scene;
        this.viewerCamera = camera;
        this.viewerRenderer = renderer;
    }
    
    loadARMode(container) {
        container.innerHTML = `
            <div class="ar-container">
                <h3><i class="fas fa-mobile-alt"></i> AR Experience</h3>
                <p>Use your mobile device to view 3D safety equipment in your environment</p>
                
                <div class="ar-instructions">
                    <div class="instruction-step">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <h4>Scan QR Code</h4>
                            <p>Use your phone's camera to scan the marker</p>
                            <div class="qr-code">
                                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://your-domain.com/ar" 
                                     alt="AR Marker QR Code">
                            </div>
                        </div>
                    </div>
                    
                    <div class="instruction-step">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <h4>Point Camera</h4>
                            <p>Point your phone's camera at the marker image</p>
                            <div class="ar-marker">
                                <div class="marker-pattern">AR</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="instruction-step">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <h4>Interact</h4>
                            <p>View and interact with 3D models in your space</p>
                            <div class="ar-demo">
                                <i class="fas fa-cube fa-3x"></i>
                                <i class="fas fa-plus fa-2x"></i>
                                <i class="fas fa-mobile-alt fa-3x"></i>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="ar-features">
                    <h4>Available AR Models:</h4>
                    <div class="ar-model-list">
                        ${this.artifacts.map(artifact => `
                            <div class="ar-model">
                                <i class="fas fa-cube"></i>
                                <span>${artifact.name}</span>
                                <button class="btn-small" onclick="launchAR('${artifact.id}')">
                                    <i class="fas fa-external-link-alt"></i> View in AR
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="ar-note">
                    <p><i class="fas fa-info-circle"></i> <strong>Note:</strong> AR mode requires a mobile device with camera. 
                    For best experience, print the AR marker or display it on another screen.</p>
                </div>
            </div>
        `;
    }
    
    selectArtifact(artifactId) {
        const artifact = this.artifacts.find(a => a.id === artifactId);
        if (!artifact) return;
        
        const infoDiv = document.getElementById('artifact-info');
        infoDiv.innerHTML = `
            <h4>${artifact.name}</h4>
            <p>${artifact.description}</p>
            ${artifact.poster ? `
                <div class="artifact-poster">
                    <img src="${artifact.poster}" alt="${artifact.name} Poster" 
                         onerror="this.style.display='none'">
                </div>
            ` : ''}
            <div class="artifact-details">
                <h5>Features:</h5>
                <ul>
                    <li>Interactive 3D model</li>
                    <li>Detailed inspection</li>
                    <li>Usage instructions</li>
                    <li>Safety guidelines</li>
                </ul>
            </div>
        `;
        
        // In production, this would load the actual 3D model
        showNotification(`Loaded ${artifact.name} in 3D viewer`, 'success');
    }
}

// Initialize Learning Tour Manager
let learningTourManager = null;

function loadLearningContent(type) {
    if (!learningTourManager) {
        learningTourManager = new LearningTourManager();
    }
    learningTourManager.loadContent(type);
}

// AR functions
function launchAR(modelId) {
    showNotification(`Launching AR viewer for ${modelId}. Requires AR-capable device.`, 'info');
}

// Video functions
function playVideo(videoId) {
    const video = document.querySelector(`video[src*="${videoId}"]`);
    if (video) {
        video.play();
    }
}

// Export for use in main.js
window.loadLearningContent = loadLearningContent;
window.selectArtifact = (id) => learningTourManager?.selectArtifact(id);
window.playVideo = playVideo;
window.launchAR = launchAR;