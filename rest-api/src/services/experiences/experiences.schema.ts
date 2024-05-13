// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { ExperiencesService } from './experiences.class'
import { userSchema } from '../users/users.schema'

// Main data model schema
export const experiencesSchema = Type.Object(
  {
    id: Type.Number(),
    company: Type.String(),
    title: Type.String(),
    interval: Type.String(),
    userId: Type.Number(),
    user: Type.Ref(userSchema)
  },
  { $id: 'Experiences', additionalProperties: false }
)
export type Experiences = Static<typeof experiencesSchema>
export const experiencesValidator = getValidator(experiencesSchema, dataValidator)
export const experiencesResolver = resolve<Experiences, HookContext<ExperiencesService>>({
  user: virtual(async (experience, context) => {
    // Associate the user that sent the message
    return context.app.service('users').get(experience.userId)
  })
})

export const experiencesExternalResolver = resolve<Experiences, HookContext<ExperiencesService>>({})

// Schema for creating new entries
export const experiencesDataSchema = Type.Pick(experiencesSchema, ['company', 'title', 'interval'], {
  $id: 'ExperiencesData'
})
export type ExperiencesData = Static<typeof experiencesDataSchema>
export const experiencesDataValidator = getValidator(experiencesDataSchema, dataValidator)
export const experiencesDataResolver = resolve<Experiences, HookContext<ExperiencesService>>({
  userId: async (_value, _message, context) => {
    // Associate the record with the id of the authenticated user
    return context.params.user?.id
  }
})

// Schema for updating existing entries
export const experiencesPatchSchema = Type.Partial(experiencesSchema, {
  $id: 'ExperiencesPatch'
})
export type ExperiencesPatch = Static<typeof experiencesPatchSchema>
export const experiencesPatchValidator = getValidator(experiencesPatchSchema, dataValidator)
export const experiencesPatchResolver = resolve<Experiences, HookContext<ExperiencesService>>({})

// Schema for allowed query properties
export const experiencesQueryProperties = Type.Pick(experiencesSchema, [
  'id',
  'company',
  'title',
  'interval',
  'userId'
])
export const experiencesQuerySchema = Type.Intersect(
  [
    querySyntax(experiencesQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type ExperiencesQuery = Static<typeof experiencesQuerySchema>
export const experiencesQueryValidator = getValidator(experiencesQuerySchema, queryValidator)
export const experiencesQueryResolver = resolve<ExperiencesQuery, HookContext<ExperiencesService>>({
  userId: async (value, user, context) => {
    // console.log(value)
    // console.log(context.id)

    return context.params.user?.id
  }
})
