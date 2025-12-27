// Interactive Games for Disaster Preparedness Museum
class MuseumGames {
    constructor() {
        this.currentGame = null;
        this.gameInterval = null;
        this.gameTime = 60;
        this.gameScore = 0;
        this.gameLives = 3;
    }

    // EARTHQUAKE HUNT GAME
    startEarthquakeHunt() {
        this.currentGame = 'earthquake-hunt';
        this.gameTime = 120;
        this.gameScore = 0;
        this.gameLives = 3;
        
        const gameArea = document.getElementById('game-area');
        gameArea.innerHTML = `
            <div class="game-earthquake-hunt">
                <h2><i class="fas fa-search"></i> Earthquake Safety Hunt</h2>
                <p class="game-description">Find safety items in the room before time runs out!</p>
                
                <div class="game-stats-bar">
                    <div class="stat-box">
                        <i class="fas fa-clock"></i>
                        <span>Time: <span id="timer">${this.gameTime}s</span></span>
                    </div>
                    <div class="stat-box">
                        <i class="fas fa-star"></i>
                        <span>Score: <span id="score">0</span></span>
                    </div>
                    <div class="stat-box">
                        <i class="fas fa-heart"></i>
                        <span>Lives: <span id="lives">3</span></span>
                    </div>
                    <div class="stat-box">
                        <i class="fas fa-bullseye"></i>
                        <span>Found: <span id="found">0/10</span></span>
                    </div>
                </div>
                
                <div class="game-instructions">
                    <p><strong>How to play:</strong> Click on safety items hidden in the room. Find all 10 items before time runs out!</p>
                </div>
                
                <div class="hunt-room" id="hunt-room">
                    <!-- Items will be dynamically placed -->
                </div>
                
                <div class="game-controls">
                    <button class="btn-primary" onclick="museumGames.startGame()">
                        <i class="fas fa-play"></i> Start Hunt
                    </button>
                    <button class="btn-secondary" onclick="museumGames.exitGame()">
                        <i class="fas fa-times"></i> Exit Game
                    </button>
                </div>
                
                <div class="item-list">
                    <h4>Items to find:</h4>
                    <div class="items-grid" id="items-list">
                        <!-- Items list will be generated -->
                    </div>
                </div>
            </div>
        `;
        
        this.createEarthquakeItems();
    }

    createEarthquakeItems() {
        const room = document.getElementById('hunt-room');
        const itemsList = document.getElementById('items-list');
        
        const safetyItems = [
            { name: 'First Aid Kit', icon: 'first-aid', points: 10 },
            { name: 'Flashlight', icon: 'flashlight', points: 8 },
            { name: 'Emergency Radio', icon: 'broadcast-tower', points: 12 },
            { name: 'Water Bottles', icon: 'water', points: 6 },
            { name: 'Whistle', icon: 'bullhorn', points: 5 },
            { name: 'Blanket', icon: 'bed', points: 7 },
            { name: 'Helmet', icon: 'hard-hat', points: 15 },
            { name: 'Fire Extinguisher', icon: 'fire-extinguisher', points: 12 },
            { name: 'Emergency Food', icon: 'utensils', points: 8 },
            { name: 'Safety Goggles', icon: 'glasses', points: 7 }
        ];
        
        // Clear previous items
        room.innerHTML = '';
        itemsList.innerHTML = '';
        
        // Create items list
        safetyItems.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'item-to-find';
            itemElement.id = `item-${index}`;
            itemElement.innerHTML = `
                <i class="fas fa-${item.icon}"></i>
                <span>${item.name}</span>
                <span class="item-points">+${item.points}</span>
                <div class="item-found" id="found-${index}">❌</div>
            `;
            itemsList.appendChild(itemElement);
        });
        
        // Place items randomly in the room
        safetyItems.forEach((item, index) => {
            const x = Math.random() * 80 + 10; // 10-90%
            const y = Math.random() * 70 + 15; // 15-85%
            
            const itemBox = document.createElement('div');
            itemBox.className = 'hidden-item';
            itemBox.id = `hidden-item-${index}`;
            itemBox.style.left = `${x}%`;
            itemBox.style.top = `${y}%`;
            itemBox.innerHTML = `<i class="fas fa-${item.icon}"></i>`;
            itemBox.dataset.index = index;
            itemBox.dataset.name = item.name;
            itemBox.dataset.points = item.points;
            
            itemBox.addEventListener('click', () => {
                this.collectItem(index, item.name, item.points);
            });
            
            room.appendChild(itemBox);
        });
    }

    collectItem(index, name, points) {
        const itemElement = document.getElementById(`hidden-item-${index}`);
        const foundElement = document.getElementById(`found-${index}`);
        
        if (itemElement && !itemElement.classList.contains('found')) {
            // Mark as found
            itemElement.classList.add('found');
            foundElement.textContent = '✓';
            foundElement.style.color = '#00ff88';
            
            // Add points
            this.gameScore += points;
            document.getElementById('score').textContent = this.gameScore;
            
            // Update found count
            const foundCount = document.querySelectorAll('.found').length;
            document.getElementById('found').textContent = `${foundCount}/10`;
            
            // Show success message
            this.showGameMessage(`Found ${name}! +${points} points`, 'success');
            
            // Check if all items found
            if (foundCount === 10) {
                this.gameWin();
            }
        }
    }

    // FIRE SAFETY CHALLENGE GAME
    startFireSafetyChallenge() {
        this.currentGame = 'fire-safety';
        this.gameTime = 90;
        this.gameScore = 0;
        this.gameLives = 3;
        
        const gameArea = document.getElementById('game-area');
        gameArea.innerHTML = `
            <div class="game-fire-safety">
                <h2><i class="fas fa-fire-extinguisher"></i> Fire Safety Challenge</h2>
                <p class="game-description">Put out fires using the correct fire extinguisher type!</p>
                
                <div class="game-stats-bar">
                    <div class="stat-box">
                        <i class="fas fa-clock"></i>
                        <span>Time: <span id="timer">${this.gameTime}s</span></span>
                    </div>
                    <div class="stat-box">
                        <i class="fas fa-star"></i>
                        <span>Score: <span id="score">0</span></span>
                    </div>
                    <div class="stat-box">
                        <i class="fas fa-heart"></i>
                        <span>Lives: <span id="lives">3</span></span>
                    </div>
                    <div class="stat-box">
                        <i class="fas fa-fire"></i>
                        <span>Fires: <span id="fires-left">8</span></span>
                    </div>
                </div>
                
                <div class="game-instructions">
                    <p><strong>How to play:</strong> Match the fire type with the correct extinguisher. Click fires to put them out!</p>
                    <div class="extinguisher-types">
                        <div class="ext-type" data-type="A">
                            <i class="fas fa-fire"></i> Type A: Wood/Paper
                        </div>
                        <div class="ext-type" data-type="B">
                            <i class="fas fa-gas-pump"></i> Type B: Flammable Liquids
                        </div>
                        <div class="ext-type" data-type="C">
                            <i class="fas fa-bolt"></i> Type C: Electrical
                        </div>
                        <div class="ext-type" data-type="D">
                            <i class="fas fa-industry"></i> Type D: Metals
                        </div>
                    </div>
                </div>
                
                <div class="fire-room" id="fire-room">
                    <!-- Fires will be dynamically placed -->
                </div>
                
                <div class="extinguisher-selector">
                    <h4>Select Extinguisher:</h4>
                    <div class="extinguisher-options">
                        <button class="ext-btn" data-type="A" onclick="museumGames.selectExtinguisher('A')">
                            <i class="fas fa-fire"></i> Type A
                        </button>
                        <button class="ext-btn" data-type="B" onclick="museumGames.selectExtinguisher('B')">
                            <i class="fas fa-gas-pump"></i> Type B
                        </button>
                        <button class="ext-btn" data-type="C" onclick="museumGames.selectExtinguisher('C')">
                            <i class="fas fa-bolt"></i> Type C
                        </button>
                        <button class="ext-btn" data-type="D" onclick="museumGames.selectExtinguisher('D')">
                            <i class="fas fa-industry"></i> Type D
                        </button>
                    </div>
                    <div class="selected-ext" id="selected-ext">
                        <p>No extinguisher selected</p>
                    </div>
                </div>
                
                <div class="game-controls">
                    <button class="btn-primary" onclick="museumGames.startGame()">
                        <i class="fas fa-play"></i> Start Challenge
                    </button>
                    <button class="btn-secondary" onclick="museumGames.exitGame()">
                        <i class="fas fa-times"></i> Exit Game
                    </button>
                </div>
            </div>
        `;
        
        this.createFireElements();
        this.selectedExtinguisher = null;
    }

    createFireElements() {
        const fireRoom = document.getElementById('fire-room');
        fireRoom.innerHTML = '';
        
        const fireTypes = ['A', 'B', 'C', 'D'];
        const fireIcons = {
            'A': 'fas fa-tree',
            'B': 'fas fa-gas-pump',
            'C': 'fas fa-plug',
            'D': 'fas fa-cog'
        };
        
        for (let i = 0; i < 8; i++) {
            const fireType = fireTypes[Math.floor(Math.random() * fireTypes.length)];
            const x = Math.random() * 80 + 10;
            const y = Math.random() * 70 + 15;
            
            const fire = document.createElement('div');
            fire.className = 'fire-element';
            fire.dataset.type = fireType;
            fire.id = `fire-${i}`;
            fire.style.left = `${x}%`;
            fire.style.top = `${y}%`;
            fire.innerHTML = `<i class="${fireIcons[fireType]}"></i>`;
            
            fire.addEventListener('click', () => {
                this.extinguishFire(i, fireType);
            });
            
            fireRoom.appendChild(fire);
        }
    }

    selectExtinguisher(type) {
        this.selectedExtinguisher = type;
        const selectedExt = document.getElementById('selected-ext');
        const typeNames = {
            'A': 'Type A (Wood/Paper fires)',
            'B': 'Type B (Flammable liquids)',
            'C': 'Type C (Electrical fires)',
            'D': 'Type D (Metal fires)'
        };
        selectedExt.innerHTML = `<p>Selected: <strong>${typeNames[type]}</strong></p>`;
        
        // Highlight selected button
        document.querySelectorAll('.ext-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        document.querySelector(`.ext-btn[data-type="${type}"]`).classList.add('selected');
    }

    extinguishFire(fireId, fireType) {
        if (!this.selectedExtinguisher) {
            this.showGameMessage('Select an extinguisher first!', 'warning');
            return;
        }
        
        const fireElement = document.getElementById(`fire-${fireId}`);
        
        if (fireElement && !fireElement.classList.contains('extinguished')) {
            if (this.selectedExtinguisher === fireType) {
                // Correct extinguisher
                fireElement.classList.add('extinguished');
                this.gameScore += 25;
                document.getElementById('score').textContent = this.gameScore;
                
                const firesLeft = document.querySelectorAll('.fire-element:not(.extinguished)').length;
                document.getElementById('fires-left').textContent = firesLeft;
                
                this.showGameMessage(`Correct! Fire extinguished! +25 points`, 'success');
                
                if (firesLeft === 0) {
                    this.gameWin();
                }
            } else {
                // Wrong extinguisher
                this.gameLives--;
                document.getElementById('lives').textContent = this.gameLives;
                
                this.showGameMessage(`Wrong extinguisher! Fire spread! -1 life`, 'warning');
                
                if (this.gameLives <= 0) {
                    this.gameOver();
                }
            }
        }
    }

    // DISASTER QUIZ GAME
    startDisasterQuiz() {
        this.currentGame = 'disaster-quiz';
        this.gameTime = 180;
        this.gameScore = 0;
        this.currentQuestion = 0;
        
        const gameArea = document.getElementById('game-area');
        gameArea.innerHTML = `
            <div class="game-disaster-quiz">
                <h2><i class="fas fa-question-circle"></i> Disaster Preparedness Quiz</h2>
                <p class="game-description">Test your knowledge about disaster safety!</p>
                
                <div class="game-stats-bar">
                    <div class="stat-box">
                        <i class="fas fa-clock"></i>
                        <span>Time: <span id="timer">${this.gameTime}s</span></span>
                    </div>
                    <div class="stat-box">
                        <i class="fas fa-star"></i>
                        <span>Score: <span id="score">0</span></span>
                    </div>
                    <div class="stat-box">
                        <i class="fas fa-list-ol"></i>
                        <span>Question: <span id="question-num">1/10</span></span>
                    </div>
                    <div class="stat-box">
                        <i class="fas fa-percentage"></i>
                        <span>Correct: <span id="correct">0%</span></span>
                    </div>
                </div>
                
                <div class="quiz-container" id="quiz-container">
                    <!-- Questions will be loaded here -->
                </div>
                
                <div class="game-controls">
                    <button class="btn-primary" onclick="museumGames.startGame()">
                        <i class="fas fa-play"></i> Start Quiz
                    </button>
                    <button class="btn-secondary" onclick="museumGames.exitGame()">
                        <i class="fas fa-times"></i> Exit Game
                    </button>
                </div>
            </div>
        `;
        
        this.loadQuizQuestions();
    }

    loadQuizQuestions() {
        const quizContainer = document.getElementById('quiz-container');
        
        const questions = [
            {
                question: "What should you do DURING an earthquake?",
                options: [
                    "Run outside immediately",
                    "Drop, cover, and hold on",
                    "Stand in a doorway",
                    "Use the elevator"
                ],
                correct: 1,
                explanation: "Drop, cover, and hold on is the safest action during an earthquake."
            },
            {
                question: "Which fire extinguisher type is for electrical fires?",
                options: [
                    "Type A",
                    "Type B", 
                    "Type C",
                    "Type D"
                ],
                correct: 2,
                explanation: "Type C extinguishers are for electrical fires."
            },
            {
                question: "What's the minimum emergency water supply per person?",
                options: [
                    "1 gallon for 1 day",
                    "3 gallons for 3 days",
                    "1 liter for 1 week",
                    "5 gallons for 2 days"
                ],
                correct: 1,
                explanation: "Store at least 1 gallon of water per person per day for 3 days."
            },
            {
                question: "When should you evacuate for a hurricane?",
                options: [
                    "When you see dark clouds",
                    "When officials issue evacuation orders",
                    "When it starts raining",
                    "When winds reach 50 mph"
                ],
                correct: 1,
                explanation: "Always follow official evacuation orders immediately."
            },
            {
                question: "What does PASS stand for in fire safety?",
                options: [
                    "Pull, Aim, Squeeze, Sweep",
                    "Push, Alert, Spray, Stop",
                    "Point, Activate, Spray, Sweep",
                    "Pull, Act, Spray, Stop"
                ],
                correct: 0,
                explanation: "PASS: Pull the pin, Aim at base, Squeeze lever, Sweep side to side."
            },
            {
                question: "Where should you go during a tornado warning?",
                options: [
                    "Highest floor of building",
                    "Near windows to monitor",
                    "Basement or interior room",
                    "Outside away from trees"
                ],
                correct: 2,
                explanation: "Go to the lowest level, smallest interior room without windows."
            },
            {
                question: "How often should you test smoke alarms?",
                options: [
                    "Once a year",
                    "Once a month",
                    "Every 6 months",
                    "Only when battery is low"
                ],
                correct: 1,
                explanation: "Test smoke alarms monthly and replace batteries yearly."
            },
            {
                question: "What should be in a basic emergency kit?",
                options: [
                    "Water, food, flashlight, radio",
                    "TV, computer, phone, charger",
                    "Books, games, snacks, drinks",
                    "Clothes, shoes, jewelry, cash"
                ],
                correct: 0,
                explanation: "Basic kit: Water, non-perishable food, flashlight, battery-powered radio."
            },
            {
                question: "What's the safe distance from downed power lines?",
                options: [
                    "10 feet",
                    "30 feet",
                    "50 feet",
                    "100 feet"
                ],
                correct: 1,
                explanation: "Stay at least 30 feet away from downed power lines."
            },
            {
                question: "When flooding occurs, what should you do?",
                options: [
                    "Drive through flood waters",
                    "Move to higher ground",
                    "Stay in your car",
                    "Wait for rescue"
                ],
                correct: 1,
                explanation: "Immediately move to higher ground. Never drive through flood waters."
            }
        ];
        
        this.quizQuestions = questions;
        this.displayQuestion(0);
    }

    displayQuestion(questionNum) {
        const quizContainer = document.getElementById('quiz-container');
        const question = this.quizQuestions[questionNum];
        
        quizContainer.innerHTML = `
            <div class="quiz-question">
                <h3>Question ${questionNum + 1}: ${question.question}</h3>
                <div class="quiz-options">
                    ${question.options.map((option, index) => `
                        <button class="quiz-option" onclick="museumGames.answerQuestion(${index}, ${questionNum})">
                            ${String.fromCharCode(65 + index)}. ${option}
                        </button>
                    `).join('')}
                </div>
                <div class="quiz-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${(questionNum / this.quizQuestions.length) * 100}%"></div>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('question-num').textContent = `${questionNum + 1}/${this.quizQuestions.length}`;
    }

    answerQuestion(selectedOption, questionNum) {
        const question = this.quizQuestions[questionNum];
        const isCorrect = selectedOption === question.correct;
        
        if (isCorrect) {
            this.gameScore += 20;
            this.showGameMessage(`Correct! ${question.explanation}`, 'success');
        } else {
            this.showGameMessage(`Incorrect. ${question.explanation}`, 'warning');
        }
        
        // Update score display
        document.getElementById('score').textContent = this.gameScore;
        
        // Update correct percentage
        const correctAnswers = Math.floor(this.gameScore / 20);
        const percentage = Math.round((correctAnswers / (questionNum + 1)) * 100);
        document.getElementById('correct').textContent = `${percentage}%`;
        
        // Move to next question or end quiz
        if (questionNum < this.quizQuestions.length - 1) {
            setTimeout(() => {
                this.displayQuestion(questionNum + 1);
            }, 1500);
        } else {
            setTimeout(() => {
                this.endQuiz();
            }, 1500);
        }
    }

    endQuiz() {
        const correctAnswers = Math.floor(this.gameScore / 20);
        const percentage = Math.round((correctAnswers / this.quizQuestions.length) * 100);
        
        const quizContainer = document.getElementById('quiz-container');
        quizContainer.innerHTML = `
            <div class="quiz-results">
                <h3><i class="fas fa-trophy"></i> Quiz Complete!</h3>
                <div class="result-stats">
                    <div class="result-stat">
                        <i class="fas fa-star"></i>
                        <span>Final Score: ${this.gameScore}</span>
                    </div>
                    <div class="result-stat">
                        <i class="fas fa-check-circle"></i>
                        <span>Correct: ${correctAnswers}/${this.quizQuestions.length}</span>
                    </div>
                    <div class="result-stat">
                        <i class="fas fa-percentage"></i>
                        <span>Accuracy: ${percentage}%</span>
                    </div>
                </div>
                
                <div class="result-message">
                    ${percentage >= 80 ? 
                        '<p class="success"><i class="fas fa-crown"></i> Excellent! You\'re a disaster preparedness expert!</p>' :
                    percentage >= 60 ? 
                        '<p class="good"><i class="fas fa-thumbs-up"></i> Good job! You know your safety basics!</p>' :
                        '<p class="improve"><i class="fas fa-book"></i> Keep learning! Review the safety information.</p>'
                    }
                </div>
                
                <button class="btn-primary" onclick="museumGames.restartQuiz()">
                    <i class="fas fa-redo"></i> Try Again
                </button>
            </div>
        `;
        
        // Stop timer
        clearInterval(this.gameInterval);
        
        // Award points based on performance
        const bonus = Math.floor(this.gameScore * 0.5);
        this.gameScore += bonus;
        museumApp.addScore(this.gameScore);
        
        if (percentage >= 80) {
            museumApp.awardBadge('Quiz Master');
        }
    }

    restartQuiz() {
        this.startDisasterQuiz();
    }

    // EVACUATION SIMULATOR GAME
    startEvacuationSimulator() {
        this.currentGame = 'evacuation-sim';
        this.gameTime = 120;
        this.gameScore = 0;
        this.gameLives = 3;
        this.playerPosition = { x: 50, y: 80 };
        this.exitPosition = { x: 50, y: 10 };
        this.hazards = [];
        this.collectibles = [];
        
        const gameArea = document.getElementById('game-area');
        gameArea.innerHTML = `
            <div class="game-evacuation-sim">
                <h2><i class="fas fa-running"></i> Evacuation Simulator</h2>
                <p class="game-description">Navigate to the exit while avoiding hazards!</p>
                
                <div class="game-stats-bar">
                    <div class="stat-box">
                        <i class="fas fa-clock"></i>
                        <span>Time: <span id="timer">${this.gameTime}s</span></span>
                    </div>
                    <div class="stat-box">
                        <i class="fas fa-star"></i>
                        <span>Score: <span id="score">0</span></span>
                    </div>
                    <div class="stat-box">
                        <i class="fas fa-heart"></i>
                        <span>Lives: <span id="lives">3</span></span>
                    </div>
                    <div class="stat-box">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>Distance: <span id="distance">--</span></span>
                    </div>
                </div>
                
                <div class="game-instructions">
                    <p><strong>How to play:</strong> Use arrow keys to move to the exit (🏁). Avoid hazards (🔥⚡) and collect safety items (⭐).</p>
                    <div class="controls-info">
                        <p><i class="fas fa-arrow-up"></i> Move Up | <i class="fas fa-arrow-down"></i> Move Down</p>
                        <p><i class="fas fa-arrow-left"></i> Move Left | <i class="fas fa-arrow-right"></i> Move Right</p>
                    </div>
                </div>
                
                <div class="evacuation-map" id="evacuation-map" tabindex="0">
                    <!-- Game map will be drawn here -->
                </div>
                
                <div class="game-controls">
                    <button class="btn-primary" onclick="museumGames.startGame()">
                        <i class="fas fa-play"></i> Start Simulation
                    </button>
                    <button class="btn-secondary" onclick="museumGames.exitGame()">
                        <i class="fas fa-times"></i> Exit Game
                    </button>
                </div>
                
                <div class="legend">
                    <h4>Legend:</h4>
                    <div class="legend-items">
                        <div class="legend-item">
                            <span class="player-legend">😊</span> You
                        </div>
                        <div class="legend-item">
                            <span class="exit-legend">🏁</span> Exit
                        </div>
                        <div class="legend-item">
                            <span class="hazard-legend">🔥</span> Hazard
                        </div>
                        <div class="legend-item">
                            <span class="collectible-legend">⭐</span> Safety Item
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.setupEvacuationMap();
        this.setupKeyboardControls();
    }

    setupEvacuationMap() {
        const map = document.getElementById('evacuation-map');
        map.innerHTML = '';
        
        // Create exit
        const exit = document.createElement('div');
        exit.className = 'map-exit';
        exit.id = 'map-exit';
        exit.style.left = `${this.exitPosition.x}%`;
        exit.style.top = `${this.exitPosition.y}%`;
        exit.innerHTML = '🏁';
        map.appendChild(exit);
        
        // Create player
        const player = document.createElement('div');
        player.className = 'map-player';
        player.id = 'map-player';
        player.style.left = `${this.playerPosition.x}%`;
        player.style.top = `${this.playerPosition.y}%`;
        player.innerHTML = '😊';
        map.appendChild(player);
        
        // Create hazards (5-8 hazards)
        this.hazards = [];
        for (let i = 0; i < Math.floor(Math.random() * 4) + 5; i++) {
            const hazard = {
                id: `hazard-${i}`,
                x: Math.random() * 80 + 10,
                y: Math.random() * 70 + 15,
                type: Math.random() > 0.5 ? 'fire' : 'electric'
            };
            this.hazards.push(hazard);
            
            const hazardEl = document.createElement('div');
            hazardEl.className = 'map-hazard';
            hazardEl.id = hazard.id;
            hazardEl.style.left = `${hazard.x}%`;
            hazardEl.style.top = `${hazard.y}%`;
            hazardEl.innerHTML = hazard.type === 'fire' ? '🔥' : '⚡';
            map.appendChild(hazardEl);
        }
        
        // Create collectibles (3-5 items)
        this.collectibles = [];
        for (let i = 0; i < Math.floor(Math.random() * 3) + 3; i++) {
            const collectible = {
                id: `collectible-${i}`,
                x: Math.random() * 80 + 10,
                y: Math.random() * 70 + 15,
                collected: false
            };
            this.collectibles.push(collectible);
            
            const collectibleEl = document.createElement('div');
            collectibleEl.className = 'map-collectible';
            collectibleEl.id = collectible.id;
            collectibleEl.style.left = `${collectible.x}%`;
            collectibleEl.style.top = `${collectible.y}%`;
            collectibleEl.innerHTML = '⭐';
            map.appendChild(collectibleEl);
        }
        
        // Update distance display
        this.updateDistance();
    }

    setupKeyboardControls() {
        document.addEventListener('keydown', (e) => {
            if (this.currentGame !== 'evacuation-sim' || !this.gameInterval) return;
            
            const moveAmount = 5;
            let moved = false;
            
            switch(e.key) {
                case 'ArrowUp':
                    this.playerPosition.y = Math.max(5, this.playerPosition.y - moveAmount);
                    moved = true;
                    break;
                case 'ArrowDown':
                    this.playerPosition.y = Math.min(95, this.playerPosition.y + moveAmount);
                    moved = true;
                    break;
                case 'ArrowLeft':
                    this.playerPosition.x = Math.max(5, this.playerPosition.x - moveAmount);
                    moved = true;
                    break;
                case 'ArrowRight':
                    this.playerPosition.x = Math.min(95, this.playerPosition.x + moveAmount);
                    moved = true;
                    break;
            }
            
            if (moved) {
                this.updatePlayerPosition();
                this.checkCollisions();
                this.updateDistance();
                
                // Check if reached exit
                const distance = this.calculateDistance(this.playerPosition, this.exitPosition);
                if (distance < 8) {
                    this.gameWin();
                }
            }
        });
    }

    updatePlayerPosition() {
        const player = document.getElementById('map-player');
        if (player) {
            player.style.left = `${this.playerPosition.x}%`;
            player.style.top = `${this.playerPosition.y}%`;
        }
    }

    updateDistance() {
        const distance = this.calculateDistance(this.playerPosition, this.exitPosition);
        document.getElementById('distance').textContent = Math.round(distance) + ' units';
    }

    calculateDistance(pos1, pos2) {
        return Math.sqrt(Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2));
    }

    checkCollisions() {
        // Check hazard collisions
        this.hazards.forEach(hazard => {
            const distance = this.calculateDistance(this.playerPosition, { x: hazard.x, y: hazard.y });
            if (distance < 10) {
                this.hitHazard();
                // Remove hazard after hit
                const hazardEl = document.getElementById(hazard.id);
                if (hazardEl) hazardEl.remove();
            }
        });
        
        // Check collectible collisions
        this.collectibles.forEach(collectible => {
            if (!collectible.collected) {
                const distance = this.calculateDistance(this.playerPosition, { x: collectible.x, y: collectible.y });
                if (distance < 8) {
                    this.collectItem(collectible);
                }
            }
        });
    }

    hitHazard() {
        this.gameLives--;
        document.getElementById('lives').textContent = this.gameLives;
        
        this.showGameMessage('Hit a hazard! -1 life', 'warning');
        
        if (this.gameLives <= 0) {
            this.gameOver();
        }
    }

    collectItem(collectible) {
        collectible.collected = true;
        this.gameScore += 30;
        document.getElementById('score').textContent = this.gameScore;
        
        // Remove collectible from display
        const collectibleEl = document.getElementById(collectible.id);
        if (collectibleEl) {
            collectibleEl.style.opacity = '0.3';
            collectibleEl.innerHTML = '✓';
        }
        
        this.showGameMessage('Collected safety item! +30 points', 'success');
    }

    // COMMON GAME FUNCTIONS
    startGame() {
        // Start the game timer
        clearInterval(this.gameInterval);
        this.gameInterval = setInterval(() => {
            this.gameTime--;
            document.getElementById('timer').textContent = `${this.gameTime}s`;
            
            if (this.gameTime <= 0) {
                this.gameOver();
            }
            
            // For evacuation sim, move hazards randomly
            if (this.currentGame === 'evacuation-sim' && this.gameInterval) {
                this.moveHazards();
            }
        }, 1000);
        
        this.showGameMessage('Game started! Good luck!', 'info');
        
        // Focus on evacuation map for keyboard controls
        if (this.currentGame === 'evacuation-sim') {
            document.getElementById('evacuation-map').focus();
        }
    }

    moveHazards() {
        this.hazards.forEach(hazard => {
            // Random movement
            hazard.x += (Math.random() - 0.5) * 4;
            hazard.y += (Math.random() - 0.5) * 4;
            
            // Keep within bounds
            hazard.x = Math.max(5, Math.min(95, hazard.x));
            hazard.y = Math.max(5, Math.min(95, hazard.y));
            
            const hazardEl = document.getElementById(hazard.id);
            if (hazardEl) {
                hazardEl.style.left = `${hazard.x}%`;
                hazardEl.style.top = `${hazard.y}%`;
            }
        });
        
        // Re-check collisions after moving hazards
        this.checkCollisions();
    }

    gameWin() {
        clearInterval(this.gameInterval);
        
        let bonus = 0;
        switch(this.currentGame) {
            case 'earthquake-hunt':
                bonus = this.gameTime * 2;
                this.showGameMessage(`Congratulations! You found all items with ${this.gameTime}s remaining! Bonus: +${bonus} points`, 'success');
                museumApp.awardBadge('Safety Scout');
                break;
            case 'fire-safety':
                bonus = this.gameTime;
                this.showGameMessage(`Excellent! All fires extinguished! Bonus: +${bonus} points`, 'success');
                museumApp.awardBadge('Fire Fighter');
                break;
            case 'evacuation-sim':
                bonus = this.gameTime * 3;
                this.showGameMessage(`Safe evacuation! Reached the exit! Bonus: +${bonus} points`, 'success');
                museumApp.awardBadge('Evacuation Expert');
                break;
        }
        
        this.gameScore += bonus;
        museumApp.addScore(this.gameScore);
        
        // Show win screen
        setTimeout(() => {
            const gameArea = document.getElementById('game-area');
            gameArea.innerHTML += `
                <div class="game-win-overlay">
                    <div class="win-content">
                        <h2><i class="fas fa-trophy"></i> Victory!</h2>
                        <p>Final Score: <strong>${this.gameScore}</strong></p>
                        <p>Time Bonus: +${bonus}</p>
                        <button class="btn-primary" onclick="museumGames.playAgain()">
                            <i class="fas fa-redo"></i> Play Again
                        </button>
                        <button class="btn-secondary" onclick="museumGames.exitGame()">
                            <i class="fas fa-home"></i> Return to Menu
                        </button>
                    </div>
                </div>
            `;
        }, 1000);
    }

    gameOver() {
        clearInterval(this.gameInterval);
        
        let message = '';
        switch(this.currentGame) {
            case 'earthquake-hunt':
                message = 'Time ran out! Try to find items faster next time.';
                break;
            case 'fire-safety':
                message = 'Too many fires spread! Be careful with extinguisher selection.';
                break;
            case 'disaster-quiz':
                message = 'Quiz time expired! Study the safety information.';
                break;
            case 'evacuation-sim':
                message = 'Evacuation failed! Watch out for hazards.';
                break;
        }
        
        this.showGameMessage(`Game Over! ${message}`, 'warning');
        
        // Still award some points
        if (this.gameScore > 0) {
            museumApp.addScore(Math.floor(this.gameScore / 2));
        }
        
        // Show game over screen
        setTimeout(() => {
            const gameArea = document.getElementById('game-area');
            gameArea.innerHTML += `
                <div class="game-over-overlay">
                    <div class="over-content">
                        <h2><i class="fas fa-times-circle"></i> Game Over</h2>
                        <p>${message}</p>
                        <p>Score: <strong>${this.gameScore}</strong></p>
                        <button class="btn-primary" onclick="museumGames.playAgain()">
                            <i class="fas fa-redo"></i> Try Again
                        </button>
                        <button class="btn-secondary" onclick="museumGames.exitGame()">
                            <i class="fas fa-home"></i> Return to Menu
                        </button>
                    </div>
                </div>
            `;
        }, 1000);
    }

    playAgain() {
        switch(this.currentGame) {
            case 'earthquake-hunt':
                this.startEarthquakeHunt();
                break;
            case 'fire-safety':
                this.startFireSafetyChallenge();
                break;
            case 'disaster-quiz':
                this.startDisasterQuiz();
                break;
            case 'evacuation-sim':
                this.startEvacuationSimulator();
                break;
        }
    }

    exitGame() {
        clearInterval(this.gameInterval);
        museumApp.exitGame();
    }

    showGameMessage(message, type) {
        // Remove existing game messages
        document.querySelectorAll('.game-message').forEach(msg => msg.remove());
        
        const messageEl = document.createElement('div');
        messageEl.className = `game-message game-message-${type}`;
        messageEl.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        const gameArea = document.querySelector('.game-area');
        if (gameArea) {
            gameArea.appendChild(messageEl);
            
            // Auto-remove after 3 seconds
            setTimeout(() => {
                if (messageEl.parentNode) {
                    messageEl.classList.add('fade-out');
                    setTimeout(() => messageEl.remove(), 300);
                }
            }, 3000);
        }
    }
}

// Create global instance
const museumGames = new MuseumGames();

// Update main.js to use these games
// In main.js, replace startGame() function with:
function startGame(gameType) {
    if (museumApp) {
        museumApp.showScreen('game-container');
        
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
}

// Make games globally available
window.museumGames = museumGames;
window.startGame = startGame;