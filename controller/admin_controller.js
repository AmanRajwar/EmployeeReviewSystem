// const { title } = require('process');
const Employee = require('../models/employee')
const PerformanceReview = require('../models/performance_review')
const Feedback = require('../models/feedback');


module.exports.home = async (req, res) => {

    const employees = await Employee.find();

    return res.render('admin', {
        title: "Admin",
        employees: employees,
        showHeader: true,
        isAdmin:true
    });
}

module.exports.createPerformance = async (req, res) => {
    // console.log(req.body,'aman')
    const { title, description, employeeId } = req.body;
    try {
        const exists = await PerformanceReview.findOne({
            title: title,
            description: description,
            employee: employeeId
        })
        if (exists) {
            return res.status(201).json({ message: "already Exists" })
        }
        const create = await PerformanceReview.create({
            title: title,
            description: description,
            employee: employeeId
        });

        return res.status(200).json({ message: "created successfully" })

    } catch (err) {
        console.log("error in creating performance review ===>", err)
        return res.status(201).json({ message: "Error in Creating performance review" })
    }
}


module.exports.getPerformance = async (req, res) => {

    try {
        const performance = await PerformanceReview.find().populate('employee');
        return res.render('pfmnc-review', {
            title: "Performances",
            showHeader: true,
            isAdmin:true,
            performances: performance
        })
    } catch (error) {
        console.log("error in getting performance review ===>", err);
        return res.redirect('back');
    }
}

module.exports.updatePerformance = async (req, res) => {
    const { currentTitle, currentDescription, performanceId } = req.body
    try {
        const performance = await PerformanceReview.findById(performanceId);
        performance.title = currentTitle;
        performance.description = currentDescription;
        await performance.save();
        return res.status(200).json({ message: "successfully update" });
    } catch (error) {
        console.log("error in updating performance review ===>", err);
        return res.status(500).json({ error: "Can not update" });
    }

}

module.exports.assign = async (req, res) => {
    console.log(req.body, req.query);
    try {
        const employee = await Employee.findOne({ email: req.body.email });
        if (!employee) {
            return res.redirect('back');
        }
        
        const performanceId = req.query.id;
        
        if (!employee.performanceReview.includes(performanceId)) {
            // If performance._id does not exist in employee.performanceReview, then update it
            const performance = await PerformanceReview.findById(performanceId);
performance.assignedTo.push(employee._id);
            employee.performanceReview.push(performance._id);
            performance.save();
            employee.save();
        }

        return res.redirect('back');
    } catch (error) {
        console.log("error in updating performance review ===>", err);
        return res.redirect('back');
    }
};


module.exports.getFeedback = async( req, res )=>{
    try {
        console.log("afadsfadsfa")
        const feedback = await Feedback.find({performanceReview:req.query.id}).populate('reviewer');
        if(!feedback){
            return res.status(201).json({message:"No Feedbacks Yet!"});
        }
        return res.status(201).json(feedback);
    } catch (error) {
        console.log("error in getting feedback", error);
        res.status(201).json({error:"Can not get feedback"});
    }
}

module.exports.makeAdmin = async( req, res )=>{
    try {
      const employee = await Employee.findByIdAndUpdate(req.body.employeeId,{
        isAdmin:true
      })
      if(!employee){
        console.log("wrong employee Id");
        return res.status(201).json({message: "wrong employee Id"});
      }
      return res.status(200).json(employee);
    } catch (error) {
        console.log("error in getting feedback", error);
        res.status(201).json({error:"Can not make Admin"});
    }
}

