const { Router } = require('express');
const { grantAccess } = require('../middleware/isAdmin');
const { getUsers, getSingleUser, saveUserData, deleteUser, setAnimations, requestEditor, requestAdmin } = require('../src/controllers/users.controller');
const { setLightTheme } = require('../src/controllers/users.controller');

const router = Router();

router.get('/', [grantAccess], getUsers);
router.post('/request/admin/:id', requestAdmin)
router.post('/request/editor/:id', requestEditor)
router.get('/:id', getSingleUser)
router.post('/', saveUserData);
router.delete('/:id', deleteUser);
router.post('/theme', setLightTheme);
router.post('/animate', setAnimations);


module.exports.usersRoute = router;