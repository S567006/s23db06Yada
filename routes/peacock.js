var express = require('express');
var router = express.Router();
const peacock_controllers = require('../controllers/peacock');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('peacock', { title: 'Search Results peacock' });
// });

/* GET peacocks */
router.get('/', peacock_controllers.peacock_view_all_Page);

module.exports = router;
const secured = (req, res, next) => {
    if (req.user){
    return next;
    }
req.session.returnTo = req.originalUrl;
res.redirect ("/login");
}
/* GET detail peacock page /
router.get('/detail', peacock_controllers.peacock_view_one_Page);

/* GET create peacock page */
router.get('/create', peacock_controllers.peacock_create_Page);

/* GET update peacock page */
router.get('/update', peacock_controllers.peacock_update_Page);

/* GET delete peacock page */
router.get('/delete', peacock_controllers.peacock_delete_Page);


