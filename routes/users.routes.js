const { Router } = require('express');
const { grantAccess } = require('../middleware/isAdmin');
const { getUsers, getSingleUser, makeAdmin, saveUserData, deleteUser, setAnimations } = require('../src/controllers/users.controller');
const { setLightTheme } = require('../src/controllers/users.controller');

const router = Router();

router.get('/', [grantAccess], getUsers);
router.get('/:id', getSingleUser)
router.post('/admin/:id', makeAdmin)
router.post('/', saveUserData);
router.delete('/:id', deleteUser);
router.post('/theme', setLightTheme);
router.post('/animate', setAnimations);


module.exports.usersRoute = router;