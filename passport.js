const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const con = require('./connection');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "magieqka123"
};

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            var loginQuery = 'select * from users where username = \'' + req.body.username +
                '\' and password = \'' + req.body.password + '\';';
            con.query(loginQuery, function (error, result) {
                console.log(JSON.stringify(result));
                if (JSON.stringify(result) !== "[]") {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        })
    );
};