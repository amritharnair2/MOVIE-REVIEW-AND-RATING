const express = require('express')
const { dbConnection } = require('./config/dbConnection')
const apiRouter = require('./routes')
const cors = require('cors')
const cookieparser = require('cookie-parser')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cookieparser())
// app.use(cors({
//         origin: 'https://movie-review-and-rating.vercel.app',
//         credentials: true
// }))

const allowedOrigins = [
        'https://movie-review-and-rating.vercel.app',
        'https://movie-review-and-rating-6wda.vercel.app'
      ];
      
      app.use(cors({
        origin: function(origin, callback) {
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error('Not allowed by CORS'));
          }
        },
        credentials: true, // If you're using cookies/auth headers
      }));

dbConnection()

app.get("/", (req, res) => [
        res.json("Server started")
    ])
    

app.use("/api", apiRouter)

app.listen(process.env.PORT, () => {
        console.log(`server starts at port ${process.env.PORT}`)
})
