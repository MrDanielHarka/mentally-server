import { Request, Response } from 'express'
import { app, io } from '../app.js'
import { ChatService } from '../services/chatService.js'
import { Socket } from 'socket.io'
import { User, users } from '../user/users.js'

const chatService = new ChatService()

declare global {
  namespace Express {
    export interface Request {
      user?: string
    }
  }
}

app.get('/chat', async (req: Request, res: Response) => {
  res.status(200).send(await chatService.getMessages())
})

io.use((socket, next) => {
  const email = socket.handshake.auth.email
  socket.handshake.auth.user = users.find((user) => user.email === email)

  next()
})

io.on('connection', async (socket: Socket) => {
  const user = socket.handshake.auth.user as User
  await chatService.connectToSession(user)
  console.log(`${user.firstName} (${user.id}) connected`)

  socket.on('disconnect', async () => {
    await chatService.disconnectFromSession(user)
    console.log(`${user.firstName} disconnected`)
  })

  socket.on('message', async ({ text }: { text: string }) => {
    await chatService.sendMessage(user, text)
  })
})
