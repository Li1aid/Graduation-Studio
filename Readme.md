
# CoLab - Collaborative Learning Platform

## 📚 Project Overview

**CoLab** is a modern educational platform designed for the University of Sydney's Graduate School of Design. It provides students with an integrated hub to access lectures, tutorials, and collaborative tools for design-related courses.

## ✨ Key Features

- **Profile Creation & Avatar Selection**: Students can create personalized profiles by selecting from different avatars
- **Course Management**: Browse and access courses with detailed information and resources
- **Lecture & Tutorial Access**: Streamlined access to course materials with intuitive navigation
- **Team Collaboration**: TeamUp feature for group project coordination
- **Dark/Light Theme Toggle**: User-friendly theme switching for comfortable viewing
- **Responsive Design**: Fully responsive interface that works on desktop, tablet, and mobile devices
- **Secure Access Control**: Login/logout system to protect user information

## 🎓 Course Information

### IDEA9105 - Interface Design
**Description**: Explore user interface design principles and best practices
- **Topics**: UI/UX Design, Prototyping, Usability Testing, Multi-platform Design
- **Resources**: Lectures, Tutorials, Canvas Integration

### IDEA9106 - Design Thinking
**Description**: Master human-centered design methodology
- **Topics**: User Research, Ideation, Human-Centered Design, Visual Storytelling
- **Resources**: Lectures, Tutorials, Canvas Integration

### IDEA9103 - Creative Coding
**Description**: Learn to code interactively for design applications
- **Topics**: JavaScript, Interactive Design, Web Development, Prototyping
- **Resources**: Lectures, Tutorials, p5.js Library

### DESN9004 - Design Practices
**Description**: Understand professional design practices and methodologies
- **Topics**: Innovation, Critical Thinking, Research Methods, Design Strategy
- **Resources**: Lectures, Tutorials, Canvas Integration

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- No installation required

### User Journey

1. **Visit the Platform**: Navigate to the home page
2. **Create Profile**: 
   - Click on the avatar button in the top-right corner
   - Select your preferred avatar from Avatar1, Avatar2, or Avatar3
   - Your selection is saved locally
3. **Access Courses**: Browse available courses and access lecture/tutorial materials
4. **Collaborate**: Use TeamUp feature for team projects
5. **Logout**: Click on your profile → Select Logout to end your session

## 💻 Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Libraries**: 
  - p5.js - Creative coding library
  - p5.sound.js - Sound processing for p5.js
- **Styling**: Custom CSS with theme support
- **Data Storage**: Browser LocalStorage for user preferences

## 📁 Project Structure

```
Graduation-Studio/
├── index.html                    # Home page (before login)
├── Home_logged.html              # Home page (after login)
├── Lecture.html                  # Lecture materials page
├── Tut.html                      # Tutorial materials page
├── TeamUp.html                   # Team collaboration page
├── Quiz.html                     # Quiz page
├── Avatar1.html, Avatar2.html, Avatar3.html  # Avatar selection pages
├── Assets/                       # Images and logos
├── scripts/
│   ├── theme.js                  # Theme switching functionality
│   ├── navigation.js             # Navigation bar and menu handling
│   ├── profile.js                # Profile dropdown and logout
│   └── home.js                   # Home page specific functions
├── styles/
│   ├── common.css                # Shared styles
│   └── home.css                  # Home page specific styles
└── libraries/
    ├── p5.min.js                 # p5.js library
    └── p5.sound.min.js           # p5.sound library
```

## 🔐 User Authentication

- **Login**: Accessed through avatar creation (Avatar selection pages)
- **Session**: User selection is stored in browser's LocalStorage
- **Logout**: Clear all user data and return to index.html
- **Status Check**: Profile button only visible when logged in

## 🎨 Theme Customization

Users can toggle between light and dark themes using the theme switch in the top navigation bar. Theme preference is preserved across sessions.

## 📱 Mobile Responsiveness

The platform is fully responsive with:
- Mobile hamburger menu for navigation
- Touch-friendly interface elements
- Optimized layouts for various screen sizes
- Adaptive typography and spacing

## 🔗 External Links

- **Canvas LMS**: Direct integration with University of Sydney Canvas
- **Live Demo**: [CoLab - Live Version](https://robinnnnnns.github.io/CoLab/)

## 📖 Usage Guide

### Creating Your Profile
1. Go to avatar selection page (accessed from home before login)
2. Choose from three avatar options (Avatar1, Avatar2, Avatar3)
3. Your selection is automatically saved to LocalStorage
4. Return to platform with your new avatar displayed

### Accessing Course Materials
1. Logged-in users see full course cards
2. Click "Lecture" or "Tutorial" buttons to access materials
3. All resources are organized by course code

### Team Collaboration
1. Navigate to TeamUp section
2. Create or join teams
3. Collaborate with classmates on projects

## ⚙️ Configuration

All user preferences (avatar, theme) are stored locally in the browser. No server or backend configuration is required.

## 🐛 Known Limitations

- Data is stored locally (lost if browser cache is cleared)
- Single user profile per browser
- No cloud synchronization

## 🤝 Contributing

This is an educational project for the University of Sydney's Graduate School of Design.

## 📄 License

Licensed under the MIT License - see the LICENSE file for details

## 📧 Support & Contact

For issues or questions related to course content, please contact:
- University of Sydney Canvas LMS
- Graduate School of Design Support

---

**Last Updated**: December 2025  
**Version**: 1.0  
**Platform**: University of Sydney - Graduate School of Design

## Live Demo

- **Main Page**: https://robinnnnnns.github.io/CoLab/
- **Lecture Page**: https://robinnnnnns.github.io/CoLab/Lecture.html
