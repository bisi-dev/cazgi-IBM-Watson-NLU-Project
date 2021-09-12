const express = require('express');
const app = new express();

/*This tells the server to use the client 
folder for all static resources*/
app.use(express.static('client'));

/*This tells the server to allow cross origin references*/
const cors_app = require('cors');
app.use(cors_app());

/*Uncomment the following lines to loan the environment 
variables that you set up in the .env file*/

const dotenv = require('dotenv');
dotenv.config();

// const api_key = process.env.API_KEY;
// const api_url = process.env.API_URL;

function getNLUInstance() {
    /*Type the code to create the NLU instance and return it.
    You can refer to the image in the instructions document
    to do the same.*/
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2021-08-01',
        authenticator: new IamAuthenticator({
            apikey: '{apikey}',
        }),
        serviceUrl: '{url}',
    });

    return naturalLanguageUnderstanding;

}


//The default endpoint for the webserver
app.get("/",(req,res)=>{
    res.render('index.html');
  });

//The endpoint for the webserver ending with /url/emotion
app.get("/url/emotion", (req,res) => {
    //Extract the url passed from the client through the request object
    let urlToAnalyze = req.query.url
    const analyzeParams = 
        {
            "url": urlToAnalyze,
            "features": {
                "keywords": {
                                "emotion": true,
                                "limit": 1
                            }
            }
        }
     
     const naturalLanguageUnderstanding = getNLUInstance();
     
     naturalLanguageUnderstanding.analyze(analyzeParams)
     .then(analysisResults => {
        //Print the JSON returned by NLU instance as a formatted string
        console.log(JSON.stringify(analysisResults.result.keywords[0].emotion,null,2));
        //Please refer to the image to see the order of retrieval
        return res.send(analysisResults.result.keywords[0].emotion,null,2);
     })
     .catch(err => {
     return res.send("Could not do desired operation "+err);
     });
});

// //The endpoint for the webserver ending with /url/sentiment
// app.get("/url/sentiment", (req,res) => {
//     return res.send("url sentiment for "+req.query.url);
// });

// //The endpoint for the webserver ending with /text/emotion
// app.get("/text/emotion", (req,res) => {
//     return res.send({"happy":"10","sad":"90"});
// });

// app.get("/text/sentiment", (req,res) => {
//     return res.send("text sentiment for "+req.query.text);
// });

app.get("/url/sentiment", (req,res) => {
    console.log(Object.getOwnPropertyNames(req))

    console.log(req.query.url)
    const nluInstance = getNLUInstance()

    console.log(typeof nluInstance)
    console.log(Object.getOwnPropertyNames(nluInstance))
    let responseResults;
    const analyzeParams = {
        'url': req.query.url,
        'features': {
            'sentiment': {}

        },
    };
    
    nluInstance.analyze(analyzeParams)
        .then((analysisResults,responseResults) => {
            console.log(JSON.stringify(analysisResults, null, 2));
            responseResults= analysisResults.result.sentiment.document;
            console.log(responseResults)
            console.log(typeof responseResults)
            return res.send(responseResults.label);
        })
        .catch(err => {
            console.log('error:', err);
            responseResults= JSON.parse(err.body).error;
            return res.send(`Text sentiment for \"${req.query.text}\": 
            Error: ${responseResults}`);
        });
});

app.get("/text/emotion", (req,res) => {
    console.log(Object.getOwnPropertyNames(req))
    console.log(req.query.text)
    const nluInstance = getNLUInstance()
    console.log(typeof nluInstance)
    console.log(Object.getOwnPropertyNames(nluInstance))
    const analyzeParams = {
        'features': {
            'emotion': {}

        },
        'text': req.query.text
    };
    nluInstance.analyze(analyzeParams)
        .then((analysisResults,responseResults) => {
            console.log(JSON.stringify(analysisResults, null, 2));
            responseResults= analysisResults.result.emotion.document.emotion;
            console.log(responseResults)
            console.log(typeof responseResults)
            const textResponse = `Text sentiment for ${req.query.text} : 
             sadness: ${responseResults.sadness}, 
             joy: ${responseResults.joy}, 
             fear: ${responseResults.fear}, 
             disgust: ${responseResults.disgust}, 
             anger: ${responseResults.anger}`
            return res.send(responseResults);
        })
        .catch(err => {
            console.log('error:', err);
            responseResults= JSON.parse(err.body).error;
            return res.send(`Text emotion for \"${req.query.text}\": 
            Error: ${responseResults}`);
        });
    
});

app.get("/text/sentiment", (req,res) => {
    console.log(Object.getOwnPropertyNames(req))

    console.log(req.query.text)
    const nluInstance = getNLUInstance()

    console.log(typeof nluInstance)
    console.log(Object.getOwnPropertyNames(nluInstance))
    let responseResults;
    const analyzeParams = {
        'features': {
            'sentiment': {}

        },
        'text': req.query.text
    };
    
    nluInstance.analyze(analyzeParams)
        .then((analysisResults,responseResults) => {
            console.log(JSON.stringify(analysisResults, null, 2));
            responseResults= analysisResults.result.sentiment.document;
            console.log(responseResults)
            console.log(typeof responseResults)
            return res.send(responseResults.label);
        })
        .catch(err => {
            console.log('error:', err);
            responseResults= JSON.parse(err.body).error;
            return res.send(`Text sentiment for \"${req.query.text}\": 
            Error: ${responseResults}`);
        });
    
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

