# Your Digital Flow - Timeline Diary App


A beautiful, responsive web application that allows users to maintain a personal diary with a glass-morphism UI design. Built with HTML, CSS, and modular JavaScript with Firebase backend for authentication and data storage. Features include diary entries with mood tracking, calendar integration, theme customization, and diary exports.

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
- **Export Functionality**: Export monthly diary entries as images
- **Daily Inspiration**: Motivational quotes to inspire your daily entries
- **Theme Customization**: Change the app's theme from your profile
- **User Stats**: Track your entry count, streak, and usage statistics
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
  - Font Awesome icons 6.4.0
  - HTML2Canvas (for diary exports)

- **Backend**:
  - Firebase Authentication 8.10.0
  - Firebase Realtime Database 8.10.0

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
   - Replace the Firebase configuration in the `js/config.js` file with your own:

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
   - Read daily inspirational quotes

3. **Adding Entries**:
   - Click "Add Entry" in the bottom navigation
   - Write your diary content, select mood, weather, and add tags
   - Submit to save your entry

4. **Profile Management**:
   - View your profile statistics (entries count, streak, days since starting)
   - Update your display name
   - Change your profile picture
   - Choose from different app themes
   - Log out from the application

5. **Exporting Your Diary**:
   - Access the export feature from your profile page
   - Select a month to export
   - Download your diary entries as a beautifully formatted image
   - Share or save your memories

## 🎨 Customization

The app comes with built-in themes that users can select from their profile page:
- **Glass** (Default): Beautiful glass-morphic interface with blur effects
- **Light**: A clean, bright theme for daytime use
- **Dark**: Easy on the eyes for nighttime journaling
- **Pastel**: Soft colors for a gentle aesthetic

Developers can customize the app further by modifying the CSS variables in the `:root` selector:

```css
:root {
    --primary: #4361ee;
    --primary-dark: #3a56d4;
    --secondary: #7209b7;
    --accent: #4cc9f0;
    --main-text: #ffffff;
    --card-text: #ffffff;
    --card-bg: rgba(255, 255, 255, 0.15);
    --card-border-color: rgba(255, 255, 255, 0.15);
    /* more variables... */
}
```

## 📂 Project Structure

```
your-digital-flow/
├── index.html          # Main HTML file
├── css/                # Stylesheet directory
│   └── styles.css      # All CSS styles
├── js/                 # JavaScript directory
│   ├── auth.js         # Authentication logic
│   ├── calendar.js     # Calendar functionality
│   ├── config.js       # Firebase configuration
│   ├── entries.js      # Entry management
│   ├── export.js       # Diary export functionality
│   ├── main.js         # Core app functionality
│   └── profile.js      # Profile management
└── README.md           # Project documentation
```

## 📱 Mobile Navigation Implementation

The bottom navigation in the mobile view consists of three main sections:
1. **Timeline**: View entries chronologically and read daily inspiration quotes
2. **Add Entry**: Quick access to add new diary entries with mood, weather, and tags
3. **Profile**: Access user profile, statistics, theme settings, and export functionality

Each nav item in the bottom bar switches the active tab content when clicked with smooth animations.

## 🧩 Modular Code Structure

The codebase has been reorganized into a modular structure for better maintainability:

- **config.js**: Contains Firebase configuration settings
- **main.js**: Core application functionality and initialization
- **auth.js**: Handles user authentication (login, register, Google sign-in)
- **entries.js**: Manages diary entry creation, retrieval, and display
- **profile.js**: User profile management and theme customization
- **calendar.js**: Calendar view and date selection functionality
- **export.js**: Diary export functionality using HTML2Canvas

This modular approach allows for:
- Easier maintenance and updates
- Better code organization
- Separation of concerns
- Improved readability and debugging

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
- HTML2Canvas for diary export functionality
- QuoteAPI for daily inspirational quotes

---

Created by [Your Name] - [Your Website/GitHub]
