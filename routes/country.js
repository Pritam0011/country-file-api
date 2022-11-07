const router=require('express').Router();


const data = require('../country.json')
router.get('/',(req,res)=>{
    res.json(data)
})


module.exports=router;