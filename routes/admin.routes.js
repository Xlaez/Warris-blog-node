const { Router } = require('express');
const { getEditorRequest, makeAdmin, makeEditor, reviewArticle, getAllAuthors, getAllEditors, getTotalArticles, getTotalAuthors, getTotalEditors, getAuthorWithHighestArticles, sendMsg } = require('../src/controllers/admin.controller');

const router = Router();
router.get("/request", getEditorRequest);
router.post('/make/admin/:id', makeAdmin);
router.post("/make/editor/:id", makeEditor);
router.post("/review/:id", reviewArticle)
router.get("/all/editors", getAllEditors)
router.get("/all/authors", getAllAuthors);
router.get("/total/articles", getTotalArticles)
router.get('/total/authors', getTotalAuthors);
router.get('/total/editors', getTotalEditors)
router.get('/author/article/most', getAuthorWithHighestArticles);
router.post("/send/msg", sendMsg);
module.exports.adminRoute = router;

