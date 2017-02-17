const path = require('path');
const {LeaguesController} = require(path.resolve('controllers','leagues_controller'));
const router = require('express').Router();

router.get("/", LeaguesController.index);
router.post("/", LeaguesController.create);
router.get("/:id", LeaguesController.show);
router.put("/", LeaguesController.update);
router.delete("/:id", LeaguesController.delete);

module.exports = router;
