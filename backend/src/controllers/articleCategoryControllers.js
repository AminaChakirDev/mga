const models = require("../models");

const getAll = (req, res) => {
  models.article_category
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getAllByArticleId = (req, res) => {
  models.article_category
    .findAllByArticleId(req.params.id)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getById = (req, res) => {
  models.article_category
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const update = (req, res) => {
  const articleCategory = req.body;

  // TODO validations (length, format...)

  articleCategory.id = parseInt(req.params.id, 10);

  models.article_category
    .update(articleCategory)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const post = (req, res) => {
  const articleCategory = req.body;

  // TODO validations (length, format...)

  models.article_category
    .insert(articleCategory)
    .then(([result]) => {
      res.location(`/articles-categories/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const removeCategory = (req, res) => {
  const { articleId } = req.params;
  const { categoryId } = req.params;

  models.article_category
    .removeCategoryFromArticle(articleId, categoryId)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteAllByArticleId = (req, res) => {
  models.article_category
    .deleteByArticleId(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getAll,
  getAllByArticleId,
  getById,
  update,
  post,
  removeCategory,
  deleteAllByArticleId,
};
