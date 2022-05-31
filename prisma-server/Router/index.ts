const router = require("express").Router();
const Controller = require("../Controller/Controller");

router.post("/", Controller.createUser);
router.get("/", Controller.getUser);
router.put("/:id", Controller.updateUser);
router.delete("/:id", Controller.deleteUser);

module.exports = router;
