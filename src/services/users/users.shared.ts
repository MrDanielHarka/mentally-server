import type { ClientApplication } from '../../client'
import type { User, UserData, UserService } from './users.class'

export type { User, UserData }

export type UserClientService = Pick<UserService, (typeof userMethods)[number]>

export const userPath = 'users'

export const userMethods = [] as const

export const userClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(userPath, connection.service(userPath), {
    methods: userMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [userPath]: UserClientService
  }
}
