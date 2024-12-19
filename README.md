# Full Stack Event Management System

## Overview

This repository contains a full-stack Event Management System developed as part of a comprehensive course on ASP.NET Core and React. The application demonstrates key features for managing events, user interactions, and real-time updates.

## Features

- **User Authentication and Authorization**: Secure user login and role-based access control.
- **Event Management**: Users can create, follow, and unfollow events with ease.
- **Social Features**: Includes a user follow/unfollow system to foster interaction.
- **Real-Time Communication**: Integrated real-time commenting functionality using SignalR.
- **CI/CD Pipeline**: Automated deployment to Azure via GitHub Actions ensures a streamlined release process.

## Technologies Used

- **Front-End**: React, React Hooks, Redux.
- **Back-End**: ASP.NET Core, SignalR.
- **Cloud**: Azure for hosting and deployment.
- **Tools**: GitHub Actions for CI/CD, Webpack for module bundling.

## How to Run the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/event-management-system
   ```
2. Navigate to the project directory:
   ```bash
   cd event-management-system
   ```
3. Install front-end dependencies:
   ```bash
   cd client
   npm install
   ```
4. Install back-end dependencies:
   ```bash
   cd ../server
   dotnet restore
   ```
5. Run the back-end server:
   ```bash
   dotnet run
   ```
6. Run the front-end client:
   ```bash
   cd ../client
   npm start
   ```
7. Open the application in your browser at `http://localhost:3000`.

## Skills Demonstrated

- **Full-Stack Development**: ASP.NET Core and React integration.
- **Real-Time Functionality**: SignalR for real-time communication.
- **Testing and CI/CD**: Implemented automated workflows and deployments with GitHub Actions.
- **Cloud Hosting**: Deployed to Azure for reliable and scalable hosting.
- 
## Technologies Used
* Front-end: React18, Typescript, CSS, Bootstrap
* Back-end: ASP.NET Core, C#
* Database: SQL Azure
* Version Control: Git
* API Testing: Postman
## Contact

For any questions or collaboration opportunities, feel free to contact me:

- **Email**: Ira.varshavsky@gmail.com
- **LinkedIn**: [Ira Varshavsky](https://www.linkedin.com/in/Ira-Varshavsky)



## Notes
Please note that this is a learning project intended for educational purposes. While it includes core functionality for managing events, it may not cover advanced features or optimizations found in production-ready applications.
