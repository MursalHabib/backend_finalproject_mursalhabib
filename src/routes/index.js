const router = require("express").Router();

router.use(require("./movies.route"));
router.use(require("./bookmark.route"));
router.use(require("./auth.route"));
module.exports = router;
