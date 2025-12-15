# Food Delivery App

## Overview

Food Delivery App is a full-stack web application built as a personal project to simulate a modern food delivery service. Users can browse a menu of dishes, add items to their cart, register or log in, place orders and process payments through Stripe. An administration panel lets you manage the menu, view orders and update their status.

The project showcases end-to-end development skills: designing a REST API, modelling data with MongoDB, implementing authentication and payment flows, and building a responsive user interface with React. It’s a complete proof of concept of an e-commerce-style app, demonstrating proficiency across the JavaScript/TypeScript ecosystem.

---

## Key Features

- User authentication using JSON Web Tokens (JWT) with secure password hashing via bcryptjs.
- User registration and login with email format validation and password strength checks.
- CRUD operations for dishes, including image uploads handled by multer.
- Persistent shopping cart stored in the user document, with add/remove/update operations.
- Checkout flow using Stripe Checkout for secure payment processing.
- Order creation and tracking, with status updates (e.g. “Food Processing”, “Delivered”).
- Administration panel to list all orders and change their status.
- Frontend built with React 19 and Vite, using Context API for global state and React Router 7 for navigation.
- API consumption via Axios, with token management in HTTP headers.

---

## Tech Stack

### Backend

- Node.js + Express for the REST API.
- MongoDB with Mongoose as the NoSQL database.
- JWT for authentication and authorization.
- bcryptjs for hashing passwords.
- Multer for handling file uploads (dish images).
- Stripe SDK to integrate payment processing.

### Frontend

- React 19 with Vite as the build tool and dev server.
- React Router 7 for client-side routing.
- Context API to manage the shopping cart and authentication state.
- Axios to interact with the backend API.
- Modular CSS and reusable components (Navbar, Footer, FoodDisplay, etc.).

---

## Project Structure


Food_Delivery_App/
├── backend/
│   ├── config/             # Database connection
│   ├── controllers/        # Business logic for users, food, cart and orders
│   ├── middleware/         # Authentication middleware (JWT)
│   ├── models/             # Mongoose models (User, Food, Order)
│   ├── routes/             # API route definitions
│   ├── uploads/            # Uploaded images
│   ├── package.json        # Backend dependencies and scripts
│   └── server.js           # Main Express server configuration
├── frontend/
│   ├── public/             # Static files
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # StoreContext for global state
│   │   ├── pages/          # Page components (Home, Cart, PlaceOrder, Verify, MyOrders)
│   │   ├── App.jsx         # Sets up routing and layout
│   │   ├── main.jsx        # React entry point
│   │   └── index.css       # Global styles
│   ├── package.json        # Frontend dependencies and scripts
│   └── vite.config.js      # Vite configuration
└── README.md               # Project documentation (this file)


## Getting Started

### Prerequisites

You need Node.js >= 18, npm, and a running MongoDB instance. For a cloud database, a MongoDB Atlas URI works fine. You’ll also need a test Stripe key for payment integration.

### Clone the repository


git clone https://github.com/rodriberdo96/Food_Delivery_App.git
cd Food_Delivery_App







###Configure environment variables

Create a .env file inside the backend folder with the following keys:

MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/food_delivery
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=sk_test_...


MONGO_URI: your MongoDB connection string (local or Atlas).

JWT_SECRET: secret key used to sign JWTs.

STRIPE_SECRET_KEY: your Stripe secret key (use a test key in development).

###Install backend dependencies
cd backend
npm install

###Run the backend server
npm start
# or
node server.js


The server will listen on:

http://localhost:4000

###Install frontend dependencies
cd frontend
npm install

###Run the frontend in development mode
npm run dev


The application will open at:

http://localhost:5174


Ensure the backend is running so the API calls work correctly.

##API Overview

Below is a summary of the main API endpoints (all prefixed with /api):

Method & Route	Description	Middleware
POST /api/user/register	Register a new user	—
POST /api/user/login	Authenticate a user and return a JWT	—
POST /api/food/add	Add a new dish (with image upload)	—
GET /api/food/list	Retrieve the list of available dishes	—
POST /api/food/remove	Remove a dish	—
POST /api/cart/add	Add an item to the cart	authMiddleware
POST /api/cart/remove	Remove or decrease quantity of an item in the cart	authMiddleware
POST /api/cart/get	Fetch the current user’s cart	authMiddleware
POST /api/order/place	Create an order and generate a Stripe payment session	authMiddleware
POST /api/order/verify	Verify the payment and update the order	—
POST /api/order/userorders	Get all orders for the authenticated user	authMiddleware
GET /api/order/list	List all orders (for admin dashboard)	—
POST /api/order/status	Update an order’s status	—
Best Practices & Notes

Use Bearer tokens in the Authorization header (Authorization: Bearer <token>) instead of custom headers like token for wider compatibility.

Never commit sensitive files (.env), node_modules, or API keys to your public repository.

Always work with test keys for Stripe and MongoDB Atlas during development. Rotate keys if they have been exposed.

The codebase is modular; feel free to add features (ratings, search, filtering) or improve styling.

##Author

###Rodrigo Berdomas — Full-stack developer. This project demonstrates my ability to design, build and document a complete web application from scratch, integrating backend services, secure authentication, payment processing, and a responsive frontend. Feel free to contact me via my GitHub profile for questions, feedback, or collaboration opportunities.



