const Feedback = require("../Models/Feedback");
const eventHandler = require("../utils/eventHandler");
const NodeGeocoder = require('node-geocoder');

module.exports.getAllReviews = async function(req, res){
    
    try{
        const feedbacks = await Feedback.find();
        console.log(feedbacks);
        res.status(200).json(feedbacks);
    }catch(e){
        eventHandler(res, e);
    }
}
module.exports.deleteReview = async function(req, res){
    try{
        console.log(req.body)
        await Feedback.remove({_id: req.params.id});
        res.status(200).json({
            message: "Feedback was deleted"
        });
    }catch(e){
        console.error(e);
    }
}
module.exports.addReview = async function(req, res){
    try{
            
            const options = {
            provider: 'google',
            apiKey: 'AIzaSyBmpsulfDZcum02Yz_Nsa71MO3NLkM2ZFE', 
            formatter: null 
        };
 
        const geocoder = NodeGeocoder(options);
        const resss = await geocoder.geocode(req.body.city);
        const feedback = await new Feedback({
            name: req.body.name,
            group:req.body.group,
            city:req.body.city,
            placeOfWork:req.body.placeOfWork,
            feedback: req.body.feedback,
            imageSrc: req.file ? req.file.path : '',
            coor: resss[0].latitude+","+resss[0].longitude,
            mail: req.body.mail
        }).save();

        res.status(201).json(feedback);
    }catch(e){
        console.log(e);
    }
}

module.exports.getFeedById = async function(req, res){
    try{
        const feedback = await Feedback.findById(req.params.id);
        console.log(feedback)
        res.status(200).json(feedback);
    }catch(e){
        console.error(e);
    }
}