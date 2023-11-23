const { getReviews, addReview, updateReview, deleteReview } = require("../controllers/review.controller");

const router = require("express").Router();

router.get("/", getReviews);
router.post("/", addReview);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

module.exports = router;