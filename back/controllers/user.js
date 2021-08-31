let User = require("../models/user")

exports.findAll = function (req, res) {
    User.find({},function (err, users) {
        if (err)
            {res.send(err)
            console.log(err)}
        else {
            res.setHeader('Content-Range', `${users.length}`)
            res.send(users)
        }
    })
}


exports.addUser = function (req, res) {

    let UserData = req.body

    User.create({...UserData}, function (err) {
        if (err)
            res.send(err)

        else
            res.json({error:false, message: 'User Added successfully'})
    })
}

exports.findOneUser = function (req, res) {
    User.findOne({ id: req.params.id}, function (err, users) {
        if (err)
            res.send(err)
        else{
            res.send(users)
        }
    })
}

exports.update = function (req, res) {

    let UserData = req.body

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: 'Please provide all required field'
        });
    } else {
        if(req.method === 'PATCH'){
            User.patchUpdate(req.params.id, new User({...UserData}), function (err, user) {
                if (err)
                    return res.send({
                        error: true,
                        message: err.message
                    });

                res.json({
                    error: false,
                    message: 'User successfully updated'
                });

            });
        }else{
            User.findOneAndUpdate({id: req.params.id}, {$set: UserData},{ useFindAndModify: false }, function (err, users) {
                if (err)
                    return res.send({
                        error: true,
                        message: err.message
                    });
                res.send(users)

            });
        }
    }
};