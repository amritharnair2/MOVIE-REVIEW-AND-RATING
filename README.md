# 🎬 Movie Review & Rating Platform

A full-stack web application where users can explore movies, write reviews, and rate them. The platform includes powerful features like authentication, role-based access, admin dashboard, and theme switching. Built using the **MERN** stack with love ❤️.

---

## 🌟 Features

- 🔐 **JWT Authentication**
- 👥 **Role-based Access Control** (Users & Admins)
- 📝 **Write and Edit Reviews**
- ⭐ **Rate Movies**
- 🔍 **Search & Filter by Language and Genre**
- 🌓 **Dark and Light Mode**
- 🧑‍💼 **Admin Dashboard** to manage users, reviews & movies
- 🖼️ **Upload Profile Pictures & Movie Posters** (with **Cloudinary**)
- 🧾 **Edit Profile** with user details and password update

---

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

---

## 🚀 Getting Started

### Prerequisites

- Node.js
- MongoDB
- Git
- Cloudinary Account

### Installation

```bash
# Clone the repository
git clone https://github.com/amritharnair2/movie-review-and-rating.git
cd movie-review-app

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

### Environment Variables

Create a `.env` file in the `server` directory and add:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# Cloudinary Credentials
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🌩️ Cloudinary Setup

1. Create a free account at [cloudinary.com](https://cloudinary.com).
2. Go to your **Dashboard** and copy:
   - Cloud name
   - API Key
   - API Secret
3. Add them to your `.env` file as shown above.
4. Images are uploaded via the backend using `multer` + `cloudinary` SDK.

---

## 📦 Run the Application

```bash
# Start backend server
cd server
npm run dev

# Start frontend app
cd client
npm run dev
```

---

## 🧑‍💻 Author

**Amritha R**  
🚀 Passionate Full Stack Developer  

📫 Connect with me:  
[LinkedIn](https://www.linkedin.com/in/amritha-r-a06a00226?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app) | [Email](mailto:amritharnair2@gmail.com)

---


---

## ⭐ Show Your Support

If you like this project, don’t forget to give it a ⭐ and share it with others!

