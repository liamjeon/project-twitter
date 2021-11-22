const TOKEN = 'token';

//localStorage라는 Browser API 이용하여 토큰 저장 컨트롤 가능
//but 브라우저 저장은 안전하지 않음!! 
//이정도가 기본과정......

export default class TokenStorage{
    saveToken(token){
        localStorage.setItem(TOKEN, token);
    }
    
    getToken(){
        return localStorage.getItem(TOKEN);
    }

    clearToken(){
        localStorage.clear(TOKEN);
    }
}