import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  userResolver,
  userExternalResolver,
  userQueryValidator,
  userQueryResolver,
  userDataResolver,
  userDataValidator,
  userPatchResolver,
  userPatchValidator
} from './users.schema'

import type { Application } from '../../declarations'
import { UserService, getOptions } from './users.class'
import { userPath, userMethods } from './users.shared'
import { authenticate } from '@feathersjs/authentication/lib'

export * from './users.class'
export * from './users.schema'

export const user = (app: Application) => {
  const userService = new UserService(getOptions(app))

  app.use(userPath, userService, { methods: userMethods })

  app.service(userPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(userExternalResolver), schemaHooks.resolveResult(userResolver)],
      find: [authenticate('jwt')],
      get: [authenticate('jwt')],
      create: [],
      update: [authenticate('jwt')],
      patch: [authenticate('jwt')],
      remove: [authenticate('jwt')]
    },
    before: {
      all: [schemaHooks.validateQuery(userQueryValidator), schemaHooks.resolveQuery(userQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(userDataValidator), schemaHooks.resolveData(userDataResolver)],
      patch: [schemaHooks.validateData(userPatchValidator), schemaHooks.resolveData(userPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

declare module '../../declarations' {
  interface ServiceTypes {
    [userPath]: UserService
  }
}
