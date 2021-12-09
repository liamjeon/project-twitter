import jwt from 'jsonwebtoken';
import * as userRepository from '../data/auth.js'

const AUTH_ERROR = {message: 'Authentication Error'};

//비동기로 사용할 수 있는 콜백함수, Epress에서 사용할 수 있는 미들웨어함수
export const isAuth = async (req, res, next)=>{
    //1. cookie가 헤더에 있는지 확인 (for Browser)
    //2. Non-Browser Client는 Headwer로 보냄(for Non-Browser)

    let token;
    //check the header first
    //Header안에 Authorization 키의 value를 authHeader에 할당. 
    const authHeader = req.get('Authorization');

    //Authorization 헤더가 있고, Bearer로 시작한다면
    if(authHeader && authHeader.startsWith('Bearer')){
        token = authHeader.split(' ')[1];//공백으로 분리
    }
    //헤더에 토큰이 없으면 쿠키를 확인
    if(!token){
        token = req.cookies['token'];
    }
    //쿠키에도 없으면 error 
    if(!token){
        return res.status(401).json(AUTH_ERROR);
    }
    
    //verify로 token이 유효한지 검증 
    jwt.verify(token, 'F2dN7x8HVzBWaQuEEDnhsvHXRWqAR63z',
    async (error, decoded)=>{
        if(error){
            return res.status(401).json(AUTH_ERROR);
        }
        const user = await userRepository.findById(decoded.id);
        if(!user){
            return res.status(401).json(AUTH_ERROR);
        }
        //token이 있을때만 req 자체에 userid를 추가해줌. 
        //앞으로 이어질 콜백합수에서 동일하게 접근해야하는 데이터라면 이렇게 등록해줄 수 있음
        req.userId = user.id;
        next();
    })
}

