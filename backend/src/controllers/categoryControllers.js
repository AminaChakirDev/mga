const models = require("../models");

const getAll = (req, res) => {
  models.category
    .findAll()
    .then(([rows]) => {
      const categories = [];
      rows.map((row) =>
        categories.push({
          value: row.id,
          label: row.name,
        })
      );
      res.send(categories);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getById = (req, res) => {
  models.category
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
  const category = req.body;

  // TODO validations (length, format...)

  category.id = parseInt(req.params.id, 10);

  models.category
    .update(category)
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
  const category = req.body;

  // TODO validations (length, format...)

  models.category
    .insert(category)
    .then(([result]) => {
      res.location(`/categories/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.category
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
};

module.exports = {
  getAll,
  getById,
  update,
  post,
  destroy,
};
