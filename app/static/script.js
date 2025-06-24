// Tab switching
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Update active tab button
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');

        // Show active tab content
        const tabName = button.dataset.tab;
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        document.getElementById(tabName).classList.add('active');
    });
});

// World Clock
const timeDisplay = document.getElementById('current-time');
const timezoneSelect = document.getElementById('timezone-select');
const formatToggle = document.getElementById('format-toggle');

let is24HourFormat = true;

// Set default timezone to browser's timezone
const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
if (browserTimezone) {
    // Check if browser timezone exists in the options
    const optionExists = Array.from(timezoneSelect.options).some(
        option => option.value === browserTimezone
    );
    if (optionExists) {
        timezoneSelect.value = browserTimezone;
    }
}

// Toggle time format
formatToggle.addEventListener('change', () => {
    is24HourFormat = !formatToggle.checked;
    updateClock();
});

function updateClock() {
    const selectedTimezone = timezoneSelect.value;
    const now = new Date();
    const options = {
        timeZone: selectedTimezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: !is24HourFormat
    };
    const timeString = now.toLocaleTimeString('en-US', options);

    if (!is24HourFormat) {
        const timeParts = timeString.split(' ');
        const timeWithoutPeriod = timeParts[0];
        const period = timeParts[1] || '';
        timeDisplay.textContent = timeWithoutPeriod;
        const amPmDisplay = document.getElementById('am-pm');
        amPmDisplay.textContent = period;
    } else {
        timeDisplay.textContent = timeString;
        document.getElementById('am-pm').textContent = '';
    }
}

// Update clock every second
setInterval(updateClock, 1000);
updateClock(); // Initial update

// Stopwatch
const stopwatchDisplay = document.getElementById('stopwatch-display');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');

let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isPaused = false;

function formatTime(ms) {
    const date = new Date(ms);
    return date.toISOString().substr(11, 12);
}

function updateStopwatch() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    stopwatchDisplay.textContent = formatTime(elapsedTime);
}

startBtn.addEventListener('click', () => {
    if (timerInterval) return;

    if (isPaused) {
        startTime = Date.now() - elapsedTime;
    } else {
        startTime = Date.now();
    }

    timerInterval = setInterval(updateStopwatch, 10);
    isPaused = false;
});

stopBtn.addEventListener('click', () => {
    if (!timerInterval) return;

    clearInterval(timerInterval);
    timerInterval = null;
    isPaused = false;
});

pauseBtn.addEventListener('click', () => {
    if (!timerInterval) return;

    clearInterval(timerInterval);
    timerInterval = null;
    isPaused = true;
});

resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    isPaused = false;
    elapsedTime = 0;
    stopwatchDisplay.textContent = formatTime(elapsedTime);
});
