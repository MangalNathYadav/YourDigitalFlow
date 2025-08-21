// DOM Elements
const authScreen = document.getElementById('auth-screen');
const appContent = document.getElementById('app-content');
const timelineTab = document.getElementById('timeline-tab');
const addEntryTab = document.getElementById('add-entry-tab');
const profileTab = document.getElementById('profile-tab');
const navItems = document.querySelectorAll('.nav-item');
const currentDateEl = document.getElementById('current-date');
const currentDateText = document.getElementById('current-date-text');
const prevDateBtn = document.getElementById('prev-date');
const nextDateBtn = document.getElementById('next-date');
const newEntryInput = document.getElementById('new-entry');
const entryDateInput = document.getElementById('entry-date');
const entryTimeInput = document.getElementById('entry-time');
const entryMoodInput = document.getElementById('entry-mood');
const entryWeatherInput = document.getElementById('entry-weather');
const entryTagsInput = document.getElementById('entry-tags');
const addEntryBtn = document.getElementById('add-entry-btn');
const timeline = document.querySelector('.timeline');
const noEntries = document.getElementById('no-entries');
const toast = document.getElementById('toast');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const googleLoginBtn = document.getElementById('google-login-btn');
const logoutBtn = document.getElementById('logout-btn');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const registerNameInput = document.getElementById('register-name');
const registerEmailInput = document.getElementById('register-email');
const registerPasswordInput = document.getElementById('register-password');
const registerConfirmInput = document.getElementById('register-confirm');
const registerThemeInput = document.getElementById('register-theme');
const profileThemeInput = document.getElementById('profile-theme');
const profileAvatar = document.getElementById('profile-avatar');
const profileName = document.getElementById('profile-name');
const profileEmail = document.getElementById('profile-email');
const entriesCount = document.getElementById('entries-count');
const streakCount = document.getElementById('streak-count');
const sinceCount = document.getElementById('since-count');
const displayNameInput = document.getElementById('display-name');
const saveProfileBtn = document.getElementById('save-profile-btn');
const avatarUpload = document.getElementById('avatar-upload');
const openCalendarBtn = document.getElementById('open-calendar');
const calendarModal = document.getElementById('calendar-modal');
const closeModalBtn = document.querySelector('.close-modal');
const calendarGrid = document.getElementById('calendar-grid');
const calendarMonthEl = document.getElementById('calendar-month');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const loginToggle = document.getElementById('login-toggle');
const registerToggle = document.getElementById('register-toggle');
const showLogin = document.getElementById('show-login');
const showRegister = document.getElementById('show-register');
const particlesContainer = document.getElementById('particles');
// Daily Quote Card Elements
const dailyQuoteText = document.getElementById('daily-quote-text');
const dailyQuoteAuthor = document.getElementById('daily-quote-author');

// Daily Quotes Array
const DAILY_QUOTES = [
    { text: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { text: "Success is not in what you have, but who you are.", author: "Bo Bennett" },
    { text: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Unknown" },
    { text: "Dream bigger. Do bigger.", author: "Unknown" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "Great things never come from comfort zones.", author: "Unknown" },
    { text: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
    { text: "Success doesn't just find you. You have to go out and get it.", author: "Unknown" },
    { text: "The only place where success comes before work is in the dictionary.", author: "Vidal Sassoon" },
    { text: "Don't stop when you're tired. Stop when you're done.", author: "Marilyn Monroe" }
];

// Show daily quote based on date
function showDailyQuote() {
    const today = new Date();
    // Use day of year for deterministic daily quote
    const start = new Date(today.getFullYear(), 0, 0);
    const diff = today - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const idx = dayOfYear % DAILY_QUOTES.length;
    const quote = DAILY_QUOTES[idx];
    if (dailyQuoteText && dailyQuoteAuthor) {
        dailyQuoteText.textContent = `"${quote.text}"`;
        dailyQuoteAuthor.textContent = `— ${quote.author}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    showDailyQuote();
});

// Set India/Kolkata timezone (UTC+5:30)
const IST_OFFSET = 5.5 * 60 * 60 * 1000;

// Get current date with IST offset
function getCurrentISTDate() {
    const now = new Date();
    return new Date(now.getTime() + IST_OFFSET);
}

// Format dates for display in IST
function formatDateIST(date) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        timeZone: 'Asia/Kolkata'
    };
    return date.toLocaleDateString('en-IN', options);
}

// Format date for input fields in IST
function formatDateForInputIST(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Format time for input fields in IST
function formatTimeForInputIST(date) {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

// Get start of day in IST (UTC timestamp)
function getStartOfDayIST(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
}

// Get end of day in IST (UTC timestamp)
function getEndOfDayIST(date) {
    const d = new Date(date);
    d.setHours(23, 59, 59, 999);
    return d.getTime();
}

// Initialize with current IST date
const nowIST = getCurrentISTDate();
const todayIST = new Date(nowIST.getFullYear(), nowIST.getMonth(), nowIST.getDate());
let currentViewDate = todayIST;
let userEntries = [];
let currentCalendarMonth = nowIST.getMonth();
let currentCalendarYear = nowIST.getFullYear();

// Set initial dates
if (entryDateInput) entryDateInput.value = formatDateForInputIST(nowIST);
if (entryTimeInput) entryTimeInput.value = formatTimeForInputIST(nowIST);
if (currentDateText) currentDateText.textContent = formatDateIST(currentViewDate);

// Create floating particles for background
function createParticles() {
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size
        const size = Math.random() * 30 + 10;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random animation duration
        particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
        
        // Random color
        const colors = ['rgba(67, 97, 238, 0.3)', 'rgba(114, 9, 183, 0.3)', 'rgba(76, 201, 240, 0.3)'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        particlesContainer.appendChild(particle);
    }
}

// Auth form toggle
function showLoginForm() {
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
    loginToggle.classList.add('active');
    registerToggle.classList.remove('active');
}

function showRegisterForm() {
    registerForm.classList.add('active');
    loginForm.classList.remove('active');
    registerToggle.classList.add('active');
    loginToggle.classList.remove('active');
}

// Add event listeners for toggling
if (loginToggle && registerToggle && showLogin && showRegister) {
    loginToggle.addEventListener('click', showLoginForm);
    registerToggle.addEventListener('click', showRegisterForm);
    showLogin.addEventListener('click', showLoginForm);
    showRegister.addEventListener('click', showRegisterForm);
}

// Navigation functionality
if (navItems) {
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            navItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Hide all tabs
            timelineTab.classList.remove('active');
            addEntryTab.classList.remove('active');
            profileTab.classList.remove('active');
            
            // Show the selected tab
            const tabId = item.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Date navigation
if (prevDateBtn && nextDateBtn) {
    prevDateBtn.addEventListener('click', () => {
        currentViewDate = new Date(currentViewDate);
        currentViewDate.setDate(currentViewDate.getDate() - 1);
        currentDateText.textContent = formatDateIST(currentViewDate);
        filterEntriesByDate(currentViewDate);
    });
    
    nextDateBtn.addEventListener('click', () => {
        currentViewDate = new Date(currentViewDate);
        currentViewDate.setDate(currentViewDate.getDate() + 1);
        currentDateText.textContent = formatDateIST(currentViewDate);
        filterEntriesByDate(currentViewDate);
    });
}

// Filter entries by date (IST)
function filterEntriesByDate(date) {
    const start = getStartOfDayIST(date);
    const end = getEndOfDayIST(date);
    
    const entries = document.querySelectorAll('.entry-card');
    let hasEntries = false;
    
    entries.forEach(entry => {
        const timestamp = parseInt(entry.getAttribute('data-timestamp'));
        if (timestamp >= start && timestamp <= end) {
            entry.style.display = 'block';
            hasEntries = true;
        } else {
            entry.style.display = 'none';
        }
    });
    
    if (noEntries) {
        noEntries.style.display = hasEntries ? 'none' : 'block';
    }
}

// Show toast notification
function showToast(message, isError = false) {
    if (!toast) return;
    
    toast.innerHTML = `<i class="fas ${isError ? 'fa-exclamation-circle' : 'fa-check-circle'}"></i> ${message}`;
    toast.className = `toast ${isError ? 'error' : ''} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Toggle button loading state
function toggleButtonLoading(button, isLoading) {
    if (!button) return;
    
    const buttonText = button.querySelector('.btn-text');
    if (isLoading) {
        button.disabled = true;
        if (button === loginBtn || button === registerBtn) {
            button.innerHTML = '<span class="spinner"></span> Processing...';
        } else if (button === addEntryBtn) {
            button.innerHTML = '<span class="spinner"></span> Adding...';
        } else if (button === saveProfileBtn) {
            button.innerHTML = '<span class="spinner"></span> Saving...';
        }
    } else {
        button.disabled = false;
        if (button === loginBtn) {
            button.innerHTML = '<span class="btn-text">Sign In</span>';
        } else if (button === registerBtn) {
            button.innerHTML = '<span class="btn-text">Create Account</span>';
        } else if (button === addEntryBtn) {
            button.innerHTML = '<i class="fas fa-plus"></i> <span class="btn-text">Add Entry</span>';
        } else if (button === saveProfileBtn) {
            button.innerHTML = '<i class="fas fa-save"></i> <span class="btn-text">Save Profile</span>';
        }
    }
}

// Initialize with today's date
document.addEventListener('DOMContentLoaded', () => {
    // Set initial date display
    if (currentDateText) currentDateText.textContent = formatDateIST(currentViewDate);
    if (loginForm && registerForm) showLoginForm();
    if (particlesContainer) createParticles();
});
