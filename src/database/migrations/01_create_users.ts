import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id')
            .primary()

        table.string('name')
            .notNullable()
            
        table.string('email')
            // .unique()
            .notNullable()

        table.string('password')
            .notNullable()

        table.integer('access_level')
            .notNullable()
            .references('level')
            .inTable('access_levels')
            .defaultTo(3)

        table.dateTime('created_at')
            .notNullable()
            .defaultTo(0)

        table.dateTime('updated_at')
            .defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'))
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('users')
}