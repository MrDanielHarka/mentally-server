import { Request, Response } from 'express'
import { app } from '../app.js'
import { ChatBot } from '../services/chatBot.js'

app.get('/', async (req: Request, res: Response) => {
  await res.status(200).send('Hello!')
})

import './chat.js'
