# Tripleten web_project_around

Around The U.S. Web Project

This repository contains the Around The U.S. web project, an interactive, responsive website designed to display explorer profiles and their journey across various destinations in the United States. The project is centered around user interaction, allowing users to edit profile information, interact with location cards, and like their favorite destinations.

Table of Contents

	•	Overview
	•	Features
	•	Project Structure
	•	Technologies Used
	•	Installation and Setup
	•	Usage
	•	Contributing
	•	License

Overview

The Around The U.S. project is a simple, user-centric web application that provides an intuitive interface for users to interact with an explorer’s profile and related content. It showcases various places visited by the explorer, represented as clickable cards. The application is fully responsive and dynamically interactive, using JavaScript for handling user input and CSS for smooth transitions.

The project is intended to be a clean and straightforward demonstration of key web development concepts, including responsive design, DOM manipulation, and event handling.

Features

	•	Profile Editing Popup: Users can update the explorer’s profile (name and description) using a popup form that pre-fills the current profile information.
	•	Dynamic Like System: Each location card has a like button (heart icon). Users can click to “like” or “unlike” a location, and the icon dynamically changes to reflect the user’s action.
	•	Responsive Design: The layout adapts to different screen sizes, ensuring a smooth experience across mobile, tablet, and desktop devices.
	•	Smooth Transitions: CSS transitions are applied to various elements, including hover effects and popups, to enhance user experience.
	•	Structured and Organized Code: The project follows a modular structure with clear separation of concerns, making it easy to navigate and maintain.

Project Structure

The project is organized in a way that ensures scalability and maintainability. Below is an overview of the project’s structure:

/web_project_around
│
├── /images/                     # All image assets used in the project
│   ├── group.svg                # Default like button (empty heart)
│   ├── like-button-actived.svg  # Active like button (filled heart)
│   └── ...                      # Additional images
│
├── /scripts/                    # JavaScript folder
│   └── scripts.js               # Main JavaScript file for functionality
│
├── /styles/                     # CSS folder
│   └── styles.css               # Main stylesheet for the project
│
├── index.html                   # Main HTML file that structures the webpage
└── README.md                    # Documentation of the project

Key Folders & Files:

	•	images/: Contains all the visual assets, such as icons and images for the cards and like buttons.
	•	scripts/: Includes the main JavaScript file (scripts.js), which handles dynamic content updates, user interactions, and DOM manipulation.
	•	styles/: Contains the primary CSS file (styles.css) that is responsible for the design and layout of the site, including responsiveness and transitions.
	•	index.html: The core structure of the webpage, linking CSS and JavaScript files and defining the layout for the profile section and location cards.

Technologies Used

	•	HTML5: For structuring the web page and providing the skeleton for the content.
	•	CSS3: For styling, responsiveness, and adding transitions and hover effects.
	•	JavaScript (Vanilla JS): For handling interactivity, DOM manipulation, and dynamic updates (like popup forms and the like system)

	

	New Features

The project has recently been updated with new features that enhance interactivity and provide a richer user experience:

	•	Add New Location Card: Users can now add new cards representing additional locations. Each card includes an image and a title, allowing users to expand the gallery with their favorite locations. By clicking the add button, a popup appears for the user to input the title and image URL.
	•	Delete Location Card: Each location card now has a trash icon in the top right corner. By clicking the icon, the card is removed from the gallery, enabling users to keep their gallery organized with only the locations they want to see.
	•	Enlarged Image View: Users can click on any image within a card to view it in a larger popup, allowing for a detailed look at the photo. The popup includes a close button to return to the standard gallery view.

These new features enhance the project’s interactivity, providing a more immersive and personalized experience. Users have more control over the content they see and can tailor the gallery to their preferences.

For more information on how to use these new features, refer to the Usage section in the README.

This should cover the description of the new features added to the project. Feel free to make any adjustments if needed!