var localStrategy = require('passport-local');
var userModel = require('../models/userModel');

module.exports = function(passport){
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        userModel.findById(id, function(err, user){
            done(err, user);
        });
    });

    passport.use('local-signup', new localStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, username, password, done){
        process.nextTick(function(){
            userModel.findOne({ 'username': username }, function(err, user){
                if(err)
                    return done(err);
                if(user){
                    console.log(req.flash('signupMessage'));
                    return done(null, false, req.flash('signupMessage, Username taken'));
                }else{
                    newUser = new userModel();

                    newUser.username = username;
                    newUser.password = newUser.hashPwd(password);

                    newUser.save(function(err){
                        if(err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
            
        });
    }))

    passport.use('local-login', new localStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true},
        function(req, username, password, done){
            userModel.findOne({'username': username}, function(err, user){
                if(err)
                    return err;
                if(!user)
                    return done(null, false);
                if(!user.compareHash(password))
                    return done(null, false);
                
                return done(null, user);
            });
        }));
};