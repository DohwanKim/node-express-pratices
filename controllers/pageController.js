import {Router} from 'express';

let router = Router();

router.get('', (req, res) => {
  res.render('docs.html');
});

router.get('/register', (req, res) => {
  res.render('register.html');
});

export default router;