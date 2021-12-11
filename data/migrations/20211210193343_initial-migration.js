
exports.up = async function(knex) {
  await knex.schema
    .createTable('projects', table => {
        table.increments('project_id')
        table.string('project_name', 200).notNullable()
        table.string('project_description', 1000)
        table.integer('project_completed')
        .unsigned()
        .notNullable()
        .defaultTo(0)
    })
    .createTable('resources', table => {
        table.increments('resource_id')
        table.string('resource_name', 200).notNullable().unique()
        table.string('resource_description', 1000)
    })
    .createTable('tasks', table => {
        table.increments('task_id')
        table.string('task_description', 1000).notNullable()
        table.string('task_notes', 1000)
        table.integer('task_completed')
        .unsigned()
        .notNullable()
        .defaultTo(0)
        table.integer('project_id')
        .unsigned()
        .notNullable()
        .references('project_id')
        .inTable('projects')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT')
    })
    .createTable('project_resources', table => {
        table.increments('project_resource_id')
        table.integer('project_id')
        .unsigned()
        .notNullable()
        .references('project_id')
        .inTable('projects')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT')
        table.integer('resource_id')
        .unsigned()
        .notNullable()
        .references('resource_id')
        .inTable('resources')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT')
    })
};

exports.down = async function(knex) {
    await knex.schema
    .dropTableIfExists('project_resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects')
};
