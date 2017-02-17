const path = require('path');
const {PlayersController} = require(path.resolve('controllers','players_controller'));
const router = require('express').Router();

router.get("/", PlayersController.index);
router.post("/", PlayersController.create);
router.get("/:id", PlayersController.show);
router.put("/", PlayersController.update);
router.delete("/:id", PlayersController.delete);

module.exports = router;
