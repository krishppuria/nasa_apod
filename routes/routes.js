const express = require("express")
const router = express.Router();
const planetryService = require("../service/planetry")
router.get('/', async (req, res, next) => {
    try {
        date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
        let data = await planetryService.checkApod(date)
        res.status = 200;
        // res.json(data)
        res.render('index', data);
    } catch (err) {
        next(err)
    }
})

module.exports = router;