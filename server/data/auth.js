// abcd1234: $2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm
let users = [
  {
    id: "1",
    username: "bob",
    password: "$2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm",
    name: "Bob",
    email: "bob@gmail.com",
    url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
  },
];

export async function findByUsername(username) {
  return users.find((user) => user.username === username);
}

export async function findById(id) {
  return users.find((user) => user.id === id);
}

//입력받은 유저정보 + 고유한아이다(id)를 만들어서 데이터를 넣고, id를 리턴함-->token생성용
export async function createUser(user) {
  const created = { ...user, id: Date.now().toString() };
  users.push(created);
  return created.id;
}
