import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  messagesDataValidator,
  messagesResolver,
  messagesExternalResolver,
  messagesDataResolver
} from './message.schema'

import type { Application } from '../../declarations'
import { MessagesService, getOptions } from './message.class'
import { messagesPath, messagesMethods } from './message.shared'
import { messageBot } from '../../hooks/message-bot'

export * from './message.class'
export * from './message.schema'

export const messages = (app: Application) => {
  app.use(messagesPath, new MessagesService(getOptions(app)), {
    methods: messagesMethods
  })

  app.service(messagesPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(messagesExternalResolver),
        schemaHooks.resolveResult(messagesResolver)
      ]
    },
    before: {
      create: [schemaHooks.validateData(messagesDataValidator), schemaHooks.resolveData(messagesDataResolver)]
    },
    after: {
      create: [messageBot]
    }
  })
}

declare module '../../declarations' {
  interface ServiceTypes {
    [messagesPath]: MessagesService
  }
}
