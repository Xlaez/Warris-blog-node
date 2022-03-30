const { Router } = require('express');
const { createDraft, deleteDraft, fetchDraft, fetchDrafts } = require('../src/controllers/drafts.controller');

var router = Router();

router.get('/', fetchDrafts)
router.get('/:id', fetchDraft)
router.post('/', createDraft);
router.delete('/:id', deleteDraft)


module.exports.draftRoute = router;