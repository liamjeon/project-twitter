import * as userRepository from "./auth.js";

let tweets = [
  {
    id: "1",
    text: "드림코더분들 화이팅!",
    createdAt: new Date().toString(),
    userId: "1", //name,username, url이 아닌 사용자의 아이디를 가지고 있음, userRepository에 유저정보 있음
    // name: "Bob",
    // username: "bob",
    // url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
  },
  {
    id: "2",
    text: "안뇽!",
    createdAt: new Date().toString(),
    userId:'1',
    // name: "Liam",
    // username: "liam",
  },
];

export async function getAll() {
  return Promise.all(
    //promise의 배열이 만들어짐 --> promise.all 로 묶어줌
    tweets.map(async (tweet) => {
      const { username, name, url } = await userRepository.findById(
        tweet.userId
      );
      return { ...tweet, username, name, url };
    })
  );
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
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    userId,
  };
  tweets = [tweet, ...tweets];
  return getById(tweet.id);
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
