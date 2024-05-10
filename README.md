Backend Application Repository
This repository contains the backend application for the Frontend Application Repository.(Wedding Wise)

Backend application is a RESTful API built with Node.js and Express.js. It uses MongoDB as the database.

Installation
Clone the repository
Run npm install to install the dependencies
Create a .env file in the root directory and add the following environment variables:
MONGODB_URI: MongoDB connection string
PORT: Port number for the server
Run npm run dev to start the server
Application
WeddingWise-Event Management System

Features
 User registration

 User login
[] User Dashboard

 View All EVents
 View event
 Add event to Wedding plan
 View All venue
 View venue
 Add venue to Wedding plan
 View All vendors
 View vendor
 View Wedding Plans
 Add vendor to wedding plan
 CRUD todos for Wedding
 Crud for Expense Tracking
 Logout

License
This project is licensed under the MIT License - see the LICENSE file for details.

Libraries Used
mongoose: MongoDB object modeling tool. It is used to interact with MongoDB database. We use this instead of mongodb driver because it provides a simple schema-based solution to model our application data.
