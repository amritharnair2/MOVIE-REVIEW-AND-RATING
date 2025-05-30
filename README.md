# 🎬 Movie Review & Rating Platform

A full-stack web application where users can explore movies, write reviews, and rate them. The platform includes powerful features like authentication, role-based access, admin dashboard, and theme switching. Built using the **MERN** stack with love ❤️.

## 🌟 Features

- 🔐 **JWT Authentication**
- 👥 **Role-based Access Control** (Users & Admins)
- 📝 **Write and Edit Reviews**
- ⭐ **Rate Movies**
- 🔍 **Search & Filter by Language Genre**
- 🌓 **Dark and Light Mode**
- 🧑‍💼 **Admin Dashboard** to manage users, reviews & movies
- 🖼️ **Upload Profile Pictures**
- 🧾 **Edit Profile** with user details and password update

## 🛠️ Tech Stack

### Frontend:
- **React.js** (with Hooks and Redux)
- **Tailwind CSS** for styling
- **React Router** for routing
- **Axios** for API calls
- **Toastify** for alerts and notifications

### Backend:
- **Node.js + Express.js**
- **MongoDB** with Mongoose
- **JWT** for secure authentication
- **Multer** + **Cloudinary** for image uploads

## 🚀 Getting Started

### Prerequisites

- Node.js
- MongoDB
- Git

### Installation

# Clone the repository
git clone https://github.com/yourusername/movie-review-app.git
cd movie-review-app

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd server
npm install

## Environment Variables

### Create a .env file in the server directory and add:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

### Cloudinary Credentials
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Run the Application
cd server
npm run dev

# Start frontend app
cd client

🧑‍💻 Author
Amritha R
🚀 Passionate Full Stack Developer

