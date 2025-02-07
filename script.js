const lastYearInput = document.getElementById('lastYear');
const themeToggle = document.getElementById('themeToggle');

// Load saved settings
chrome.storage.local.get(['theme', 'lastYear'], (result) => {
    const currentTheme = result.theme || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggle.innerHTML = currentTheme === 'light' ? '🌙' : '☀️';

    if (result.lastYear) {
        lastYearInput.value = result.lastYear;
        updateCountdown();
    }
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    themeToggle.innerHTML = newTheme === 'light' ? '🌙' : '☀️';
    chrome.storage.local.set({ theme: newTheme });
});

// Save and update last year
lastYearInput.addEventListener('input', () => {
    if (lastYearInput.value) {
        chrome.storage.local.set({ lastYear: lastYearInput.value });
        updateCountdown();
    }
});

function updateCountdown() {
    const lastYear = parseInt(lastYearInput.value);
    if (!lastYear) return;

    const endDate = new Date(lastYear, 0, 1); // January 1st of the last year
    const now = new Date();
    const timeDiff = endDate - now;

    if (timeDiff > 0) {
        document.getElementById('years').textContent = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
        document.getElementById('months').textContent = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
        document.getElementById('days').textContent = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
        document.getElementById('hours').textContent = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById('minutes').textContent = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById('seconds').textContent = Math.floor((timeDiff % (1000 * 60)) / 1000);
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);

