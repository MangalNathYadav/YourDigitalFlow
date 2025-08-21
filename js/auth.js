// Update user profile display
function updateProfileDisplay(user) {
    if (!profileName || !profileEmail || !profileAvatar) return;
    
    const displayName = user.displayName || 'User';
    const photoURL = user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random`;
    
    profileAvatar.src = photoURL;
    profileName.textContent = displayName;
    profileEmail.textContent = user.email;
    if (displayNameInput) displayNameInput.value = displayName;
}

// Login with email/password
if (loginBtn) {
    loginBtn.addEventListener('click', async () => {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        if (!email || !password) {
            showToast('Please enter both email and password', true);
            return;
        }
        
        toggleButtonLoading(loginBtn, true);
        
        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            showToast('Signed in successfully!');
        } catch (error) {
            let errorMessage = 'Login failed. ';
            switch(error.code) {
                case 'auth/wrong-password':
                    errorMessage += 'Incorrect password.';
                    break;
                case 'auth/invalid-email':
                    errorMessage += 'Invalid email address.';
                    break;
                case 'auth/user-not-found':
                    errorMessage += 'User not found.';
                    break;
                case 'auth/user-disabled':
                    errorMessage += 'User account disabled.';
                    break;
                default:
                    errorMessage += error.message;
            }
            showToast(errorMessage, true);
        } finally {
            toggleButtonLoading(loginBtn, false);
        }
    });
}

// Register new account
if (registerBtn) {
    registerBtn.addEventListener('click', async () => {
        const name = registerNameInput.value.trim();
        const email = registerEmailInput.value.trim();
        const password = registerPasswordInput.value.trim();
        const confirm = registerConfirmInput.value.trim();
        
        if (!name) {
            showToast('Please enter your full name', true);
            return;
        }
        
        if (!email) {
            showToast('Please enter your email', true);
            return;
        }
        
        if (!password || !confirm) {
            showToast('Please enter and confirm your password', true);
            return;
        }
        
        if (password.length < 6) {
            showToast('Password must be at least 6 characters', true);
            return;
        }
        
        if (password !== confirm) {
            showToast('Passwords do not match', true);
            return;
        }
        
        toggleButtonLoading(registerBtn, true);
        
        try {
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            
            // Update user profile with name
            await userCredential.user.updateProfile({
                displayName: name
            });
            
            showToast('Account created successfully!');
            
            // Clear form
            registerNameInput.value = '';
            registerEmailInput.value = '';
            registerPasswordInput.value = '';
            registerConfirmInput.value = '';
            
            // Switch to login form
            showLoginForm();
        } catch (error) {
            let errorMessage = 'Registration failed. ';
            switch(error.code) {
                case 'auth/email-already-in-use':
                    errorMessage += 'Email already in use.';
                    break;
                case 'auth/invalid-email':
                    errorMessage += 'Invalid email address.';
                    break;
                case 'auth/weak-password':
                    errorMessage += 'Password is too weak.';
                    break;
                default:
                    errorMessage += error.message;
            }
            showToast(errorMessage, true);
        } finally {
            toggleButtonLoading(registerBtn, false);
        }
    });
}

// Sign in with Google
if (googleLoginBtn) {
    googleLoginBtn.addEventListener('click', async () => {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            await auth.signInWithPopup(provider);
            showToast('Signed in with Google!');
        } catch (error) {
            showToast(`Google sign-in failed: ${error.message}`, true);
        }
    });
}

// Logout
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        auth.signOut();
        showToast('You have been signed out');
    });
}

// Firebase Auth State Listener
auth.onAuthStateChanged(user => {
    if (user) {
        // User is signed in
        if (authScreen) authScreen.style.display = 'none';
        if (appContent) appContent.style.display = 'block';
        
        // Update profile display
        updateProfileDisplay(user);
        
        // Load profile photo if exists
        database.ref(`users/${user.uid}/photo`).on('value', (snapshot) => {
            if (snapshot.exists() && profileAvatar) {
                profileAvatar.src = snapshot.val();
            }
        });
        
        // Load diary entries
        const entriesRef = database.ref(`diaryEntries/${user.uid}`);
        entriesRef.on('value', (snapshot) => {
            renderEntries(snapshot.val());
        });
    } else {
        // User is signed out
        if (authScreen) authScreen.style.display = 'block';
        if (appContent) appContent.style.display = 'none';
        if (emailInput) emailInput.value = '';
        if (passwordInput) passwordInput.value = '';
        if (registerNameInput) registerNameInput.value = '';
        if (registerEmailInput) registerEmailInput.value = '';
        if (registerPasswordInput) registerPasswordInput.value = '';
        if (registerConfirmInput) registerConfirmInput.value = '';
    }
});
