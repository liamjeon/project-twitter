import { getTweets } from "../database/database.js";
import * as userRepository from "./auth.js";

//NOSQL 정보의 중복 > 관계

export async function getAll() {
  return getTweets() //
    .find()
    .sort({ createdAt: -1 })
    .toArray()
    .then((data) => {
      console.log(data);
      return data;
    });
}

export async function getAllByUsername(username) {
  //찾는 username와 일치하는 tweet을 묶어 배열로 리턴함.
  return getAll().then((tweets) => {
    tweets.filter((tweet) => tweet.username === username);
  });
}

export async function getById(id) {
  const found = tweets.find((tweet) => tweet.id === id);
  if (!found) {
    return null;
  }
  const { username, name, url } = await userRepository.findById(found.userId);
  return { ...found, username, name, url };
}

export async function create(text, userId) {
  const { name, username, url } = await userRepository.findById(userId);
  const tweet = {
    text,
    createdAt: new Date(),
    userId,
    name: name,
    username: username,
    url: url,
  };
  return getTweets()
    .insertOne(tweet)
    .then((data) => {
      return mapOptionalTweet({ ...tweet, id: data.insertedId }); //여기서 id는 tweet 게시글의 id
    });
}

export async function update(id, text) {
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
  }
  return getById(tweet.id);
}

export async function remove(id) {
  tweets.filter((tweet) => tweet.id !== id);
}

function mapOptionalTweet(tweet) {
  return tweet ? { ...tweet, id: tweet._id.toString() } : tweet;
}
