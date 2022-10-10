const express = require("express");

const router = express.Router();

// const itemControllers = require("./controllers/itemControllers");
const articleControllers = require("./controllers/articleControllers");
const userControllers = require("./controllers/userControllers");
const categoryControllers = require("./controllers/categoryControllers");
const articleCategoryControllers = require("./controllers/articleCategoryControllers");

// router.get("/items", itemControllers.browse);
// router.get("/items/:id", itemControllers.read);
// router.put("/items/:id", itemControllers.edit);
// router.post("/items", itemControllers.add);
// router.delete("/items/:id", itemControllers.destroy);

router.get("/articles", articleControllers.getAll);
router.get("/articles/latest", articleControllers.getLatest);
router.get("/articles/:id", articleControllers.getById);
router.put("/articles/:id", articleControllers.update);
router.post("/articles", articleControllers.post);
router.delete("/articles/:id", articleControllers.destroy);

router.get("/users", userControllers.getAllWithPoster);
router.get("/users/:id", userControllers.getById);

router.get("/categories", categoryControllers.getAll);
router.get("/categories/:id", categoryControllers.getById);
router.put("/categories/:id", categoryControllers.update);
router.post("/categories", categoryControllers.post);
router.delete("/categories/:id", categoryControllers.destroy);

router.get("/articles-categories", articleCategoryControllers.getAll);
router.get("/articles-categories/:id", articleCategoryControllers.getById);
router.put("/articles-categories/:id", articleCategoryControllers.update);
router.delete(
  "/articles/:articleId/categories/:categoryId",
  articleCategoryControllers.removeCategory
);
router.post(
  "/articles/:articleId/categories/",
  articleCategoryControllers.addCategory
);

router.get(
  "/articles/:id/categories",
  articleCategoryControllers.getAllByArticleId
);
router.delete(
  "/articles/:id/categories",
  articleCategoryControllers.deleteAllByArticleId
);
module.exports = router;
