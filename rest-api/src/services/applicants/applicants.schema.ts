// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { ApplicantsService } from './applicants.class'
import { userSchema } from '../users/users.schema'
import { jobsSchema } from '../jobs/jobs.schema'

// Main data model schema
export const applicantsSchema = Type.Object(
  {
    userId: Type.Number(),
    jobId: Type.Number(),
    user: Type.Ref(userSchema),
    job: Type.Ref(jobsSchema)
  },
  { $id: 'Applicants', additionalProperties: false }
)
export type Applicants = Static<typeof applicantsSchema>
export const applicantsValidator = getValidator(applicantsSchema, dataValidator)
export const applicantsResolver = resolve<Applicants, HookContext<ApplicantsService>>({
  user: virtual(async (applicant, context) => {
    if (context.method === 'remove') {
      return
    }
    // Associate the user that sent the message
    return context.app.service('users').get(applicant.userId)
  }),
  job: virtual(async (experience, context) => {
    if (context.method === 'remove') {
      return
    }
    // Associate the user that sent the message
    return context.app.service('jobs').get(experience.jobId)
  })
})

export const applicantsExternalResolver = resolve<Applicants, HookContext<ApplicantsService>>({})

// Schema for creating new entries
export const applicantsDataSchema = Type.Pick(applicantsSchema, ['jobId'], {
  $id: 'ApplicantsData'
})
export type ApplicantsData = Static<typeof applicantsDataSchema>
export const applicantsDataValidator = getValidator(applicantsDataSchema, dataValidator)
export const applicantsDataResolver = resolve<Applicants, HookContext<ApplicantsService>>({
  userId: async (_value, _message, context) => {
    // Associate the record with the id of the authenticated user
    if (context.params.user?.role !== 'jobseeker') {
      throw new Error('Only jobseekers can apply to jobs')
    }
    return context.params.user?.id
  }
})

// Schema for updating existing entries
export const applicantsPatchSchema = Type.Partial(applicantsSchema, {
  $id: 'ApplicantsPatch'
})
export type ApplicantsPatch = Static<typeof applicantsPatchSchema>
export const applicantsPatchValidator = getValidator(applicantsPatchSchema, dataValidator)
export const applicantsPatchResolver = resolve<Applicants, HookContext<ApplicantsService>>({})

// Schema for allowed query properties
export const applicantsQueryProperties = Type.Pick(applicantsSchema, ['userId', 'jobId'])
export const applicantsQuerySchema = Type.Intersect(
  [
    querySyntax(applicantsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type ApplicantsQuery = Static<typeof applicantsQuerySchema>
export const applicantsQueryValidator = getValidator(applicantsQuerySchema, queryValidator)
export const applicantsQueryResolver = resolve<ApplicantsQuery, HookContext<ApplicantsService>>({
  userId: async (value, user, context) => {
    // if (context.params.user?.role !== 'company') {
    //   throw new Error('Only companies can see applicants')
    // }
    if (context.method === 'remove' || context.method === 'create') {
      return context.params.user?.id
    }
    return value
  }
})
