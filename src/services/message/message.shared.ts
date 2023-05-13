import type { ClientApplication } from '../../client'
import type { Messages, MessagesData, MessagesQuery, MessagesService } from './message.class'

export type { Messages, MessagesData, MessagesQuery }

export type MessagesClientService = Pick<MessagesService, (typeof messagesMethods)[number]>

export const messagesPath = 'message'

export const messagesMethods = ['find', 'create'] as const

export const messagesClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(messagesPath, connection.service(messagesPath), {
    methods: messagesMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [messagesPath]: MessagesClientService
  }
}
