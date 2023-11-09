var peacock = require('../models/peacock');
// List of all peacocks
exports.peacock_list = async function(req, res) {
    try{
        thepeacocks = await peacock.find();
        res.send(thepeacocks);
        }
        catch(err){
        res.status(500);
        res.send(`{"error": ${err}}`);
        }
};
// for a specific peacock.
exports.peacock_detail = function(req, res) {
res.send('NOT IMPLEMENTED: peacock detail: ' + req.params.id);
};
// Handle peacock create on POST.
exports.peacock_create_post = function(req, res) {
res.send('NOT IMPLEMENTED: peacock create POST');
};
// Handle peacock delete form on DELETE.
exports.peacock_delete = function(req, res) {
res.send('NOT IMPLEMENTED: peacock delete DELETE ' + req.params.id);
};
// Handle peacock update form on PUT.
exports.peacock_update_put = function(req, res) {
res.send('NOT IMPLEMENTED: peacock update PUT' + req.params.id);
};
// VIEWS
// Handle a show all view
exports.peacock_view_all_Page = async function(req, res) {
try{
thepeacocks = await peacock.find();
res.render('peacock', { title: 'peacock Search Results', results: thepeacocks });
}
catch(err){
res.status(500);
res.send(`{"error": ${err}}`);
}
};
// Handle peacock create on POST.
exports.peacock_create_post = async function(req, res) {
    console.log(req.body)
    let document = new peacock();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"peacock_type":"goat", "cost":12, "size":"large"}
    document.peacock_color = req.body.peacock_color;
    document.peacock_breed = req.body.peacock_breed;
    document.peacock_price = req.body.peacock_price;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };