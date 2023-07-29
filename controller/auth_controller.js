const Employee = require('../models/employee')



module.exports.login = (req, res) => {
   // console.log(req.session);
   
   if (req.isAuthenticated()){
      if(req.user.isAdmin)
      return res.redirect('/admin');
      else
      return res.redirect('/employee');
   }
   return res.render('login', {
      title: "Sign Up page",
      showHeader: false
   });
}


// create user if the user tries to signup 
module.exports.signup = async (req, res) => {
   try {

      if (req.body.password != req.body.confirmPassword) {
         // req.flash('error', 'Passwords do not match');
         return res.redirect('back');
      }

      const employee = await Employee.findOne({ email: req.body.email });
      if (!employee) {
         const createEmployee = await Employee.create(req.body);
         const size = await Employee.find();
         if (size.length === 1) {
            createEmployee.isAdmin = true;
            createEmployee.save();
            return res.redirect('/admin');
         } else {
            return res.redirect('/employee');
         }
      } else {
         return res.redirect('back');
      }
   } catch (error) {
      console.log(error);
   }
}


module.exports.signin = async (req, res) => {
   if (!req.isAuthenticated()) {
      return res.redirect('/')
   }

   if(req.user.isAdmin)
   return res.redirect('/admin');
   else
   return res.redirect('/employee');

}


module.exports.destroySession = async function (req, res) {

   req.logout(function (err) {
      if (err) {
         console.log("error in sign out")
      }
   });
   return res.redirect('/')
}
