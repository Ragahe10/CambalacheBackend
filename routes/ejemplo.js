const { Router } = require('express');


const router = Router();

router.get('/', ejemploGet);

router.post('/', ejemploPost);

router.put('/:id', ejemploPut);

router.delete('/:id', ejemploDelete);

module.exports = router;