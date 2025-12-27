AFRAME.registerComponent('auto-center-scale', {
    schema: {
        targetSize: { type: 'number', default: 1.5 }
    },

    init() {
        this.el.addEventListener('model-loaded', () => {
            const mesh = this.el.getObject3D('mesh');
            if (!mesh) return;

            // Compute bounding box
            const box = new THREE.Box3().setFromObject(mesh);
            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());

            // Center the model
            mesh.position.sub(center);

            // Uniform scale
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = this.data.targetSize / maxDim;

            this.el.setAttribute('scale', `${scale} ${scale} ${scale}`);
        });
    }
});

// Learning Tour Module
class LearningTourManager {
    constructor() {
        this.currentContent = null;
        this.artifacts = [
            {
                id: 'fire-extinguisher',
                name: 'Fire Extinguisher',
                description: 'Learn proper fire extinguisher usage with PASS technique',
                poster: 'assets/posters/fire-poster.png'
            },
            {
                id: 'first-aid',
                name: 'First Aid Kit',
                description: 'Medical supplies for emergency situations',
                poster: null
            },
            {
                id: 'emergency-kit',
                name: 'Emergency Kit',
                description: 'Essential emergency flashlight and tools',
                poster: null
            },
            {
                id: 'radio',
                name: 'Emergency Radio',
                description: 'Communication device for disasters',
                poster: null
            }
        ];

        
        this.videos = [
            {
                id: 'earthquake',
                title: 'Earthquake Simulation',
                src: 'assets/videos/earthquake_simulation.mp4',
                description: 'What happens when the ‘Big One’ hits Philippines?'
            },
            {
                id: 'fire',
                title: 'Fire Chief Interview',
                src: 'assets/videos/fire.mp4',
                description: 'Expert advice from experienced fire chiefs'
            },
            {
                id: 'curator-talk',
                title: 'Curator Explanations',
                src: 'assets/videos/curator-talk.mp4',
                description: 'Detailed explanations from museum curator'
            },
            {
                id: 'flood',
                title: 'Flood Preparedness',
                src: 'assets/videos/flood.mp4',
                description: 'Learn how to prepare for and respond to flooding'
            },
            {
                id: 'philippine-typhoons',
                title: 'Philippine Typhoons',
                src: 'assets/videos/typhoon.mp4',
                description: 'Documentary on typhoon preparedness in the Philippines'
            }
        ];
    }
    
    loadContent(type) {
        stopAllVideos();

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

            <div id="modelViewer" style="width:100%; height:360px; border-radius:12px; overflow:hidden;">
                <a-scene embedded background="color: transparent">
                    <a-assets>
                        <a-asset-item id="fire_extinguisher" src="assets/models/fire_extinguisher.glb"></a-asset-item>
                        <a-asset-item id="first_aid_kit" src="assets/models/first_aid_kit.glb"></a-asset-item>
                        <a-asset-item id="flashlight" src="assets/models/flashlight.glb"></a-asset-item>
                        <a-asset-item id="walkie_talkie" src="assets/models/walkie_talkie.glb"></a-asset-item>
                    </a-assets>

                    <a-entity id="artifactModel"
                            gltf-model="#fire_extinguisher"
                            auto-center-scale="targetSize: 1.6"
                            position="0 0 -6"
                            rotation="0 0 0">
                    </a-entity> 

                    <a-entity camera position="0 1.6 8"></a-entity>
                    <a-entity light="type: ambient; intensity: 0.9"></a-entity>
                    <a-entity light="type: directional; intensity: 0.6" position="2 4 3"></a-entity>
                </a-scene>
            </div>
        </div>
    `;
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
            const model = document.getElementById('artifactModel');
            if (!model) return;

            const modelMap = {
                'fire-extinguisher': '#fire_extinguisher',
                'first-aid': '#first_aid_kit',
                'emergency-kit': '#flashlight',
                'radio': '#walkie_talkie'
            };

            const scaleMap = {
                'fire-extinguisher': '0.05 0.05 0.05',
                'first-aid': '1 1 1',
                'emergency-kit': '1 1 1',
                'radio': '0.2 0.2 0.2'
            };

            // Reset before loading
            model.removeAttribute('gltf-model');
            model.setAttribute('scale', '0.05 0.05 0.05');
            model.setAttribute('position', '0 0 -6');
            model.setAttribute('rotation', '0 0 0');

            model.setAttribute('gltf-model', modelMap[artifactId]);

            model.addEventListener('model-loaded', () => {
                model.setAttribute('scale', scaleMap[artifactId]);

                // Re-add slow rotation AFTER load
                model.setAttribute('animation', {
                    property: 'rotation',
                    to: '0 360 0',
                    loop: true,
                    dur: 40000,
                    easing: 'linear'
                });
            }, { once: true });
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
    stopAllVideos();

    const videoCard = document.querySelector(
        `.video-card button[onclick*="${videoId}"]`
    )?.closest('.video-card');

    const video = videoCard?.querySelector('video');

    if (video) {
        video.play();
    }
}

function stopAllVideos() {
    document.querySelectorAll('video').forEach(video => {
        video.pause();
        video.currentTime = 0;
    });
}

// Export for use in main.js
window.loadLearningContent = loadLearningContent;
window.selectArtifact = (id) => learningTourManager?.selectArtifact(id);
window.playVideo = playVideo;
window.launchAR = launchAR;