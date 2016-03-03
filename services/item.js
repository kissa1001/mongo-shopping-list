var Item = require('../models/item');

exports.save = function(name, callback, errback) {
    Item.create({ name: name }, function(err, item) {
        if (err) {
            errback(err);
            return;
        }
        callback(item);
    });
};

exports.list = function(callback, errback) {
    Item.find(function(err, items) {
        if (err) {
            errback(err);
            return;
        }
        callback(items);
    });
};

exports.remove = function(objId, callback, errback) {
    Item.remove({ _id: objId }, function(err, item) {
        if (err) {
            errback(err);
            return;
        }
        
        callback(item);
    });
};

exports.update = function(objId, name, callback, errback) {
    Item.update({ _id: objId }, { name: name }, function(err, item) {
        if (err) {
            errback(err);
            return;
        }
        
        callback(item);
    });
};