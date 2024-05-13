// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Jobs, JobsData, JobsPatch, JobsQuery } from './jobs.schema'

export type { Jobs, JobsData, JobsPatch, JobsQuery }

export interface JobsParams extends KnexAdapterParams<JobsQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class JobsService<ServiceParams extends Params = JobsParams> extends KnexService<
  Jobs,
  JobsData,
  JobsParams,
  JobsPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'jobs',
    multi: ['remove']
  }
}
