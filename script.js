// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Game elements
    const guessInput = document.getElementById('guess-input');
    const submitBtn = document.getElementById('submit-btn');
    const resetBtn = document.getElementById('reset-btn');
    const messageEl = document.getElementById('message');
    const attemptCountEl = document.getElementById('attempt-count');
    const guessListEl = document.getElementById('guess-list');
    const winModal = document.getElementById('win-modal');
    const finalAttemptsEl = document.getElementById('final-attempts');
    const playAgainBtn = document.getElementById('play-again');
    
    // Game variables
    let randomNumber;
    let attempts;
    let gameOver;
    
    // Initialize game
    function initGame() {
        randomNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 0;
        gameOver = false;
        
        // Reset UI
        guessInput.value = '';
        guessInput.disabled = false;
        submitBtn.disabled = false;
        messageEl.textContent = 'Make your first guess!';
        messageEl.style.background = 'rgba(255, 255, 255, 0.7)';
        attemptCountEl.textContent = '0';
        guessListEl.innerHTML = '';
        
        // Hide modal
        winModal.classList.remove('active');
        
        console.log('Random number:', randomNumber); // For testing
    }
    
    // Handle guess submission
    function submitGuess() {
        if (gameOver) return;
        
        const guess = parseInt(guessInput.value);
        
        // Validate input
        if (isNaN(guess) || guess < 1 || guess > 100) {
            showMessage('Please enter a valid number between 1 and 100', 'error');
            return;
        }
        
        // Increase attempts
        attempts++;
        attemptCountEl.textContent = attempts;
        
        // Add to guess list
        const guessItem = document.createElement('div');
        guessItem.className = 'guess-item';
        guessItem.textContent = guess;
        guessListEl.appendChild(guessItem);
        
        // Check guess
        if (guess === randomNumber) {
            // Correct guess
            showMessage(`🎉 Correct! The number was ${randomNumber}`, 'success');
            gameOver = true;
            guessInput.disabled = true;
            submitBtn.disabled = true;
            
            // Show win modal
            setTimeout(() => {
                finalAttemptsEl.textContent = attempts;
                winModal.classList.add('active');
            }, 1500);
        } else if (guess < randomNumber) {
            // Too low
            showMessage('📈 Too low! Try a higher number', 'low');
        } else {
            // Too high
            showMessage('📉 Too high! Try a lower number', 'high');
        }
        
        // Clear input
        guessInput.value = '';
        guessInput.focus();
    }
    
    // Show message with styling
    function showMessage(text, type) {
        messageEl.textContent = text;
        
        // Remove previous classes
        messageEl.className = '';
        messageEl.classList.add('message');
        
        // Add appropriate styling
        switch(type) {
            case 'success':
                messageEl.style.background = 'linear-gradient(to right, #00b09b, #96c93d)';
                messageEl.style.color = 'white';
                break;
            case 'low':
                messageEl.style.background = 'linear-gradient(to right, #2193b0, #6dd5ed)';
                messageEl.style.color = 'white';
                break;
            case 'high':
                messageEl.style.background = 'linear-gradient(to right, #ff416c, #ff4b2b)';
                messageEl.style.color = 'white';
                break;
            case 'error':
                messageEl.style.background = 'linear-gradient(to right, #ffd26f, #ff7d7d)';
                messageEl.style.color = 'white';
                break;
            default:
                messageEl.style.background = 'rgba(255, 255, 255, 0.7)';
                messageEl.style.color = '#333';
        }
    }
    
    // Event listeners
    submitBtn.addEventListener('click', submitGuess);
    
    guessInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            submitGuess();
        }
    });
    
    resetBtn.addEventListener('click', initGame);
    playAgainBtn.addEventListener('click', initGame);
    
    // Initialize the game
    initGame();
});