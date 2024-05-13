// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  applicantsDataValidator,
  applicantsPatchValidator,
  applicantsQueryValidator,
  applicantsResolver,
  applicantsExternalResolver,
  applicantsDataResolver,
  applicantsPatchResolver,
  applicantsQueryResolver
} from './applicants.schema'

import type { Application } from '../../declarations'
import { ApplicantsService, getOptions } from './applicants.class'

export const applicantsPath = 'applicants'
// export const applicantsMethods = ['find', 'get', 'create', 'patch', 'remove'] as const
export const applicantsMethods = ['find', 'create', 'remove'] as const

export * from './applicants.class'
export * from './applicants.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const applicants = (app: Application) => {
  // Register our service on the Feathers application
  app.use(applicantsPath, new ApplicantsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: applicantsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(applicantsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(applicantsExternalResolver),
        schemaHooks.resolveResult(applicantsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(applicantsQueryValidator),
        schemaHooks.resolveQuery(applicantsQueryResolver)
      ],
      find: [],
      // get: [],
      create: [
        schemaHooks.validateData(applicantsDataValidator),
        schemaHooks.resolveData(applicantsDataResolver)
      ],
      // patch: [
      //   schemaHooks.validateData(applicantsPatchValidator),
      //   schemaHooks.resolveData(applicantsPatchResolver)
      // ],
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
    [applicantsPath]: ApplicantsService
  }
}
