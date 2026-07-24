const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const commentController = require("../controllers/commentController");


router.post(
"/comment/add/:id",
auth,
commentController.addComment
);


module.exports = router;