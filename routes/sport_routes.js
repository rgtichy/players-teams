const path = require('path');
const {SportsController} = require(path.resolve('controllers','sports_controller'));
const router = require('express').Router();

router.get("/", SportsController.index);
router.post("/", SportsController.create);
router.get("/:id", SportsController.show);
router.put("/", SportsController.update);
router.delete("/:id", SportsController.delete);

module.exports = router;
