const express = require("express");
const router = express.Router();
const path = require('path');
router
    .route("/")
    .get((req, res) => res.render(path.resolve("views/index.ejs")));



    router.post('/', (req, res)=>{
        const data = req.body
        const getLyrics = require("../lib/getLyrics")
        const getImage = require("../lib/getAlbumArt")
        const getSong = require("../lib/getSong")
        const options = {
            apiKey: 'yE0bQNV47CnlB6fL6PhvgKouVCVIw6bf29qWYtF3oKsD-T4D1Eo-tn0sQYNhLpkR',
            title: data.title,
            artist: data.author,
            optimizeQuery:true
        }
        getLyrics(options).then((lyrics)=>{
            console.log(lyrics)
            res.render('lyrics.ejs', {asd : lyrics})
        })
    
        
        
        
    
        
    })
module.exports = router;