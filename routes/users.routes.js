const { Router } = require('express');
const { grantAccess } = require('../middleware/isAdmin');
const { getUsers, getSingleUser, saveUserData, deleteUser, setAnimations, requestEditor, requestAdmin, getAdminsMsg } = require('../src/controllers/users.controller');
const { setLightTheme } = require('../src/controllers/users.controller');

const router = Router();

router.get('/', [grantAccess], getUsers);
router.get('/:id', getSingleUser)
router.get('/msg/id', getAdminsMsg)
router.post('/request/editor/:id', requestEditor)
router.post('/', saveUserData);
router.post('/request/admin/:id', requestAdmin)
router.post('/theme', setLightTheme);
router.post('/animate', setAnimations);
router.delete('/:id', deleteUser);


module.exports.usersRoute = router;