import { Router } from 'express';
import chalk from "chalk";

let router = Router();

//미들웨어
//데이터 가기 전에 실행 시킬 명령구
router.use((req, res, next) => {
    console.log('Receive /api');
    next();
});

router.get('/find/:title/:apikey', (req, res) => {
    const { title, apikey } = req.params;
    console.log(chalk.blue(`receive : ${title}, ${apikey}`));
    res.send("find");
});

router.get('/rank/:apikey', (req, res) => {
    console.log('Receive /');
    res.send(`rank : ${req.params.apikey}`);
});

export default router;