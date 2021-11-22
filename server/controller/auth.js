import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {} from "express-async-errors";
import * as userRepository from "../data/auth.js";

// TODO: Make it secure!
const jwtSecretKey = "F2dN7x8HVzBWaQuEEDnhsvHXRWqAR63z";
const jwtExpiresInDays = "2d";
const bcryptSaltRounds = 12;

export async function signup(req, res) {
    const { username, password, name, email, url } = req.body;
    const found = await userRepository.findByUsername(username);
    //
    if (found) {
      return res.status(409).json({ message: `${username} already exists` });
    }
    const hashed = await bcrypt.hash(password, bcryptSaltRounds);
    const userId = await userRepository.createUser({
      username,
      password: hashed,
      name,
      email,
      url,
    });
    const token = createJwtToken(userId);
    res.status(201).json({ token, username });
  }

export async function login(req, res) {
  const { username, password } = req.body;
  const user = await userRepository.findByUsername(username);
  //username으로 탐색하여, 유저가 없다면 401 status 리턴.
  if (!user) {
    return res.status(401).json({ message: "Invalid user or password" });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  //bcrypt로 만든 password가 일치하지 않다면
  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid user or password" });
  }
  const token = createJwtToken(user.id);
  res.status(200).json({token, username});
}

function createJwtToken(id){
    return jwt.sign({id}, jwtSecretKey, {expiresIn: jwtExpiresInDays})
} 