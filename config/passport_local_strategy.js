const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Employee = require('../models/employee');

// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, async (req, email, password, done) => {

    try {
        //first find the user in the database if exist
        const employee = await Employee.findOne({ email: email });

        //if user does not exist or the password id wrong
        if (!employee || employee.password != password) {
            return done(null, false);
        }
        // if all OK and CORRECT
        done(null, employee);
    } catch (error) {
        console.log("passport_local_strategy ---->", error);
        return done(error)
    }
}))


// to save a specific key in the session cookie ---> serialize the user
passport.serializeUser((employee, done) => {
    done(null, employee.id);
})

// to get the whole user object when required ---> deserializeUser
passport.deserializeUser(async (id, done) => {
    try {
        //first find the user in the database if exist
        const employee = await Employee.findById(id);
        done(null, employee);

    } catch (error) {
        console.log("passpost_local_strategy ----> deserialize user---->", error);
        return done(error)
    }
})

// to check if the user is allowed to visit the requested page
passport.checkAuthentication =(req,res,next)=>{
    //if the user is signed in then pass the req to the next function (controllers)
    if(req.isAuthenticated()){
        return next();
    }
//if user is not signed in then redirect to sign in page
    return res.redirect('back')
}


passport.checkAdmin =(req,res,next)=>{
    //if the user is signed in then pass the req to the next function (controllers)
    if(req.isAuthenticated() && req.user.isAdmin){
        return next();
    }
//if user is not signed in then redirect to sign in page
    return res.redirect('back')
}

passport.setAuthenticatedUser = (req,res, next)=>{
    if(req.isAuthenticated()){
        res.locals.employee =req.user;
    }
    next();
}

module.exports= passport;