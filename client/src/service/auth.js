//어떻게 토큰을 받아와서 me를 요청할건지
//logout은 어떻게 할건지 등

export default class AuthService {
  constructor(http, tokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  //사용자에게 정보를 받아와서 http fatch를 요청하고, 성공적이면 token을 받아옴
  async signup(username, password, name, email, url) {
    const data = await this.http.fetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
        name,
        email,
        url,
      }),
    });
    this.tokenStorage.saveToken(data.token);
    return data;
  }

  async login(username, password) {
    const data = await this.http.fetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    this.tokenStorage.saveToken(data.token); //data는 token, usename 가짐
    return data;
  }

  async me() {
    //token을 읽어와서 토큰을 header에 추가하고 보내줌
    const token = this.tokenStorage.getToken();
    return this.http.fetch("/auth/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async logout() {
    //따로 로그아웃이 없고 토큰만 지우면 된다.
    this.tokenStorage.clearToken();
  }
}
