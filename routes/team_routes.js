const path = require('path');
const {TeamsController} = require(path.resolve('controllers','teams_controller'));
const router = require('express').Router();

router.get("/"      , TeamsController.index );
router.post("/"     , TeamsController.create);
router.get("/:id"   , TeamsController.show  );
router.put("/"      , TeamsController.update);
router.delete("/:id", TeamsController.delete);

module.exports = router;
