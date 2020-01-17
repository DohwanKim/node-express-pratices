import { Router } from 'express';
import {createUser, findUser} from "../models/userModel";
import crypto from 'crypto';
import chalk from "chalk";

let router = Router();

//미들웨어
//데이터 가기 전에 실행 시킬 명령구
// router.use((req, res, next) => {
//     // TODO : require Auth
//     // 여기서 인증 검색을 할 것. 인증을 했을때 타당한 사람인가?
//     // ex)
//     // const authFail = true;
//     // if(authFail) throw "AuthFail";
//
//     next();
// });

router.post('/login', async (req, res) => {
    const base64_token = req.headers.authorization.split(" ")[1];
    let buff = new Buffer(base64_token, 'base64');
    let law_token = buff.toString('ascii');
    let law_id = law_token.split(":")[0];
    let law_password = law_token.split(":")[1];

    let userData = await findUser(law_id);
    let hashPW = cryptoPW(userData.salt, law_password);

    if(userData.pw === hashPW) {
        res.send('succsss');
    } else {
        res.send('auth fail');
    }
});


function cryptoPW(salt, pw) {
    let hash = crypto.createHmac('sha256', salt);
    hash.update(pw);

    return hash.digest("base64");
}

router.post('/create', async (req, res) => {
    const { id, pw, name, email } = req.body;
    const salt = "custom_salt";
    let hashPW = cryptoPW(salt, pw);

    await createUser( {
        id,
        pw:hashPW,
        name,
        email,
        salt
    });

    res.send("test");
});

export default router;