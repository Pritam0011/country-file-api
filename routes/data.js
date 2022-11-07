const router=require('express').Router();
const dataRou = require('../config/controller')
const path=require('path')
router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/ok.html'))
});

router.post('/',dataRou.index);
router.get('/all',dataRou.allData);
router.get('/download/:id',dataRou.download);
router.get('/download/file/:id',dataRou.download_file);

module.exports=router;