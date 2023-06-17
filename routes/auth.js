const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

const con = require('../connection');
router.post("/login", async(req, res) => {
    console.log(req.body);

    try {
        console.log(req.cookies);
        var loginQuery = 'select * from users where username = \'' + req.body.username +
            '\' and password = \'' + req.body.password + '\';';
        con.query(loginQuery, function (error, result) {
            console.log(JSON.stringify(result));
            if (JSON.stringify(result) !== "[]") {
                const token = jwt.sign(
                    {username: user.username},
                    "magieqka123",
                    {
                        expiresIn: "1h",
                    }
                );
                res.json({message: "Logged in successfully", token});
                res.redirect('/stream');
            }
        });
    } catch (e) {
        console.log(e.message);
    }
});

module.exports = { router };