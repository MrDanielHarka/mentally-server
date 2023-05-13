import type { HookContext } from '../declarations'
import { MessagesService } from '../services/message/message.class'

export const messageBot = async (context: HookContext) => {
  if (context.result.userId == null) {
    console.log('Message was sent by bot, not sending message')
  } else {
    if (context.result.text === 'Can you schedule an appointment?') {
      const messageService = context.app.service('message')
      await messageService.create({ text: 'Appointment scheduled!', actions: 'Try me' })
    }
  }

  console.log(`Running hook message-bot on ${context.path}.${context.method}`)
}
