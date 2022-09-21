const AbstractManager = require("./AbstractManager");

class ArticleManager extends AbstractManager {
  constructor() {
    super({ table: "article" });
  }

  findAllWithCategory() {
    return this.connection
      .query(`select article.id, title, content, createdAt, updatedAt, published, slug, JSON_ARRAYAGG(JSON_OBJECT("value", category.id, "label", category.name)) as categories from ${this.table}
    left join article_category ON article_category.article_id = article.id
    left join category on article_category.category_id = category.id
    group by article.id`);
  }

  findWithCategory(id) {
    return this.connection.query(
      `select article.id, title, content, createdAt, updatedAt, published, slug, JSON_ARRAYAGG(JSON_OBJECT("value", category.id, "label", category.name)) as categories from ${this.table}
      left join article_category ON article_category.article_id = article.id
      left join category on article_category.category_id = category.id where article.id = ?`,
      [id]
    );
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

  insertCategories(newArticleId, category) {
    return this.connection.query(
      `insert into article_category (article_id, category_id) values (?, ?)`,
      [newArticleId, category.value]
    );
  }

  deleteCategories(articleId) {
    return this.connection.query(
      `delete from article_category where article_id = ?`,
      [articleId]
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
