import express from "express";
import "express-async-errors";
import * as tweetController from "../controller/tweet.js";
import { body } from "express-validator";
// import * as tweetRepository from "../data/tweet.js";
import { validate } from "../middleware/validator.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

//validation 쓰는 이유 : 서버에서 접근해서 읽고 쓰기전에
//미리 유효성 검사를하여 시간과 비용을 절약함.
const validateTweet = [
  body("text")
    .trim()
    .isLength({ min: 3 })
    .withMessage("text should be a least 3 characters"),
  validate,
];

// GET /tweets
// GET /tweets?username=:username
//경로로 들어오면 함수를 연결. 주의! 함수 호출이 아님
router.get("/", isAuth, tweetController.getTweets);

// GET /tweets/:id
router.get("/:id", isAuth, tweetController.getTweet);

// POST /tweeets
//유효성 검사는 라우터에서 하고싶음. contoller 는 로직에만 관심있음
router.post("/", isAuth, validateTweet, tweetController.createTweet);

// PUT /tweets/:id
router.put("/:id", isAuth, validateTweet, tweetController.updateTweet);

// DELETE /tweets/:id
router.delete("/:id", isAuth, tweetController.deleteTweet);

export default router;
