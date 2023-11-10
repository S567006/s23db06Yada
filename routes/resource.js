var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var peacock_controller = require('../controllers/peacock');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// peacock ROUTES ///
// POST request for creating a peacock.
router.post('/peacocks', peacock_controller.peacock_create_post);
// DELETE request to delete peacock.
router.delete('/peacocks/:id', peacock_controller.peacock_delete);
// PUT request to update peacock.
router.put('/peacocks/:id', peacock_controller.peacock_update_put);
// GET request for one peacock.
router.get('/peacocks/:id', peacock_controller.peacock_detail);
// GET request for list of all peacock items.
router.get('/peacocks', peacock_controller.peacock_list);
module.exports = router;
// API for our resources
exports.api = function(req, res) {
res.write('[');
res.write('{"resource":"peacocks", ');
res.write(' "verbs":["GET","PUT", "DELETE"] ');
res.write('}');
res.write(']')
res.send();
};
// Handle peacock update form on PUT.
exports.peacock_update_put = async function(req, res) {
console.log(`update on id ${req.params.id} with body
${JSON.stringify(req.body)}`)
try {
let toUpdate = await peacock.findById( req.params.id)
// Do updates of properties
if(req.body.peacock_color)
toUpdate.peacock_color = req.body.peacock_color;
if(req.body.peacock_breed) toUpdate.peacock_breed = req.body.peacock_breed;
if(req.body.peacock_price) toUpdate.peacock_price = req.body.peacock_price;
let result = await toUpdate.save();
console.log("Sucess " + result)
res.send(result)
} catch (err) {
res.status(500)
res.send(`{"error": ${err}: Update for id ${req.params.id}
failed`);
}
};