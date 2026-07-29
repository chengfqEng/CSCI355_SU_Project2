var express = require('express');
var axios = require("axios");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect("/signup");
});

router.get('/homepage', function(req, res, next) {
  res.render('projectDescription', { title: 'Document' });
});

router.get('/vacation-spot', async function(req, res) {
    // THIS IS FOR OPEN.WEATHER
    // const baseURL = "https://generativelanguage.googleapis.com"
    // const endpoint = "/v1beta/models/gemini-3.6-flash:generateContent"
    // const myParams = {
    //     appid: process.env.APIKEY
    // }
    
    try {
        // const response = await axios.post(baseURL + endpoint, contentcon, { 
        //         params: myParams
        //     }

        // THIS IS FOR GOOGLEGENAI GETTING RESPONSE-----------------.
        const {GoogleGenAI} = require("@google/genai");
        const responsesend = new GoogleGenAI({
            apiKey: process.env.APIKEY
        });
        
        const responseback = await responsesend.interactions.create({
            model: "gemini-3.6-flash",
            input:"write about top 10 vacation spots. Please don't use markdown language.Break each vacations spot apart with a blank line. Also make it a list with small paragraphs description."
    });

        res.type("text/plain").send(responseback.output_text);
    } catch (error) {
    res.status(500).send("Error fetching vacation data");
}

});

router.get('/signin', function(req, res, next) {
  res.render("signin");
});

router.get('/signup', function(req, res, next) {
  res.render("signup");
});

router.get('/contact', (req, res) => {
    res.render('contact');
});

// This is reusing the class code.
router.get('/recommendation', (req, res) => {
      const vacationspots = [
            { place: "Japan", reason: "Beautiful culture" },
            { place: "Australia", reason: "beautifle wildlands"},
            { place: "Canada", reason: "Beautiful scenaries"},
            { place: "France", reason: "Beautiful street view"},
            { place: "Britain", reason: "Rich history" },
        ];

    res.render('recommendation', {vacationspots: vacationspots});
});

module.exports = router;
