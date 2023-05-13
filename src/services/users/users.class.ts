import { MongoDBAdapterParams, MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { User, UserData, UserQuery } from './users.schema'
import { Params } from '@feathersjs/feathers'

export type { User, UserData }

export interface UserParams extends MongoDBAdapterParams<UserQuery> {}

export class UserService<ServiceParams extends Params = UserParams> extends MongoDBService<
  User,
  UserData,
  UserParams
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('users'))
  }
}
