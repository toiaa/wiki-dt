const express = require('express');
const router = express.Router();
const userRouter = require('./user'); 
const wikiRouter = require('./wiki');



router.get('/', (req,res)=>{
    res.render('index');
});

router.use('/user', userRouter);
router.use('/wiki', wikiRouter); 

module.exports = router;




