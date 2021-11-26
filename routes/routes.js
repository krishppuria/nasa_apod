const express = require("express")
const router = express.Router();
const planetryService = require("../service/planetry")

getApodData = async(req,res,next)=>{
    try {
        let date=req.query["date"] || new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
        let data = await planetryService.checkApod(date)
        res.status = 200;
        res.render('index', data);
    } catch (err) {
        next(err)
    }
}
router.get('/', getApodData)

router.get('/apod', getApodData)


module.exports = router;