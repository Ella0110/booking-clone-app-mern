# Booking Clone App (MERN)

A full-stack MERN booking clone application built with TypeScript, featuring user authentication, booking management, payment integration, and end-to-end testing.

## Features
- **User Authentication**: Registration, login, JWT-based session management  
- **Booking Management**: Search hotels, create and cancel bookings via RESTful endpoints  
- **Payment Integration**: Stripe for secure payment intents on the backend and Stripe.js on the frontend  
- **Image Uploads**: Multer middleware with Cloudinary storage for hotel photos  
- **Data Validation & Security**: express-validator, CORS, cookie parsing, input sanitization  
- **End-to-End Testing**: Playwright tests automate user flows across the full stack  

## Tech Stack
- **Language**: TypeScript  
- **Backend**: Node.js, Express 5, MongoDB & Mongoose  
- **Frontend**: React 18 with Vite, React Router v7, React Query, React Hook Form, Tailwind CSS  
- **Payments**: Stripe SDK (`stripe` on server, `@stripe/react-stripe-js` on client)  
- **Storage**: Cloudinary for media uploads  
- **Testing**: Playwright for E2E (`@playwright/test`)  

## Project Structure
```bash
booking-clone-app-mern/
├── backend/ # Express API (src/, controllers, models, routes)
├── frontend/ # React client (src/, components, pages)
├── e2e-tests/ # Playwright end-to-end tests
└── .gitignore
```

## Installation

### Prerequisites
- Node.js ≥ 18  
- npm ≥ 9  
- MongoDB Atlas or local MongoDB  
- Stripe account for API keys  
- Cloudinary account for image hosting  

### Clone & Install
```bash
git clone https://github.com/Ella0110/booking-clone-app-mern.git
cd booking-clone-app-mern
# Backend
cd backend && npm install
# Frontend
cd ../frontend && npm install
# E2E Tests
cd ../e2e-tests && npm install
