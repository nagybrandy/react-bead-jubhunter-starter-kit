// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { JobsService } from './jobs.class'
import { user, userSchema } from '../users/users'

export enum JobType {
  FullTime = 'full-time',
  PartTime = 'part-time',
  Contract = 'contract',
  Internship = 'internship'
}

// Main data model schema
export const jobsSchema = Type.Object(
  {
    id: Type.Number(),
    company: Type.String(),
    position: Type.String(),
    description: Type.String(),
    salaryFrom: Type.Number(),
    salaryTo: Type.Number(),
    type: Type.Enum(JobType),
    city: Type.String(),
    homeOffice: Type.Boolean(),
    userId: Type.Number(),
    createdBy: Type.Ref(userSchema)
  },
  { $id: 'Jobs', additionalProperties: false }
)
export type Jobs = Static<typeof jobsSchema>
export const jobsValidator = getValidator(jobsSchema, dataValidator)
export const jobsResolver = resolve<Jobs, HookContext<JobsService>>({
  createdBy: virtual(async (job, context) => {
    // Associate the user that sent the message
    if (context.params.user) {
      return context.app.service('users').get(job.userId)
    }
  })
})

export const jobsExternalResolver = resolve<Jobs, HookContext<JobsService>>({})

// Schema for creating new entries
export const jobsDataSchema = Type.Pick(
  jobsSchema,
  ['company', 'position', 'description', 'salaryFrom', 'salaryTo', 'type', 'city', 'homeOffice'],
  {
    $id: 'JobsData'
  }
)
export type JobsData = Static<typeof jobsDataSchema>
export const jobsDataValidator = getValidator(jobsDataSchema, dataValidator)
export const jobsDataResolver = resolve<Jobs, HookContext<JobsService>>({
  userId: async (_value, _message, context) => {
    if (context.params.user?.role !== 'company') {
      throw new Error('Only companies can create jobs')
    }
    // Associate the record with the id of the authenticated user
    return context.params.user?.id
  }
})

// Schema for updating existing entries
export const jobsPatchSchema = Type.Partial(jobsSchema, {
  $id: 'JobsPatch'
})
export type JobsPatch = Static<typeof jobsPatchSchema>
export const jobsPatchValidator = getValidator(jobsPatchSchema, dataValidator)
export const jobsPatchResolver = resolve<Jobs, HookContext<JobsService>>({})

// Schema for allowed query properties
export const jobsQueryProperties = Type.Pick(jobsSchema, [
  'id',
  'company',
  'position',
  'description',
  'salaryFrom',
  'salaryTo',
  'type',
  'city',
  'homeOffice',
  'userId'
])
export const jobsQuerySchema = Type.Intersect(
  [
    querySyntax(jobsQueryProperties, {
      company: {
        $like: Type.String()
      }
    }),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type JobsQuery = Static<typeof jobsQuerySchema>
export const jobsQueryValidator = getValidator(jobsQuerySchema, queryValidator)
export const jobsQueryResolver = resolve<JobsQuery, HookContext<JobsService>>({
  userId: async (value, user, context) => {
    if (context.method === 'patch' || context.method === 'remove') {
      return context.params.user?.id
    }
    return value
  }
})
