const Employee = require('../models/employee')
const PerformanceReview = require('../models/performance_review')
const Feedback = require('../models/feedback');



module.exports.home = async (req, res) => {
    try {
        const performance = await Employee.findById(req.user._id).populate({
            path: 'performanceReview',
            populate: {
                path: 'employee',
                model: 'Employee',
            },
        });
        // console.log(performance);
        return res.render('employee', {
            title: "Employee",
            showHeader: true,
            isAdmin: false,
            performances: performance
        })
    } catch (error) {
        console.log("Error in home controller ===>",error);
        return res.redirect('back');
    }
}


module.exports.feedback= async (req,res)=>{
    try {
        const feedback= await Feedback.findOne({
            reviewer:req.user._id,
            performanceReview:req.query.id
        })
        if(feedback.length===0){
            console.log("NO feedback Yet!!");
            return res.status(201).json({message:"NO feedback Yet!!"})
        }
    return res.status(201).json(feedback)
    } catch (error) {
        console.log("Error in feedback controller ===>",error);
        return res.status(500).json({error:"NO feedback Yet!!"});
    }
}


module.exports.createFeedback= async (req,res)=>{
    try {
        console.log(req.body);
        const feedback= await Feedback.create({
            reviewer:req.user._id,
            performanceReview:req.query.id,
            feedbackText:req.body.feedbackText
        })
        return res.status(201).json(feedback)
    } catch (error) {
        console.log("Error in create feedback controller ===>",error);
        return res.status(500).json({error:"NO feedback Yet!!"});
    }
}