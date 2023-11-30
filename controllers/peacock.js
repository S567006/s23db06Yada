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

// Handle a show one view with id specified by query
exports.peacock_view_one_Page = async function(req, res) {
    console.log("single view for id " + req.query.id)
    try{
    result = await peacock.findById( req.query.id)
    res.render('peacockdetail',
    { title: 'peacock Detail', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
    };
// Handle building the view for creating a costume.
// No body, no in path parameter, no query.
// Does not need to be async
exports.peacock_create_Page = function(req, res) {
    console.log("create view")
    try{
    res.render('peacockcreate', { title: 'Peacock Create'});
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
    };

    // Handle building the view for updating a costume.
    // query provides the id
exports.peacock_update_Page = async function(req, res) {
console.log("update view for item "+req.query.id)
try{
let result = await peacock.findById(req.query.id)
res.render('peacockupdate', { title: 'peacock Update', toShow: result });
}
catch(err){
res.status(500)
res.send(`{'error': '${err}'}`);
}
};
// Handle peacock update form on PUT.
exports.peacock_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body
    ${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await peacock.findById( req.params.id)
        // Do updates of properties
        if(req.body.peacock_color) toUpdate.peacock_color = req.body.peacock_color;
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


// Handle Costume delete on DELETE.
exports.peacock_delete = async function(req, res) {
    console.log("delete " + req.params.id)
    try {
    result = await peacock.findByIdAndDelete( req.params.id)
    console.log("Removed " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": Error deleting ${err}}`);
    }
    };
 /*   
// for a specific peacock.
exports.peacock_detail = function(req, res) {
res.send('NOT IMPLEMENTED: peacock detail: ' + req.params.id);
};
*/
/*
// Handle peacock create on POST.
exports.peacock_create_post = function(req, res) {
res.send('NOT IMPLEMENTED: peacock create POST');
};
*/
// Handle peacock delete form on DELETE.
//exports.peacock_delete = function(req, res) {
//res.send('NOT IMPLEMENTED: peacock delete DELETE ' + req.params.id);
//};
/*
// Handle peacock update form on PUT.
exports.peacock_update_put = function(req, res) {
res.send('NOT IMPLEMENTED: peacock update PUT' + req.params.id);
};
*/
// VIEWS
// Handle a show all view
exports.peacock_view_all_Page = async function(req, res) {
try{
    thepeacocks = await peacock.find();
    console.log(thepeacocks);
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
// for a specific peacock.
exports.peacock_detail = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
    result = await peacock.findById( req.params.id)
    res.send(result)
    } catch (error) {
    res.status(500)
    res.send(`{"error": document for id ${req.params.id} not found`);
    }
    };
    
// Handle a delete one view with id from query
exports.peacock_delete_Page = async function (req, res) {
    console.log("Delete view for id " + req.query.id)
    try {
      result = await peacock.findById(req.query.id)
      res.render('peacockdelete', { title: 'peacock Delete', toShow: result });
    }
    catch (err) {
      res.status(500)
      res.send(`{'error': '${err}'}`);
    }
  };
  