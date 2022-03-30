const { Router } = require('express');
const { isAuth } = require('../middleware/isAuth');
const { createArticle, addLike, editArticle, getSingleArticle, getArticles, deleteArticle, removeLike, addComments, getComments, getMostLikedArticle, setViews, getMostViewedArticle, getAllUserArticles, getAllViewedUserArticle, getTotalLikedUserArticle, getLatestArticle, getlatesThreeArticles, getThreeMostViewed, getThreeMostLikes, sortByCategory, getHighestReviewedArticle, getSportArticles, getEducationalArticles, getEntertainmentArticles, getTechArticles } = require('../src/controllers/article.controller')
const router = Router();

router.get('/like/:id', [isAuth], getMostLikedArticle)
router.get('/views/:id', [isAuth], getMostViewedArticle);
router.get('/all/article/:id', [isAuth], getAllUserArticles)
router.get('/all/view/:id', [isAuth], getAllViewedUserArticle)
router.get('/all/like/:id', [isAuth], getTotalLikedUserArticle)
router.get('/sport', getSportArticles)
router.get('/tech', getTechArticles);
router.get('/entertainment', getEntertainmentArticles);
router.get('/education', getEducationalArticles)
router.get('/latest/article/:id', [isAuth], getLatestArticle)
router.get('/latest/articles', getlatesThreeArticles)
router.get('/latest/views', getThreeMostViewed)
router.get('/latest/likes', getThreeMostLikes)
router.get('/sort/:category', sortByCategory)
router.get("/review/:id", getHighestReviewedArticle)
router.get('/comment/:id', getComments)
router.get('/:id', getSingleArticle);
router.get('/', getArticles);
router.put('/:id', [isAuth], editArticle);
router.post('/like/:id', [isAuth], addLike)
router.post('/', [isAuth], createArticle);
router.post('/unlike/:id', [isAuth], removeLike);
router.post('/view/:id', [isAuth], setViews);
router.post('/comment/:id', [isAuth], addComments);
router.delete('/:id', [isAuth], deleteArticle);
module.exports.articleRoute = router;