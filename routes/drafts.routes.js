const { Router } = require('express');
const { createDraft, deleteDraft, fetchDraft, fetchDrafts } = require('../src/controllers/drafts.controller');

var router = Router();

router.post('/', createDraft);
router.delete('/:id', deleteDraft)
router.get('/:id', fetchDraft)
router.get('/', fetchDrafts)


module.exports.draftRoute = router;