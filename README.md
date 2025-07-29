# Your Digital Flow - Timeline Diary App
<div align="center">
  <a href="https://shipwrecked.hackclub.com/?t=ghrm" target="_blank">
    <img src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/739361f1d440b17fc9e2f74e49fc185d86cbec14_badge.png" 
         alt="This project is part of Shipwrecked, the world's first hackathon on an island!" 
         style="width: 35%;">
  </a>
</div>

A beautiful, responsive web application that allows users to maintain a personal diary with a glass-morphism UI design. Built with HTML, CSS, and JavaScript with Firebase backend for authentication and data storage.

![Your Digital Flow App](https://i.ibb.co/placeholder-image/your-digital-flow.jpg)

## 🌟 Features

- **Modern Glass UI Design**: Beautiful glass-morphic interface with smooth animations and transitions
- **User Authentication**: Secure login, registration and Google sign-in options
- **Real-time Database**: All entries are stored in Firebase real-time database
- **Timeline View**: Chronological view of diary entries with date navigation
- **Calendar Integration**: Visual calendar to select dates and see entry indicators
- **Mood Tracking**: Track your mood with each diary entry
- **Weather Integration**: Record the weather when making entries
- **Tag System**: Organize entries with custom tags
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Bottom Navigation**: Easy navigation on mobile devices

## 📱 Mobile-Optimized Experience

The app features a mobile-optimized experience with:
- Bottom navigation bar for easy access to Timeline, Add Entry, and Profile sections
- Responsive layout that adapts to screen size
- Touch-friendly controls and buttons
- Smooth animations optimized for mobile performance

## 🛠️ Technologies Used

- **Frontend**:
  - HTML5
  - CSS3 (with glass-morphism effects)
  - Vanilla JavaScript
  - Font Awesome icons

- **Backend**:
  - Firebase Authentication
  - Firebase Realtime Database

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge recommended)
- Firebase account for backend functionality

### Setup Instructions

1. **Clone the repository**:
   ```
   git clone https://github.com/yourusername/your-digital-flow.git
   cd your-digital-flow
   ```

2. **Firebase Setup**:
   - Create a new Firebase project at [firebase.google.com](https://firebase.google.com)
   - Enable Email/Password and Google authentication methods
   - Create a Realtime Database
   - Get your Firebase configuration (apiKey, authDomain, etc.)
   - Replace the Firebase configuration in the `index.html` file with your own:

   ```javascript
   const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
       databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_PROJECT_ID.appspot.com",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID"
   };
   ```

3. **Open the application**:
   - Simply open the `index.html` file in your browser to use locally
   - Or deploy to a web server of your choice (GitHub Pages, Netlify, etc.)

## 💻 Usage

1. **Authentication**:
   - Register a new account or log in with existing credentials
   - Alternatively, use Google sign-in

2. **Timeline View**:
   - View your diary entries in chronological order
   - Navigate between dates using the date controls
   - Open the calendar to jump to specific dates

3. **Adding Entries**:
   - Click "Add Entry" in the bottom navigation
   - Write your diary content, select mood, weather, and add tags
   - Submit to save your entry

4. **Profile Management**:
   - View your profile statistics
   - Update your display name
   - Change your profile picture
   - Log out from the application

## 🎨 Customization

You can customize the app by modifying the CSS variables in the `:root` selector:

```css
:root {
    --primary: #4361ee;
    --primary-dark: #3a56d4;
    --secondary: #7209b7;
    --accent: #4cc9f0;
    /* more variables... */
}
```

## 📂 Project Structure

```
your-digital-flow/
├── index.html          # Main HTML file
├── css/                # Stylesheet directory
│   ├── styles.css      # Main styles
│   └── profile-styles.css  # Profile-specific styles
├── js/                 # JavaScript directory
│   ├── auth.js         # Authentication logic
│   ├── db.js           # Database operations
│   ├── ui.js           # UI manipulation
│   └── utils.js        # Utility functions
└── README.md           # Project documentation
```

## 📱 Mobile Navigation Implementation

The bottom navigation in the mobile view consists of three main sections:
1. **Timeline**: View entries chronologically
2. **Add Entry**: Quick access to add new diary entries
3. **Profile**: Access user profile and settings

Each nav item in the bottom bar switches the active tab content when clicked.

## 🔒 Security

- Authentication is handled securely through Firebase
- All database rules should be configured in Firebase console to ensure only authorized users can access their own data

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👏 Acknowledgements

- Glass UI inspiration from modern design trends
- Firebase for authentication and database services
- Font Awesome for the beautiful icons

---

Created by [Your Name] - [Your Website/GitHub]
