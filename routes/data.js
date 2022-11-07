const router=require('express').Router();
const dataRou = require('../config/controller')


router.post('/',dataRou.index);
router.get('/all',dataRou.allData);
router.get('/download/:id',dataRou.download);
router.get('/download/file/:id',dataRou.download_file);
router.get('/drop/:id',dataRou.drop);

module.exports=router;