// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('jobs', (table) => {
    table.increments('id')

    table.string('company')
    table.string('position')
    table.string('description')
    table.integer('salaryFrom')
    table.integer('salaryTo')
    table.enum('type', ['full-time', 'part-time', 'contract', 'internship'])
    table.string('city').nullable()
    table.boolean('homeOffice')

    table.bigint('userId').references('id').inTable('users')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('jobs')
}
