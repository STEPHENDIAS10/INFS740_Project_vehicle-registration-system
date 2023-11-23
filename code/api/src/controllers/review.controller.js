const ReviewModel = require("../models/review.model")

exports.getReviews = async (req, res) => {
    const reviews = await ReviewModel.find({});
    res.send(reviews);
};

exports.addReview = async (req, res) => {
    const { bookingId, rating } = req.body;

    if (!bookingId || rating <= 1 || rating > 5) {
        return res.status(400).send({ error: "Required paramters were not provided or were incorrect" });
    }

    const review = ReviewModel(req.body);
    const data = await review.save();
    res.send({ data });
};

exports.updateReview = async (req, res) => {
    const data = await ReviewModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    res.send({ data });
};

exports.deleteReview = async (req, res) => {
    const data = await ReviewModel.findOneAndDelete({ _id: req.params.id });
    res.send({ data });
}
