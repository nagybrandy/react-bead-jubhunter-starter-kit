// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  jobsDataValidator,
  jobsPatchValidator,
  jobsQueryValidator,
  jobsResolver,
  jobsExternalResolver,
  jobsDataResolver,
  jobsPatchResolver,
  jobsQueryResolver
} from './jobs.schema'

import type { Application } from '../../declarations'
import { JobsService, getOptions } from './jobs.class'

export const jobsPath = 'jobs'
export const jobsMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export * from './jobs.class'
export * from './jobs.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const jobs = (app: Application) => {
  // Register our service on the Feathers application
  app.use(jobsPath, new JobsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: jobsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(jobsPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(jobsExternalResolver), schemaHooks.resolveResult(jobsResolver)],
      create: [authenticate('jwt')],
      patch: [authenticate('jwt')],
      remove: [authenticate('jwt')]
    },
    before: {
      all: [schemaHooks.validateQuery(jobsQueryValidator), schemaHooks.resolveQuery(jobsQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(jobsDataValidator), schemaHooks.resolveData(jobsDataResolver)],
      patch: [schemaHooks.validateData(jobsPatchValidator), schemaHooks.resolveData(jobsPatchResolver)],
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

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [jobsPath]: JobsService
  }
}
