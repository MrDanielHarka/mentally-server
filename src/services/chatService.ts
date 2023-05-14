import { io } from '../app.js'
import { ChatBot } from './chatBot.js'

export interface ChatMessage {
  id: string
  userId: string | null
  text: string
  createdAt: Date
}

export class ChatService {
  private chatBot = new ChatBot()

  private messages: ChatMessage[] = [
    {
      id: '1',
      text: 'Hey, I just wanted to check in - how have you been feeling lately? 😊',
      userId: null,
      createdAt: new Date(2023, 5, 13, 12, 45)
    }
  ]

  async sendMessage(userId: string, text: string) {
    this.emitMessage(userId, text)

    if (text.includes('@bot')) {
      console.log("Forwarding message to bot")

      const response = await this.chatBot.sendMessage(text.replace('@bot', ''), userId)
      this.emitMessage(null, response)
    }
  }

  private emitMessage(userId: string | null, text: string) {
    const message = {
      id: `${this.messages.length + 1}`,
      userId,
      text,
      createdAt: new Date()
    }
    this.messages.push(message)

    io.emit('message', message)

    console.log(`message ${text} from user ${userId || 'bot'}`)
  }

  async getMessages() {
    return this.messages
  }
}
