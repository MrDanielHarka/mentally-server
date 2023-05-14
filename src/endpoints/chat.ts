import { Request, Response } from 'express'
import { app, io } from '../app.js'
import { ChatService } from '../services/chatService.js'
import { Socket } from 'socket.io'

const chatService = new ChatService()

declare global {
  namespace Express {
    export interface Request {
      user?: string
    }
  }
}

app.get('/chat', async (req: Request, res: Response) => {
  await res.status(200).send(await chatService.getMessages())
})

io.on('connection', (socket: Socket) => {
  console.log('a user connected')

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('message', ({ text, userId }: { text: string; userId: string }) => {
    chatService.sendMessage(userId, text)
  })
})
