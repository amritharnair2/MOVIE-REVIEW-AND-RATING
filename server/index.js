const express = require('express')
const { dbConnection } = require('./config/dbConnection')
const cors = require('cors')
const cookieparser = require('cookie-parser')
const { userRouter } = require('./routes/userRoutes')
const movieRouter = require('./routes/movieRoutes')
const reviewRouter = require('./routes/reviewRoutes')
const { adminRouter } = require('./routes/adminRoutes')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cookieparser())

const allowedOrigins = [
  'https://movie-review-and-rating-rafk.vercel.app',
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

dbConnection()

app.get("/", (req, res) => [
  res.json("Server started")
])

app.use("/user", userRouter)
app.use("/movie", movieRouter)
app.use("/review", reviewRouter)
app.use("/admin", adminRouter)

app.listen(process.env.PORT, () => {
  console.log(`server starts at port ${process.env.PORT}`)
})
