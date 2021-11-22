import jwt from 'jsonwebtoken';
import * as userRepository from '../data/auth.js'

const AUTH_ERROR = {message: 'Authentication Error'};

//비동기로 사용할 수 있는 콜백함수, Epress에서 사용할 수 있는 미들웨어함수
export const isAuth = async (req, res, next)=>{
    //Header안에 Authorization 키의 value를 authHeader에 할당. 
    const authHeader = req.get('Authorization');
    //authHeader가 없거나, 헤더가 Bearer로 시작하지 않으면 auth error 리턴
    if(!(authHeader && authHeader.startsWith('Bearer'))){
        return res.status(401).json(AUTH_ERROR);
    }
    //Authorization 헤더가 있다면
    const token = authHeader.split(' ')[1];//공백으로 분리
    //TODO: Make it secure
    
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

