const { Router } = require('express');
const { signup, signin } = require('../src/controllers/auth.controller');

const router = Router();

router.post('/', signup);
router.post('/signin', signin)

module.exports.authRoute = router;