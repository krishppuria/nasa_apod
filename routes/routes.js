const express = require("express")
const router = express.Router();
const planetryService = require("../service/planetry")

getApodData = async(req,res,next)=>{
    try {
        //check if date exists in req else get today's date in 'YYYY-MM-DD' format
        const date=req.query["date"] || new Date().getFullYear() + '-' + ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + ('0' + new Date().getDate()).slice(-2);
        const apodData = await planetryService.checkApod(date)
        res.status = 200;
        res.render('index', apodData);
    } catch (err) {
        next(err)
    }
}
router.get('/', getApodData) //route without date and return's today's Apod

router.get('/apod', getApodData)// route to get previous day's Apod.


module.exports = router;