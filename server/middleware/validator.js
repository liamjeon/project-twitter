//router가 여러개일 때 validator를 재활용하기 위해 따로 빼놓음
//validation 쓰는 이유 : 서버에서 접근해서 읽고 쓰기전에 미리 유효성 검사를하여 시간과 비용을 절약함. 
//express validation 와 sanitization을 통해 데이터를 일관성있게 보관함.

import { validationResult } from 'express-validator'

export const validate = (req, res, next)=>{
    const errors = validationResult(req);
    //error가 없다면 next middleware (진짜 로직 실행)으로 넘어감
    if(errors.isEmpty) { 
        return next();
    }
    return res.status(400).json({message: errors.array()[0].msg});
}