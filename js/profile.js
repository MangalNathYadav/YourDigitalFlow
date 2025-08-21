// --- Theme Logic ---
const THEMES = {
    glass: {
        '--primary': '#4361ee',
        '--primary-dark': '#3a56d4',
        '--secondary': '#7209b7',
        '--accent': '#4cc9f0',
        '--light': 'rgba(255, 255, 255, 0.9)',
        '--dark': '#212529',
        '--darker': '#12181b',
        '--gray': 'rgba(108, 117, 125, 0.7)',
        '--light-gray': 'rgba(233, 236, 239, 0.4)',
        '--card-bg': 'rgba(255, 255, 255, 0.15)',
        '--card-border': 'rgba(224, 224, 224, 0.2)',
        '--shadow': '0 8px 32px rgba(0, 0, 0, 0.1)',
        '--shadow-hover': '0 8px 32px rgba(67, 97, 238, 0.2)',
        '--success': '#2ecc71',
        '--danger': '#e74c3c',
        '--glass-bg': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))',
        '--glass-border': '1px solid rgba(255, 255, 255, 0.18)',
        '--glass-effect': 'backdrop-filter: blur(12px) saturate(180%)',
        '--main-text': 'white',
        '--card-text': 'white',
        '--card-border-color': 'rgba(224, 224, 224, 0.2)',
        'body-bg': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'body-color': 'white'
    },
    light: {
        '--primary': '#1976d2',
        '--primary-dark': '#115293',
        '--secondary': '#fbc02d',
        '--accent': '#ffb300',
        '--light': '#fff',
        '--dark': '#222',
        '--darker': '#111',
        '--gray': '#888',
        '--light-gray': '#f5f5f5',
        '--card-bg': '#fff',
        '--card-border': '#eee',
        '--shadow': '0 2px 8px rgba(0,0,0,0.07)',
        '--shadow-hover': '0 4px 16px rgba(25, 118, 210, 0.13)',
        '--success': '#43a047',
        '--danger': '#e53935',
        '--glass-bg': '#fff',
        '--glass-border': '1px solid #eee',
        '--glass-effect': 'none',
        '--main-text': 'black',
        '--card-text': 'black',
        '--card-border-color': '#eee',
        'body-bg': '#f5f7fa',
        'body-color': 'black'
    },
    dark: {
        '--primary': '#22223b',
        '--primary-dark': '#1a1a2e',
        '--secondary': '#4a4e69',
        '--accent': '#9a8c98',
        '--light': '#232946',
        '--dark': '#121212',
        '--darker': '#000',
        '--gray': '#aaa',
        '--light-gray': '#232946',
        '--card-bg': '#232946',
        '--card-border': '#232946',
        '--shadow': '0 2px 8px rgba(0,0,0,0.25)',
        '--shadow-hover': '0 4px 16px rgba(34,34,59,0.18)',
        '--success': '#43a047',
        '--danger': '#e53935',
        '--glass-bg': '#232946',
        '--glass-border': '1px solid #232946',
        '--glass-effect': 'none',
        'body-bg': 'linear-gradient(135deg, #232946 0%, #121212 100%)',
        'body-color': 'white'
    },
    pastel: {
        '--primary': '#a3cef1',
        '--primary-dark': '#5390d9',
        '--secondary': '#f9dcc4',
        '--accent': '#f7b267',
        '--light': '#fff',
        '--dark': '#222',
        '--darker': '#111',
        '--gray': '#bdbdbd',
        '--light-gray': '#f5f5f5',
        '--card-bg': '#f9dcc4',
        '--card-border': '#f7b267',
        '--shadow': '0 2px 8px rgba(163,206,241,0.13)',
        '--shadow-hover': '0 4px 16px rgba(247,178,103,0.13)',
        '--success': '#43a047',
        '--danger': '#e53935',
        '--glass-bg': '#f9dcc4',
        '--glass-border': '1px solid #f7b267',
        '--glass-effect': 'none',
        '--main-text': 'black',
        '--card-text': 'black',
        '--card-border-color': '#f7b267',
        'body-bg': 'linear-gradient(135deg, #f9dcc4 0%, #a3cef1 100%)',
        'body-color': 'black'
    }
};

function applyTheme(themeKey) {
    const theme = THEMES[themeKey] || THEMES['glass'];
    for (const key in theme) {
        if (key.startsWith('--')) {
            document.documentElement.style.setProperty(key, theme[key]);
        }
    }
    document.body.style.background = theme['body-bg'];
    document.body.style.color = theme['body-color'] || theme['--main-text'] || '';
    // Update all text elements to use --main-text or --card-text
    const allTextEls = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, label, span, div, a, li, .btn, .form-control, .entry-content, .entry-card, .meta-item, .tag, .stat-label, .stat-number, .profile-name, .profile-email, .form-footer, .nav-item, .timeline-header, .modal-header, .modal-body, .calendar-day, .calendar-header, .calendar-nav-btn, .date-display, .calendar-picker, .action-btn, .edit-profile, .logout, .no-entries');
    allTextEls.forEach(el => {
        el.style.color = theme['--main-text'] || '';
    });
    // Set card text color
    const cardEls = document.querySelectorAll('.entry-card, .profile-container, .stat-card, .entry-form, .glass, .modal-content');
    cardEls.forEach(el => {
        el.style.color = theme['--card-text'] || '';
    });
}

function saveThemeLocally(themeKey) {
    localStorage.setItem('ydf_theme', themeKey);
}

function getSavedTheme() {
    return localStorage.getItem('ydf_theme') || 'glass';
}

// On page load, apply saved theme
document.addEventListener('DOMContentLoaded', () => {
    applyTheme(getSavedTheme());
    // Set dropdowns to saved theme
    if (registerThemeInput) registerThemeInput.value = getSavedTheme();
    if (profileThemeInput) profileThemeInput.value = getSavedTheme();
});

// Register: Save theme on registration
if (registerBtn && registerThemeInput) {
    registerBtn.addEventListener('click', () => {
        const theme = registerThemeInput.value;
        saveThemeLocally(theme);
        applyTheme(theme);
    });
}

// Profile: Save theme on change
if (profileThemeInput) {
    profileThemeInput.addEventListener('change', () => {
        const theme = profileThemeInput.value;
        saveThemeLocally(theme);
        applyTheme(theme);
    });
}

// Profile photo upload
if (profileAvatar && avatarUpload) {
    profileAvatar.addEventListener('click', () => {
        avatarUpload.click();
    });

    avatarUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const base64String = event.target.result;
                profileAvatar.src = base64String;
                showToast('Profile photo updated!');
                
                // Save to Firebase
                const user = auth.currentUser;
                if (user) {
                    database.ref(`users/${user.uid}/photo`).set(base64String);
                }
            };
            reader.readAsDataURL(file);
        }
    });
}

// Save profile
if (saveProfileBtn) {
    saveProfileBtn.addEventListener('click', async () => {
        const user = auth.currentUser;
        if (!user) return;
        
        toggleButtonLoading(saveProfileBtn, true);
        
        try {
            const displayName = displayNameInput.value.trim();
            
            await user.updateProfile({
                displayName: displayName
            });
            
            updateProfileDisplay(user);
            showToast('Profile updated successfully!');
        } catch (error) {
            showToast(`Failed to update profile: ${error.message}`, true);
        } finally {
            toggleButtonLoading(saveProfileBtn, false);
        }
    });
}
