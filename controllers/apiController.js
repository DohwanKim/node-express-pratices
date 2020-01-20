import { Router } from 'express';
import chalk from "chalk";
import { isVerified } from "../service/jwtGenerator";

let router = Router();

//미들웨어
//데이터 가기 전에 실행 시킬 명령구
router.use(async (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    isVerified(token).then( (decoded) => {
        req.userInfo = decoded;
        next();
    }).catch( (err) => {
        res.status(401).send({error: err.message})
    });
});

router.get('/find/:title', (req, res) => {
    const { title, apikey } = req.params;
    console.log(chalk.blue(`receive : ${title}, ${apikey}`));
    res.send("find");
});

router.get('/rank', (req, res) => {
    const { userInfo } = req;
    res.send(`rank : ${userInfo.user_id}, ${userInfo.user_email}, ${userInfo.user_name}`)
});

export default router;