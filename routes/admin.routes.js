const { Router } = require('express');
const { getEditorRequest, makeAdmin, makeEditor, reviewArticle } = require('../src/controllers/admin.controller');

const router = Router();
router.get("/request", getEditorRequest);
router.post('/make/admin/:id', makeAdmin);
router.post("/make/editor/:id", makeEditor);
router.post("/review/:id", reviewArticle)

module.exports.adminRoute = router;

