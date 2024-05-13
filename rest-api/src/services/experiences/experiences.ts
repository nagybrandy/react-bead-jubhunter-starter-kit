// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  experiencesDataValidator,
  experiencesPatchValidator,
  experiencesQueryValidator,
  experiencesResolver,
  experiencesExternalResolver,
  experiencesDataResolver,
  experiencesPatchResolver,
  experiencesQueryResolver
} from './experiences.schema'

import type { Application } from '../../declarations'
import { ExperiencesService, getOptions } from './experiences.class'

export const experiencesPath = 'experiences'
export const experiencesMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export * from './experiences.class'
export * from './experiences.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const experiences = (app: Application) => {
  // Register our service on the Feathers application
  app.use(experiencesPath, new ExperiencesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: experiencesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(experiencesPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(experiencesExternalResolver),
        schemaHooks.resolveResult(experiencesResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(experiencesQueryValidator),
        schemaHooks.resolveQuery(experiencesQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(experiencesDataValidator),
        schemaHooks.resolveData(experiencesDataResolver)
      ],
      patch: [
        schemaHooks.validateData(experiencesPatchValidator),
        schemaHooks.resolveData(experiencesPatchResolver)
      ],
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
    [experiencesPath]: ExperiencesService
  }
}
