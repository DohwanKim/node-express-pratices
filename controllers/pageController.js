import { Router } from 'express';

let router = Router();

router.get('', (req, res) => {
    res.render('docs.html');
});

export default router;