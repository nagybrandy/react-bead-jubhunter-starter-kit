import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('jobs_users', (table) => {
    table.primary(['userId', 'jobId'])

    table.bigint('userId').references('id').inTable('users')
    table.bigint('jobId').references('id').inTable('jobs')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('jobs_users')
}
