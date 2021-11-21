import express from "express";
import "express-async-errors";
import *as tweetController from "../controller/tweet.js";
// import * as tweetRepository from "../data/tweet.js";

const router = express.Router();

// GET /tweets
// GET /tweets?username=:username
//경로로 들어오면 함수를 연결. 주의! 함수 호출이 아님
router.get("/", tweetController.getTweets);  

// GET /tweets/:id
router.get("/:id", tweetController.getTweet);

// POST /tweeets
router.post("/", tweetController.createTweet);

// PUT /tweets/:id
router.put("/:id", tweetController.updateTweet);

// DELETE /tweets/:id
router.delete("/:id", tweetController.deleteTweet);

export default router;
