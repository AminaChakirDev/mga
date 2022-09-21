const AbstractManager = require("./AbstractManager");

class ArticleCategoryManager extends AbstractManager {
  constructor() {
    super({ table: "article_category" });
  }

  findAllByArticleId(id) {
    return this.connection.query(
      `
      select category.name, article.id from ${this.table}
      join article on article.id = article_category.article_id
      join category on category.id = article_category.category_id
      where article.id = ?
    `,
      [id]
    );
  }

  insert(articleCategory) {
    return this.connection.query(
      `insert into ${this.table} (article_id, category_id) values (?, ?)`,
      [articleCategory.articleId, articleCategory.categoryId]
    );
  }

  update(articleCategory) {
    return this.connection.query(
      `update ${this.table} set articleId = ?, categoryId = ? where id = ?`,
      [
        articleCategory.articleId,
        articleCategory.categoryId,
        articleCategory.id,
      ]
    );
  }

  deleteByArticleId(articleId) {
    return this.connection.query(
      `delete from ${this.table} where article_id = ?`,
      [articleId]
    );
  }

  removeCategoryFromArticle(articleId, categoryId) {
    return this.connection.query(
      `delete from ${this.table} where article_id = ? and category_id = ?`,
      [articleId, categoryId]
    );
  }
}

module.exports = ArticleCategoryManager;
