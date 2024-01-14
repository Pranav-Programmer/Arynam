# Arynam - OTT Platform

Arynam is an OTT platform, providing users with the ability to watch movie trailers and download movies by signing in using their Google account. The platform offers a user-friendly interface with sections for Home, New & Popular, Web Series, Movies, Anime, and an Admin panel. The website is built using Next.js for the frontend, Tailwind CSS for styling, Node.js for the backend API, MongoDB Atlas for storing movie text details, and Cloudinary for storing movie posters.
## Purpose

The primary goal of Arynam is to create a seamless OTT platform where users can explore and enjoy movie content. The website simplifies the user experience by integrating Google account sign-in for easy access to trailers and downloads.
## Features

- __User-Friendly Interface__: A well-organized layout with navigation options and quick access buttons.

- __Google Account Integration__: Users can sign in using their Google accounts for a personalized experience.

- __Content Categories__: Categorized content for easy navigation, including New & Popular, Web Series, Movies, and Anime.

- __Watchlist Functionality__: Users can add movies, web series, and anime to their watchlist for quick access.

- __Admin Panel__: An admin panel for managing and adding new content to the platform.

## Getting Started

To get started with Arynam, simply visit the Arynam website, Sign In with you google account and watch your favourate Movies, Webseries and Animes.

## Prerequisites to run this project on your local system

- Node.js installed on your local system.
- MongoDB account for backend data storage.
- Cloudinary account for storing movie posters.

## Run Locally - Arynam Web Application

### Backend Setup

1. Clone the repository
```bash
  git clone https://github.com/Pranav-Programmer/BackendAN'
```
2. Navigate to the backend directory
```bash
  cd BackendAN
```
3. Install dependencies
```bash
  npm install
```
4. Comment line number 34 to 39 and add following line to below commented lines in app.js file
```bash
app.listen(5000, () => {
  console.log("Server Started");
});
```
5. Set up MongoDB and Cloudinary credentials in the appropriate config files.

### Backend Setup Instructions

1. API Configuration:
* Create a .env file in the backend root directory.
* Add MongoDB connection string and Cloudinary credentials
```bash
  MONGODB_URI='Your_MongoDB_URI'
  cloud_name = 'Your_Cloudinary_Cloud_Name'
  api_key = 'Your_Cloudinary_API_Key'
  api_secret = 'Your_Cloudinary_API_Secret'
```
2. Run the Backend:
- Start the backend server
```bash
  node app.js
```
### Enable Sign-in with Google Feature on Arynam
1. Obtain Google API credentials
2. Set up Google OAuth credentials. Refer to Google's OAuth documentation

### Frontend Setup

1. Clone the repository
```bash
  git clone https://github.com/Pranav-Programmer/Arynam'
```
2. Navigate to the frontend directory
```bash
  cd Arynam
```
3. Install dependencies
```bash
  npm install
```
4. Setup Sign-in with Google and Cloudinary credentials
* Create a .env.local file in the frontend root directory
* Add Sign In with Google credentials
```bash
CLIENT_ID=Your_Google_Client_Id
CLIENT_SECRET=Your_Google_Client_Secret
NEXTAUTH_SECRET=Any_Hard_String_you_Think_Of
NEXTAUTH_URL=http://localhost:3000
```
* Update the Cloudinary configuration on 'src/pages/admin/index.js' file by replacing the placeholders with Your_Cloudinary_Cloud_Name. [Modify line number 97 in index.js file code]
5. Start the frontend application
```bash
  npm run dev
```
6. Now on any web browser open 'localhost:3000'

## Usage of Arynam Website

- Explore the various sections like __Home__, __New & Popular__, __Web Series__, __Movies__, and __Anime__.
- __Sign in with Google__ to access personalized features.
- Add movies, web series, and anime to your __watchlist__.
- Visit the __Admin panel__ to add new content and delete old content.


https://github.com/Pranav-Programmer/Arynam/assets/79044490/9916d66b-5be3-41ce-ba07-6e2739d77494


## Contribute 

1. __Fork the repository__: 'https://github.com/Pranav-Programmer/Arynam'
2. __Create a new branch for your feature__: git checkout -b feature/new-feature
3. __Commit your changes__: git commit -am 'Add new feature'
4. __Push to your branch__: git push origin feature/new-feature
5. __Pull request__: Submit a pull request.
## Feedback and Support

For any feedback or support related inquiries, please contact me at https://pranav-programmer.github.io/Contact-Form/


## 

__GitHub Repository__: 
* https://github.com/Pranav-Programmer/Arynam
* https://github.com/Pranav-Programmer/BackendAN

![Logo](https://github.com/Pranav-Programmer/Arynam/assets/79044490/640fa807-c649-43a7-8dbd-0c4d0f678947)

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/pranav-dharme/)
