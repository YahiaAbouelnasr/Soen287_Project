# SOEN287 Project - Campus Resource Booking (Frontend)

This is the frontend for the Campus Resource Booking project, designed for SOEN287 coursework at Concordia University. The project provides user management interfaces, including registration, login, profile management for different roles (student, admin, faculty), and admin functionalities.

The UI is styled using the [Pico CSS](https://picocss.com/) library, which ensures a clean and modern appearance with minimal effort.

## Getting Started

To run the project locally, you need [Node.js](https://nodejs.org/) installed.

1. **Install dependencies**  
   Run the following command in the root directory:

   ```
   npm install
   ```

2. **Start the web server**  
   Launch the frontend with:

   ```
   npm start
   ```

   This uses [http-server](https://www.npmjs.com/package/http-server) to serve the static files at [http://localhost:8080](http://localhost:8080)

3. **Open in Browser**  
   Navigate to [http://localhost:8080/user_accounts/index.html](http://localhost:8080/user_accounts/index.html) (or relevant HTML file) in your web browser.

## Features

- User registration and login forms
- Different profile pages by user role (student, admin, faculty)
- User management dashboard for admins
- Simple and stylish UI with Pico CSS

## Note

This project is a demo and does not have backend integration or persistent data storage.
