/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("posthashtags", (table) => {
    table.increments('id').notNullable();
    table
      .integer("post_id")
      .references("id")
      .inTable("posts")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
      .notNullable();
    table
      .integer("hashtag_id")
      .references("id")
      .inTable("hashtags")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
      .notNullable();
    table.primary(["post_id", "hashtag_id"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("posthashtags");
};
