import { applicants } from './applicants/applicants'
import { jobs } from './jobs/jobs'
import { experiences } from './experiences/experiences'
import { user } from './users/users'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(applicants)
  app.configure(jobs)
  app.configure(experiences)
  app.configure(user)
  // All services will be registered here
}
