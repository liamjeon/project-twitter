import express from "express";
import "express-async-errors";
import * as authController from "../controller/auth.js";
import { body } from "express-validator";
import { validate } from "../middleware/validator";

const router = express.Router();

//validation 쓰는 이유 : 서버에서 접근해서 읽고 쓰기전에
//미리 유효성 검사를하여 시간과 비용을 절약함.

const validateCredential = [
  body("username")
    .trim() //공백제거
    .notEmpty() //비어있지 않은지
    .withMessage("username should be at least 5 characters"),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("password should be at least 5 characters"),
  validate,
];

//POST /auth/signup
router.post("/signup", authController.signup);

//POST /auth/login
router.post("/login", authController.login);

export default router;
