const { Router } = require('express');
const { isAuth } = require('../middleware/isAuth');
const { createArticle, addLike, editArticle, getSingleArticle, getArticles, deleteArticle, removeLike, addComments, getComments, getMostLikedArticle, setViews, getMostViewedArticle, getAllUserArticles, getAllViewedUserArticle, getTotalLikedUserArticle, getLatestArticle, getlatesThreeArticles,getThreeMostViewed,getThreeMostLikes } = require('../src/controllers/article.controller')
const router = Router();

router.post('/', [isAuth], createArticle);
router.get('/like/:id', [isAuth], getMostLikedArticle)
router.get('/views/:id', [isAuth], getMostViewedArticle);
router.get('/all/article/:id', [isAuth], getAllUserArticles)
router.get('/all/view/:id', [isAuth], getAllViewedUserArticle)
router.get('/all/like/:id', [isAuth], getTotalLikedUserArticle)
router.get('/latest/article/:id', [isAuth], getLatestArticle)
router.get('/latest/articles', getlatesThreeArticles)
router.get('/latest/views', getThreeMostViewed)
router.get('/latest/likes', getThreeMostLikes)
router.put('/:id', [isAuth], editArticle);
router.get('/:id', getSingleArticle);
router.delete('/:id', [isAuth], deleteArticle);
router.get('/', getArticles);
router.post('/like/:id', [isAuth], addLike)
router.post('/unlike/:id', [isAuth], removeLike);
router.post('/views/:id', [isAuth], setViews);
router.post('/comment/:id', [isAuth], addComments);
router.get('/comment/:id', getComments)
module.exports.articleRoute = router;