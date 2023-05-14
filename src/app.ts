import cors from 'cors'
import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

export const app = express()
app.use(express.json())
app.use(cors({ origin: '*' }))

export const server = createServer(app)

export const io: Server = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})
