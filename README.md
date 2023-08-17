# OnlineShop App README

Welcome to the OnlineShop app README! This document provides essential information to set up and run the OnlineShop application, a platform for managing products. The app has been developed using Java and React technologies. Follow the instructions below to get started.

## Prerequisites

Before you begin, make sure you have the following prerequisites installed on your system:

- Java JDK19 or higher version 
- MongoDB & MongoDB compass
- Maven
- Node.js 18 or higher version
- Git

## Installation and Setup

1. Clone the repository to your local machine using:
- git clone https://github.com/muslim-kareem/onlineshop.git

2. Navigate to the frontend directory to install the dependencies:
- cd onlineshop/frontend
- npm install


## Start the Application

1. Make sure that the MongoDB instance running.
   - You need an environment variable named `MONGO_URI` that contains the value:`mongodb://localhost:27017/my-onlineshop`
  or replace line `3` in the `application.properties` file with:
  `spring.data.mongodb.uri=mongodb://localhost:27017/my-onlineshop`

2. You need to start the application in 2 Terminals if you don't use an IDE like IntelliJ.
- Terminal 1 
  - cd onlineshope/backend
  - ./mvnw spring-boot:run

- Terminal 2
  - cd onlineshope/frontend 
  - npm start


## User Signup and Role Change

1. Access the application in your web browser by navigating to `http://localhost:3000`.

2. Sign up as a regular user to access the app's features.

3. Once signed up, you'll need to change the role of the user to `ADMIN` in the `MongoDB Compass` to enable product creation.

4. After changing the role,you will see the Button of products creation, because you have the necessary privileges to create products.

## Product Creation
You need for a product a Fotos and Details of product.
The fotos musst be with `jpg` extension and the details musst be in a `txt` file in this format:

name:give the name of the product  
description:the description  
price:99.99  
category:the Category  
id:if you don't write id, will be generated





## Contact

For any questions or assistance, you can contact me at:

- Email: [muslimkareem89@icloud.com](mailto:your_email@example.com)
- GitHub: [muslim-kareem](https://github.com/muslim-kareem)






