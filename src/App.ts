import express, { Application } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import * as routes from './routes'
import authMiddleware from './middlewares/auth'
import * as accessLevelMiddleware from './middlewares/access_level'

export class App {
    private app: Application

    constructor() {
        this.app = express()
        this.settings()
        this.middlewares()
        this.routes()
    }

    private settings() {
        
    }

    private middlewares() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(cors({ exposedHeaders: 'Authorization' }))
        this.app.use(morgan('dev'))
    }

    private publicRoutes() {
        this.app.use('/api', routes.index)
        this.app.use('/api', routes.auth)
    }

    private privateRoutes() {
        /** Admin routes  */
        this.app.use('/api', accessLevelMiddleware.admin, routes.user)

        /** Manager routes */
        //routes

        /** Student routes */
        this.app.use('/api', accessLevelMiddleware.student, routes.lesson)

        /** Stakeholder routes */
        //routes
    }

    private routes() {
        this.publicRoutes()

        this.app.use(authMiddleware) /** Authentication required routes */
        this.privateRoutes()
    }

    async listen(port: number | string) {
        await this.app.listen(port)
        console.log('Server on port', port)
    }
}
