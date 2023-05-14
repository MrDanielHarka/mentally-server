import { io } from '../app.js'
import { Patient, Therapist, User, patient, therapist, users } from '../user/users.js'
import { ChatBot } from './chatBot.js'

export interface ChatMessage {
  id: string
  userId: string | null
  text: string
  createdAt: Date
}

export interface ChatSession {
  readonly id: string

  patient: {
    readonly id: string
    online: boolean
  }
  therapist: {
    readonly id: string
    online: boolean
  }

  readonly messages: ChatMessage[]
}

export class ChatService {
  private readonly chatBot = new ChatBot()

  private readonly sessions: ChatSession[] = []

  async connectToSession(user: User) {
    if (user.role == 'patient') {
      const session =
        this.sessions.find((session) => session.patient.id === user.id) ??
        (await this.createSession(user as Patient))
      session.patient.online = true
    } else {
      const session = this.getSessionForTherapist(user as Therapist)
      session.therapist.online = true
    }
  }

  async disconnectFromSession(user: User) {
    if (user.role == 'patient') {
      const session = this.getSessionForPatient(user as Patient)
      session.patient.online = false
    } else {
      const session = this.getSessionForTherapist(user as Therapist)
      session.therapist.online = false
    }
  }

  async sendMessage(user: User, text: string) {
    const session = this.getSessionForUser(user)

    this.emitMessage(session, user, text)

    const response = await this.chatBot.forwardMessage(text, user.role, session.therapist.online, session.id)
    if (response) {
      this.emitMessage(session, null, response)
    }
  }

  async getMessages(): Promise<ChatMessage[]> {
    return this.sessions.map((session) => session.messages).flat()
  }

  private emitMessage(session: ChatSession, user: User | null, text: string) {
    const message = {
      id: `${session.messages.length + 1}`,
      userId: user?.id || null,
      text,
      createdAt: new Date()
    }
    session.messages.push(message)

    io.emit('message', message)

    console.log(`message ${text} from ${user?.firstName || 'bot'}`)
  }

  private getSessionForUser(user: User) {
    return user.role === 'patient'
      ? this.getSessionForPatient(user as Patient)
      : this.getSessionForTherapist(user as Therapist)
  }

  private getSessionForTherapist(user: Therapist) {
    const session = this.sessions.find((session) => session.therapist.id === user.id)
    if (!session) {
      throw new Error('Session not found')
    }

    return session
  }

  private getSessionForPatient(user: Patient): ChatSession {
    const session = this.sessions.find((session) => session.patient.id === user.id)
    if (!session) {
      throw new Error('Session not found')
    }

    return session
  }

  private async createSession(user: Patient): Promise<ChatSession> {
    console.log('Starting new session')

    const session = {
      id: `${this.sessions.length + 1}`,
      patient: { id: user.id, online: true },
      therapist: { id: user.therapistId, online: false },
      messages: []
    }
    this.sessions.push(session)

    const firstMessage = await this.chatBot.startSession(session.id)
    this.emitMessage(session, null, firstMessage)

    return session
  }
}
