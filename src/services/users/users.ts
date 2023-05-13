import { hooks as schemaHooks } from '@feathersjs/schema'

import { userResolver, userExternalResolver } from './users.schema'

import type { Application } from '../../declarations'
import { UserService, getOptions } from './users.class'
import { userPath, userMethods } from './users.shared'

export * from './users.class'
export * from './users.schema'

export const user = (app: Application) => {
  const userService = new UserService(getOptions(app))

  app.use(userPath, userService, { methods: userMethods })

  app.service(userPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(userExternalResolver), schemaHooks.resolveResult(userResolver)]
    }
  })
}

declare module '../../declarations' {
  interface ServiceTypes {
    [userPath]: UserService
  }
}
