// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#custom-services
import type { Id, NullableId, Params, ServiceInterface } from '@feathersjs/feathers'

import type { Application } from '../../declarations'
import {
  applicantsResolver,
  type Applicants,
  type ApplicantsData,
  type ApplicantsPatch,
  type ApplicantsQuery
} from './applicants.schema'

export type { Applicants, ApplicantsData, ApplicantsPatch, ApplicantsQuery }

export interface ApplicantsServiceOptions {
  app: Application
}

export interface ApplicantsParams extends Params<ApplicantsQuery> {}

// This is a skeleton for a custom service class. Remove or add the methods you need here
export class ApplicantsService<ServiceParams extends ApplicantsParams = ApplicantsParams>
  implements ServiceInterface<Applicants, ApplicantsData, ServiceParams, ApplicantsPatch>
{
  constructor(public options: ApplicantsServiceOptions) {}

  async find(_params?: ServiceParams): Promise<Applicants[]> {
    const db = this.options.app.get('sqliteClient')
    if (_params?.query?.jobId) {
      return db('jobs_users').where({ jobId: _params?.query?.jobId })
    } else {
      return db('jobs_users').where({ userId: _params?.query?.userId })
    }
  }

  // async get(id: Id, _params?: ServiceParams): Promise<Applicants> {
  //   return {
  //     id: 0,
  //     text: `A new message with ID: ${id}!`
  //   }
  // }

  async create(data: ApplicantsData, params?: ServiceParams): Promise<Applicants>
  async create(data: ApplicantsData[], params?: ServiceParams): Promise<Applicants[]>
  async create(
    data: ApplicantsData | ApplicantsData[],
    params?: ServiceParams
  ): Promise<Applicants | Applicants[]> {
    if (Array.isArray(data)) {
      return Promise.all(data.map((current) => this.create(current, params)))
    }
    console.log('create', data)

    const db = this.options.app.get('sqliteClient')
    return db('jobs_users').insert(data, ['userId', 'jobId'])
  }

  // // This method has to be added to the 'methods' option to make it available to clients
  // async update(id: NullableId, data: ApplicantsData, _params?: ServiceParams): Promise<Applicants> {
  //   return {
  //     id: 0,
  //     ...data
  //   }
  // }

  // async patch(id: NullableId, data: ApplicantsPatch, _params?: ServiceParams): Promise<Applicants> {
  //   return {
  //     id: 0,
  //     text: `Fallback for ${id}`,
  //     ...data
  //   }
  // }

  async remove(id: NullableId, _params?: ServiceParams): Promise<Applicants> {
    const app = this.options.app
    const db = app.get('sqliteClient')
    if (!_params?.query?.jobId) {
      throw new Error('jobId is required')
    }
    if (!_params?.user?.id) {
      throw new Error('userId is required')
    }
    console.log('remove', _params?.user?.id, _params?.query?.jobId)

    const userId = _params?.user?.id
    const jobId = _params?.query?.jobId as number
    await db('jobs_users').where({ userId, jobId }).del()
    return {
      userId,
      jobId,
      user: await app.service('users').get(userId),
      job: await app.service('jobs').get(jobId)
    }
  }
}

export const getOptions = (app: Application) => {
  return { app }
}
