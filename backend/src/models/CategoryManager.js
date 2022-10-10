const AbstractManager = require("./AbstractManager");

class CategoryManager extends AbstractManager {
  constructor() {
    super({ table: "category" });
  }

  insert(category) {
    return this.connection.query(
      `insert into ${this.table} (name) values (?)`,
      [category.name]
    );
  }

  update(category) {
    return this.connection.query(
      `update ${this.table} set name = ? where id = ?`,
      [category.name, category.id]
    );
  }
}

module.exports = CategoryManager;
