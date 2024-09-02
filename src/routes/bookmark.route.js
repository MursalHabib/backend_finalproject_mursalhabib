const router = require("express").Router();
const {
	createBookmark,
	getMyBookmark,
} = require("../controllers/bookmarkController");
const authorize = require("../middleware/authorize");

router.post("/bookmark/:movieId", authorize, createBookmark);
router.get("/mybookmark", authorize, getMyBookmark);

module.exports = router;
