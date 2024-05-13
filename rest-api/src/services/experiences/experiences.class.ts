// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Experiences, ExperiencesData, ExperiencesPatch, ExperiencesQuery } from './experiences.schema'

export type { Experiences, ExperiencesData, ExperiencesPatch, ExperiencesQuery }

export interface ExperiencesParams extends KnexAdapterParams<ExperiencesQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class ExperiencesService<ServiceParams extends Params = ExperiencesParams> extends KnexService<
  Experiences,
  ExperiencesData,
  ExperiencesParams,
  ExperiencesPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'experiences',
    multi: ['create', 'remove']
  }
}
