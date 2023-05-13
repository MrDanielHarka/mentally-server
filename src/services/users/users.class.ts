import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { User, UserData } from './users.schema'

export type { User, UserData }

export class UserService extends MongoDBService<User, UserData> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('users'))
  }
}
