/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("posts", (table) => {
      table.increments("id").primary().notNullable();
      table.integer("user_id").notNullable();
      table.text("text").notNullable();
      table
        .datetime("createdAt")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP"))
        .notNullable();
      table.datetime("updatedAt").nullable();
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable("posts");
  };
  