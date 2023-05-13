import { ObjectId } from 'bson'
import type { HookContext } from '../declarations'

export const messageBot = async (context: HookContext) => {
  if (!(context.result.userId as ObjectId).equals('645f70db7485ad08596c1f58')) {
    console.log('Message was sent by bot, not sending message')
  }

  console.log(`Running hook message-bot on ${context.path}.${context.method}`)
}
