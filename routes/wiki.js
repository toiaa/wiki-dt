const router = require('express').Router();
const { Page } = require('../models')

router.get('/', function (req, res, next) {
    Page.findAll()
        .then((pages) => {
            res.json(pages)
        })
        .catch((err) => {
            next(err);
        });
});

router.post('/', function (req, res, next) {
    let body = req.body;
    let name = body.name;
    let email = body.email;
    let title = body.title;
    let content = body.content;
    let status = body.status;
    Page.create({
        title: title,
        content: content,
        status: status,
    })
        .then(res.redirect('/wiki'))
});

router.get('/add', function (req, res, next) {
    res.render('addpage');
});
router.get('/:urlTitle', function (req, res, next) {
    let urlTi = req.params.urlTitle;
    Page.findOne({
        where: {
            urltitle: urlTi
        }
    })
        .then((page) => {
            res.render('wikipage', { page: page })
        })
        .catch((err) => {
            next(err);
        });
});



module.exports = router;