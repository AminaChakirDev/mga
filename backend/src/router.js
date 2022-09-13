const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");
const articleControllers = require("./controllers/articleControllers");
const userControllers = require("./controllers/userControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

router.get("/articles", articleControllers.getAll);
router.get("/articles/latest", articleControllers.getLatest);
router.get("/articles/:id", articleControllers.getById);
router.put("/articles/:id", articleControllers.update);
router.post("/articles", articleControllers.post);
router.delete("/articles/:id", articleControllers.destroy);

router.get("/users", userControllers.getAllWithPoster);
router.get("/users/:id", userControllers.getById);

module.exports = router;
