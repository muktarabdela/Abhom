require('dotenv').config()
const express = require('express')
require('express-async-errors');
const connectToDb = require('./Database/db')
require('./Controllers/Crons/appNotifier')
const app = express()

//importing routes
const authRouters = require('./Routes/users')
const propertyRoutes = require('./Routes/properties')
const appointmentRouters = require('./Routes/appointments')
const favoriteRoutes = require('./Routes/favorites')
const informationsRoutes = require('./Routes/information')
const searchRoute = require('./Routes/search')


// middleware
const errorHandlerMiddleware = require('./Middleware/errorHandler')
const notFound = require('./Middleware/not-found')
const authMiddleware = require('./Middleware/auth')

// extra packages for security
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

app.set('trust proxy', 1)
app.use(rateLimiter({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
}))
app.use(express.json());
app.use(helmet())
app.use(cors())
app.use(xss())
// extra packages

app.get('/', (req, res) => {
    res.send('Welcome')
})

//routes
app.use('/abhom-api/v1', authRouters)
app.use('/abhom-api/v1', authMiddleware, propertyRoutes)
app.use('/abhom-api/v1', authMiddleware, appointmentRouters)
app.use('/abhom-api/v1', authMiddleware, favoriteRoutes)
app.use('/abhom-api/v1', authMiddleware, informationsRoutes)
app.use('/abhom-api/v1', authMiddleware, searchRoute)

app.use(errorHandlerMiddleware)
app.use(notFound)

const Port = process.env.PORT || 3000
const start = async () => {
    try {
        await connectToDb(process.env.MONGOURI)
        app.listen(Port, () => {
            console.log('Port is Listening on 3000')
        })
    } catch (error) {
        console.log(error)
    }
}
start()
