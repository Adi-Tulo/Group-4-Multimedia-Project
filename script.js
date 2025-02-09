let intervalId;
let timerIntervalId;
let currentLight = 0; // 0: red, 1: yellow, 2: green
let timeRemaining = 10; // 1 minute for each light

const redLight = document.getElementById('red');
const yellowLight = document.getElementById('yellow');
const greenLight = document.getElementById('green');
const timeRemainingDisplay = document.getElementById('timeRemaining');

const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');

// Function to update the timer display
function updateTimer() {
  const minutes = Math.floor(timeRemaining / 10);
  const seconds = timeRemaining % 10;
  timeRemainingDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Function to change the traffic light
function changeLight() {
  // Turn off all lights
  redLight.style.backgroundColor = '#555';
  yellowLight.style.backgroundColor = '#555';
  greenLight.style.backgroundColor = '#555';

  // Turn on the current light
  if (currentLight === 0) {
    redLight.style.backgroundColor = '#ff0000';
    currentLight = 1; // Next light is yellow
  } else if (currentLight === 1) {
    yellowLight.style.backgroundColor = '#ffff00';
    currentLight = 2; // Next light is green
  } else if (currentLight === 2) {
    greenLight.style.backgroundColor = '#00ff00';
    currentLight = 0; // Next light is red
  }

  // Reset the timer for the new light
  timeRemaining = 10;
  updateTimer();
}

// Function to start the timer
function startTimer() {
  timerIntervalId = setInterval(() => {
    timeRemaining--;
    updateTimer();
    if (timeRemaining <= 0) {
      changeLight();
    }
  }, 1000); // Update every second
}

// Start the simulation
startBtn.addEventListener('click', () => {
  if (!intervalId) {
    changeLight(); // Initialize the first light
    startTimer(); // Start the timer
    intervalId = setInterval(changeLight, 60000); // Change light every 60 seconds
    startBtn.disabled = true;
    stopBtn.disabled = false;
  }
});

// Stop the simulation
stopBtn.addEventListener('click', () => {
  if (intervalId) {
    clearInterval(intervalId);
    clearInterval(timerIntervalId);
    intervalId = null;
    timerIntervalId = null;
    startBtn.disabled = false;
    stopBtn.disabled = true;

    // Turn off all lights when stopped
    redLight.style.backgroundColor = '#555';
    yellowLight.style.backgroundColor = '#555';
    greenLight.style.backgroundColor = '#555';

    // Reset the timer display
    timeRemaining = 10;
    updateTimer();
  }
});