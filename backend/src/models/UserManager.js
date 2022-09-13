const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  findAllWithPoster() {
    return this.connection.query(
      `select u.id, u.email, u.firstname, u.lastname, p.url from ${this.table} u left join poster p ON p.id = u.posterId`
    );
  }

  insert(user) {
    return this.connection.query(
      `insert into ${this.table} (email, pass, firstname, lastname, posterId) values (?,?,?,?,?)`,
      [user.email, user.pass, user.firstname, user.lastname, user.posterId]
    );
  }

  update(user) {
    return this.connection.query(
      `update ${this.table} set email = ?, pass = ?, firstname = ?, lastname = ?, posterId = ? where id = ?`,
      [
        user.email,
        user.pass,
        user.firstname,
        user.lastname,
        user.posterId,
        user.id,
      ]
    );
  }
}

module.exports = UserManager;
