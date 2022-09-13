const AbstractManager = require("./AbstractManager");

class ArticleManager extends AbstractManager {
  constructor() {
    super({ table: "article" });
  }

  findLatest() {
    return this.connection.query(
      `select * from ${this.table} where published = 1 order by createdAt desc limit 3`
    );
  }

  insert(article) {
    return this.connection.query(
      `insert into ${this.table} (title, content, createdAt, updatedAt, published, slug) values (?,?,?,?,?,?)`,
      [
        article.title,
        article.content,
        article.createdAt,
        article.updatedAt,
        article.published,
        article.slug,
      ]
    );
  }

  update(article) {
    return this.connection.query(
      `update ${this.table} set title = ?, content = ?, createdAt = ?, updatedAt = ?, published = ?, slug = ? where id = ?`,
      [
        article.title,
        article.content,
        article.createdAt,
        article.updatedAt,
        article.published,
        article.slug,
        article.id,
      ]
    );
  }
}

module.exports = ArticleManager;
