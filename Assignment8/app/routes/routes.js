const Users = require("../model/user");
const bcrypt = require("bcrypt");
const { countDocuments } = require("../model/user");

module.exports = (app) => {
    // server routes ===========================================================
    // handle things like api calls
    // authentication routes
    // sample api route

    const emailRegex = new RegExp("[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+");
    const passwordRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$");

    app.get('/user/getAll', function (req, res) {
        Users.find({}, function (err, users) {
            if (err) {
                res.json({ errorCode: 10, message: "Cant get users" });
            } else {
                res.status(200);
                res.json({ errorCode: 0, users });
            }
        })
    })

    app.post('/user/create', function (req, res) {

        const emailID = req ? req.body ? req.body.emailID ? req.body.emailID : null : null : null;
        const password = req ? req.body ? req.body.password ? req.body.password : null : null : null;

        res.status(200);
        if (!emailID || !password) {
            res.json({ errorCode: 1, errorMessage: "Email or Password missing" });
        } else if (!emailRegex.test(emailID)) {
            res.json({ errorCode: 2, errorMessage: "Email nonconforming" });
        } else if (!passwordRegex.test(password)) {
            res.json({ errorCode: 3, errorMessage: "Password nonconforming" });
        } else {
            const salt = 8;
            bcrypt.hash(password, salt, function (err, hash) {
                if (err) {
                    res.json({ errorCode: 4, errorMessage: "Error in encryption" });
                } else {
                    let rec = new Users({ emailID: emailID, password: hash });
                    rec.save(function (err, n) {
                        if (err) {
                            res.json({ errorCode: 5, errorMessage: "Error in creation of new user" });
                        } else {
                            res.json({ errorCode: 0, message: "User created with ID: " + n });
                        }
                    })
                }
            })
        }
    });


    app.post('/user/edit', function (req, res) {

        const emailID = req ? req.body ? req.body.emailID ? req.body.emailID : null : null : null;
        const password = req ? req.body ? req.body.password ? req.body.password : null : null : null;
        const newPassword = req ? req.body ? req.body.newPassword ? req.body.newPassword : null : null : null;
        const newEmailID = req ? req.body ? req.body.newEmailID ? req.body.newEmailID : null : null : null;

        res.status(200);
        if (!emailID || !password || !newEmailID || !newPassword) {
            res.json({ errorCode: 1, errorMessage: "One of the required fields missing" });
        } else if (!emailRegex.test(emailID)) {
            res.json({ errorCode: 2, errorMessage: "Email nonconforming" });
        } else if (!passwordRegex.test(password)) {
            res.json({ errorCode: 3, errorMessage: "Password nonconforming" });
        } else if (!emailRegex.test(newEmailID)) {
            res.json({ errorCode: 2, errorMessage: "New Email nonconforming" });
        } else if (!passwordRegex.test(newPassword)) {
            res.json({ errorCode: 3, errorMessage: "New Password nonconforming" });
        } else {

            const salt = bcrypt.genSaltSync(8);
            const newPasswordHash = bcrypt.hashSync(newPassword, salt);

            Users.findOne({ emailID: emailID }, function (err, docs) {
                res.status(200);
                if (err || !docs) {
                    res.json({ errorCode: 6, message: "Cannot find user" });
                } else {
                    let hash = docs.password;
                    bcrypt.compare(password, hash, function (err, result) {
                        if (err) {
                            res.json({ errorCode: 7, message: "Error" });
                        } else if (result == true) {
                            docs.emailID = newEmailID;
                            docs.password = newPasswordHash;
                            docs.save(function (err, result) {
                                res.status(200);
                                if (err) {
                                    res.json({ errorCode: 7, message: "Email already exists" });
                                } else {
                                    res.json({ errorCode: 0, message: "Saved" });
                                }
                            })
                        } else {
                            res.json({ errorCode: 8, message: "Wrong password" });
                        }
                    })
                }
            });

        }

    });

    app.post('/user/login', async (req, res) => {
        const emailID = req ? req.body ? req.body.emailID ? req.body.emailID : null : null : null;
        const password = req ? req.body ? req.body.password ? req.body.password : null : null : null;

        res.status(200);
        if (!emailID || !password) {
            res.json({ errorCode: 1, errorMessage: "Email or Password missing" });
        } else if (!emailRegex.test(emailID)) {
            res.json({ errorCode: 2, errorMessage: "Email nonconforming" });
        } else if (!passwordRegex.test(password)) {
            res.json({ errorCode: 3, errorMessage: "Password nonconforming" });
        } else {

            Users.findOne({ emailID: emailID }, function (err, docs) {
                res.status(200);
                if (err || !docs) {
                    res.json({ errorCode: 13, message: "Email no exist" });
                } else {
                    let hash = docs.password;
                    bcrypt.compare(password, hash, function (err, result) {
                        if (err || result == false) {
                            res.json({ errorCode: 14, message: "Password does not match " + err });
                        } else {
                            res.json({ errorCode: 0, errMessage: "Successful Login" });
                        }
                    })
                }
            })

        }
    });

    app.delete('/user/delete', async (req, res) => {
        const emailID = req ? req.body ? req.body.emailID ? req.body.emailID : null : null : null;
        const password = req ? req.body ? req.body.password ? req.body.password : null : null : null;

        res.status(200);
        if (!emailID || !password) {
            res.json({ errorCode: 1, errorMessage: "Email or Password missing" });
        } else if (!emailRegex.test(emailID)) {
            res.json({ errorCode: 2, errorMessage: "Email nonconforming" });
        } else if (!passwordRegex.test(password)) {
            res.json({ errorCode: 3, errorMessage: "Password nonconforming" });
        } else {

            Users.findOne({ emailID: emailID }, function (err, docs) {
                res.status(200);
                if (err || !docs) {
                    res.json({ errorCode: 13, message: "Email no exist" });
                } else {
                    let hash = docs.password;
                    bcrypt.compare(password, hash, function (err, result) {
                        if (err || result == false) {
                            res.json({ errorCode: 14, message: "Password does not match " + err });
                        } else {
                            Users.deleteOne({ emailID }, function (err, result) {
                                if (err) {
                                    res.json({ errorCode: 18, message: "Cannot delete" });
                                } else {
                                    res.json({ errorCode: 0, message: "Deleted" });
                                }
                            })
                        }
                    })
                }
            })

        }
    })

}