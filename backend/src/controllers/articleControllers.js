/* eslint-disable no-unused-expressions */
const models = require("../models");

const getAll = (req, res) => {
  models.article
    .findAllWithCategory()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getLatest = (req, res) => {
  models.article
    .findLatest()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getById = (req, res) => {
  models.article
    .findWithCategory(req.params.id)
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
  const article = req.body;

  // TODO validations (length, format...)

  models.article.update(article).then(([result]) => {
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  });
  models.article
    .deleteCategories(article.id)
    .then(() => {
      for (let i = 0; i < article.categories.length; i += 1) {
        models.article.insertCategories(
          article.id,
          article.categories[i].value
        );
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const post = (req, res) => {
  const article = req.body;

  // TODO validations (length, format...)

  models.article
    .insert(article)
    .then(([result]) => {
      res
        .location(`/articles/${result.insertId}`)
        .status(201)
        .send(`${result.insertId}`);
      article.categories &&
        article.categories.map((category) =>
          models.article.insertCategories(`${result.insertId}`, category.value)
        );
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.article
    .delete(req.params.id)
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
  models.article.deleteCategories(req.params.id);
};

module.exports = {
  getAll,
  getLatest,
  getById,
  update,
  post,
  destroy,
};
