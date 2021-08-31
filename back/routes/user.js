var express = require('express');
var router = express.Router();
var User = require('../controllers/user')

router.get('/', User.findAll);

router.get('/:id', User.findOneUser);

router.post('/', User.addUser);

router.put('/:id', User.update);

router.patch('/:id', User.update);

module.exports = router;
