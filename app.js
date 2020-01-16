import express from 'express'; //익스프레스
import ejs from 'ejs';
import cors from 'cors'; //크로스 오리진 이슈 해결 (다 오픈하기 때문에 이후 허용할 포트만 오픈해줄 설정 필요)
import morgan from 'morgan'; //로그 기록을 남기는 모듈
import chalk from "chalk";
import apiController from './controllers/apiController.js';
import pageController from './controllers/pageController.js';

const PORT = 4000; //static 고정들은 대문자 써주기
const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(cors());
app.use(morgan('dev'));

app.use('/api', apiController);
app.use('/', pageController);


app.listen(PORT, () => console.log(chalk.black.bgBlue `Example app listening on port ${PORT}!`));