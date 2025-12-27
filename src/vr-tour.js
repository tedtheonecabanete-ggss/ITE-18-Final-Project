// VR Tour Components
class VRTourManager {
    constructor() {
        this.currentTour = null;
        this.tours = {
            earthquake: {
                name: "Earthquake Preparedness Zone",
                description: "Learn how to stay safe during earthquakes",
                audio: "assets/audio/earthquake-tour.mp3",
                zones: [
                    { position: "5 1.6 0", content: "Drop, Cover, and Hold On station" },
                    { position: "10 1.6 0", content: "Seismic safety equipment display" },
                    { position: "15 1.6 0", content: "Building retrofitting demonstration" }
                ]
            },
            fire: {
                name: "Fire Safety Zone",
                description: "Master fire prevention and response techniques",
                audio: "assets/audio/fire-tour.mp3",
                zones: [
                    { position: "-5 1.6 0", content: "Fire extinguisher training" },
                    { position: "-10 1.6 0", content: "Smoke detector installation guide" },
                    { position: "-15 1.6 0", content: "Evacuation route planning" }
                ]
            },
            flood: {
                name: "Flood Preparedness Zone",
                description: "Prepare for and respond to flooding events",
                audio: "assets/audio/flood-tour.mp3",
                zones: [
                    { position: "0 1.6 5", content: "Flood barrier demonstration" },
                    { position: "0 1.6 10", content: "Water safety equipment" },
                    { position: "0 1.6 15", content: "Post-flood recovery guide" }
                ]
            },
            typhoon: {
                name: "Typhoon Safety Zone",
                description: "Survive and thrive through tropical storms",
                audio: "assets/audio/typhoon-tour.mp3",
                zones: [
                    { position: "0 1.6 -5", content: "Wind resistance building design" },
                    { position: "0 1.6 -10", content: "Emergency kit preparation" },
                    { position: "0 1.6 -15", content: "Storm tracking and alerts" }
                ]
            }
        };
        
        this.audio = null;
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Scene loaded event
        document.querySelector('a-scene').addEventListener('loaded', () => {
            this.initializeScene();
            this.enablePortalClicks();  
        });
    }
    
    initializeScene() {
        // Create grid texture for ground
        const gridCanvas = document.createElement('canvas');
        gridCanvas.width = 512;
        gridCanvas.height = 512;
        const ctx = gridCanvas.getContext('2d');
        
        // Draw grid pattern
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 2;
        
        for (let i = 0; i <= 512; i += 32) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, 512);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(512, i);
            ctx.stroke();
        }
        
        // Create texture
        const texture = new THREE.CanvasTexture(gridCanvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(25, 25);
        
        // Add texture to scene
        const sceneEl = document.querySelector('a-scene');
        sceneEl.renderer.systems.material.textures['grid-texture'] = texture;
        
        // Create museum rooms
        this.createMuseumRooms();
    }
    
    enablePortalClicks() {
    const portals = document.querySelectorAll('.portal');

    portals.forEach(portal => {
        portal.addEventListener('click', (e) => {
            e.stopPropagation();

            const zone = portal.getAttribute('data-zone');
            if (!zone) return;

            console.log('[PORTAL CLICKED]', zone);

            this.loadTour(zone);
            this.applyZoneEnvironment(zone);

            if (window.museumApp) {
                museumApp.enterZone(zone);
            }
        });
    });
}


    createMuseumRooms() {
        const scene = document.querySelector('a-scene');
        
        // Museum walls
        const wallHeight = 5;
        const wallThickness = 0.5;
        
        // Create four exhibition halls
        const halls = [
            { position: "12 0 0", color: "#FF6B6B", label: "Earthquake Zone" },
            { position: "-12 0 0", color: "#FFA500", label: "Fire Safety Zone" },
            { position: "0 0 12", color: "#4ECDC4", label: "Flood Zone" },
            { position: "0 0 -12", color: "#45B7D1", label: "Typhoon Zone" }
        ];
        
        halls.forEach((hall, index) => {
            // Create hall building
            const hallEntity = document.createElement('a-entity');
            hallEntity.setAttribute('position', hall.position);
            
            // Main hall structure
            const hallBox = document.createElement('a-box');
            hallBox.setAttribute('width', '8');
            hallBox.setAttribute('height', wallHeight);
            hallBox.setAttribute('depth', '8');
            hallBox.setAttribute('color', hall.color);
            hallBox.setAttribute('opacity', '0.7');
            hallBox.classList.add('clickable');
            hallBox.setAttribute('onclick', `enterZone('${hall.label.toLowerCase().replace(' zone', '')}')`);
            
            // Entrance
            const entrance = document.createElement('a-box');
            entrance.setAttribute('position', '0 1 -4');
            entrance.setAttribute('width', '3');
            entrance.setAttribute('height', '3');
            entrance.setAttribute('depth', '0.1');
            entrance.setAttribute('color', '#8B4513');
            
            // Label
            const label = document.createElement('a-text');
            label.setAttribute('value', hall.label);
            label.setAttribute('align', 'center');
            label.setAttribute('position', '0 3 4.5');
            label.setAttribute('color', '#FFF');
            label.setAttribute('width', '10');
            
            hallEntity.appendChild(hallBox);
            hallEntity.appendChild(entrance);
            hallEntity.appendChild(label);
            scene.appendChild(hallEntity);
        });
        
        // Information kiosks
        this.createInfoKiosks();
    }
    
    createInfoKiosks() {
        const scene = document.querySelector('a-scene');
        
        const infoPoints = [
            { position: "5 1.6 -5", title: "Welcome", content: "Explore disaster preparedness through interactive zones" },
            { position: "-5 1.6 -5", title: "Safety First", content: "Always prioritize personal safety in emergencies" },
            { position: "-5 1.6 5", title: "Be Prepared", content: "Preparation saves lives during disasters" },
            { position: "5 1.6 5", title: "Stay Informed", content: "Monitor official alerts and warnings" }
        ];
        
        infoPoints.forEach((point, index) => {
            const kiosk = document.createElement('a-entity');
            kiosk.setAttribute('position', point.position);
            
            // Kiosk stand
            const stand = document.createElement('a-cylinder');
            stand.setAttribute('radius', '0.2');
            stand.setAttribute('height', '1');
            stand.setAttribute('color', '#666');
            stand.setAttribute('position', '0 0.5 0');
            
            // Info panel
            const panel = document.createElement('a-plane');
            panel.setAttribute('width', '2');
            panel.setAttribute('height', '1');
            panel.setAttribute('color', '#FFF');
            panel.setAttribute('position', '0 1.5 0.2');
            panel.setAttribute('material', 'shader: flat; side: double');
            panel.classList.add('clickable');
            panel.setAttribute('onclick', `showInfoDialog('${point.title}', '${point.content}')`);
            
            // Title
            const title = document.createElement('a-text');
            title.setAttribute('value', point.title);
            title.setAttribute('align', 'center');
            title.setAttribute('position', '0 0.2 0.01');
            title.setAttribute('color', '#000');
            title.setAttribute('width', '1.8');
            
            panel.appendChild(title);
            kiosk.appendChild(stand);
            kiosk.appendChild(panel);
            scene.appendChild(kiosk);
        });
    }
    
    loadTour(tourName) {
        if (this.tours[tourName]) {
            this.currentTour = this.tours[tourName];
            
            // Update UI
            document.getElementById('current-tour').textContent = this.currentTour.name;
            document.getElementById('tour-description').textContent = this.currentTour.description;
            
            // Play audio guide
            this.playAudioGuide();
            
            // Create tour markers
            this.createTourMarkers();
            
            // Award progress
            if (museumApp) {
                museumApp.completeTour(tourName);
            }
        }
    }
    
    playAudioGuide() {
        if (this.audio) {
            this.audio.stop();
        }
        
        if (museumApp && museumApp.audioEnabled && this.currentTour.audio) {
            this.audio = new Howl({
                src: [this.currentTour.audio],
                volume: 0.5,
                onend: () => {
                    console.log('Audio guide finished');
                }
            });
            this.audio.play();
        }
    }
    
    createTourMarkers() {
        const scene = document.querySelector('a-scene');
        
        // Remove existing markers
        const oldMarkers = scene.querySelectorAll('.tour-marker');
        oldMarkers.forEach(marker => marker.remove());
        
        // Create new markers
        if (this.currentTour && this.currentTour.zones) {
            this.currentTour.zones.forEach((zone, index) => {
                const marker = document.createElement('a-entity');
                marker.classList.add('tour-marker');
                marker.setAttribute('position', zone.position);
                
                // Create glowing sphere
                const sphere = document.createElement('a-sphere');
                sphere.setAttribute('radius', '0.5');
                sphere.setAttribute('color', '#00FF88');
                sphere.setAttribute('animation', 'property: scale; to: 1.2 1.2 1.2; dir: alternate; dur: 1000; loop: true');
                sphere.setAttribute('material', 'shader: flat; emissive: #00FF88; emissiveIntensity: 0.5');
                
                // Create info panel
                const panel = document.createElement('a-plane');
                panel.setAttribute('width', '2');
                panel.setAttribute('height', '0.8');
                panel.setAttribute('color', '#000');
                panel.setAttribute('position', '0 1.5 0');
                panel.setAttribute('material', 'opacity: 0.8; shader: flat');
                
                const text = document.createElement('a-text');
                text.setAttribute('value', zone.content);
                text.setAttribute('align', 'center');
                text.setAttribute('position', '0 0 0.01');
                text.setAttribute('color', '#FFF');
                text.setAttribute('width', '1.8');
                text.setAttribute('wrap-count', '20');
                
                panel.appendChild(text);
                marker.appendChild(sphere);
                marker.appendChild(panel);
                scene.appendChild(marker);
            });
        }
    }

        applyZoneEnvironment(zone) {
            const env = document.getElementById('environment');
            if (!env) return;

            env.innerHTML = ''; // clear old environment

            if (zone === 'earthquake') {
                env.innerHTML = `
                    <a-cone position="-10 1 -10" radius-bottom="2" height="3" color="#556B2F"></a-cone>
                    <a-box position="5 0.5 5" rotation="0 0 25" width="2" height="1" depth="2" color="#777"></a-box>
                `;
            }

            if (zone === 'fire') {
                env.innerHTML = `
                    <a-cone position="-10 1 -10" radius-bottom="2" height="3" color="#2F2F2F"></a-cone>
                    <a-cone position="10 1 10" radius-bottom="2" height="3" color="#1C1C1C"></a-cone>
                `;
            }

            if (zone === 'flood') {
                env.innerHTML = `
                    <a-plane position="0 0.2 0" rotation="-90 0 0" width="50" height="50"
                            material="color: #1E90FF; opacity: 0.5"></a-plane>
                `;
            }

            if (zone === 'typhoon') {
                env.innerHTML = `
                    <a-cone position="-10 1 -10" radius-bottom="2" height="3" color="#2E8B57"
                            animation="property: rotation; to: 0 0 15; dir: alternate; dur: 1000; loop: true">
                    </a-cone>
                `;
            }
        }


}

// Initialize VR Tour Manager
let vrTourManager = null;

function initializeVRTour() {
    if (!vrTourManager) {
        vrTourManager = new VRTourManager();
    }
}

// Global functions for A-Frame onClick
function enterMuseum() {
    showInfoDialog('Welcome', 'Welcome to the Disaster Preparedness VR Museum! Explore the four zones to learn about different types of disasters and how to prepare for them.');
}

function enterZone(zoneName) {
    vrTourManager.loadTour(zoneName);
    vrTourManager.applyZoneEnvironment(zoneName);
    showNotification(`Entering ${zoneName} zone`, 'info');
}

function showInfoDialog(title, content) {
    if (museumApp) {
        museumApp.showNotification(`${title}: ${content}`, 'info');
    }
}

// Export for use in main.js
window.initializeVRTour = initializeVRTour;
window.vrTourManager = vrTourManager;