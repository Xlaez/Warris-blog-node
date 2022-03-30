const { Router } = require('express');
const { getEditorRequest, makeAdmin, makeEditor, reviewArticle, getAllAuthors, getAllEditors, getTotalArticles, getTotalAuthors, getTotalEditors, getAuthorWithHighestArticles, sendMsg, deleteRequests, acceptRequest } = require('../src/controllers/admin.controller');

const router = Router();
router.get("/request", getEditorRequest);
router.get("/all/editors", getAllEditors)
router.get("/all/authors", getAllAuthors);
router.get("/total/articles", getTotalArticles)
router.get('/total/authors', getTotalAuthors);
router.get('/total/editors', getTotalEditors)
router.get('/author/article/most', getAuthorWithHighestArticles);
router.post('/request', acceptRequest)
router.post("/send/msg", sendMsg);
router.post('/make/admin/:id', makeAdmin);
router.post("/make/editor/:id", makeEditor);
router.post("/review/:id", reviewArticle)
router.delete('/request/:id', deleteRequests)

module.exports.adminRoute = router;

