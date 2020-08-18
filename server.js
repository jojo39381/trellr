const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const youtube = require('youtube-api');

const open = require('open');
const fs = require('fs');
const credentials = require('./credentials.json')
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());






const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})



const oAuth = youtube.authenticate({
    type:'oauth',
    client_id:credentials.web.client_id,
    client_secret:credentials.web.client_secret,
    redirect_url:credentials.web.redirect_uris[0]
})
app.post('/upload', (req, res) => {
    if (req.file) {
        
        const {title, description, url} = req.body;

        open(oAuth.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://ww.googleapis.com/auth/youtube.upload',
            state: JSON.stringify({
                url,title, description
            })
        }))
    }
})

app.get('/oauth2callback', (req, res) => {
    res.redirect('https://www.google.com')
    const {filename,title, description} = JSON.parse(res.query.state);
    oAuth.getToken(req.query.code, (err, tokens) => {
        if (err) {
            console.log(err)
            return;
        }
        oAuth.setCredentials(tokens);
        youtube.video.insert({
            resource: {
                snippete: {title, description},
                status: {privacyStatus: 'private'}
            },
            part: 'snippet,status',
            media: {
                body: request('http://fromrussiawithlove.com/baby.mp3').pipe(fs.createWriteStream('song.mp3'))
            }
        }, (err, data) => {
            console.log(err)
            process.exit()
        })
    })

})
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
const apiRouter = require('./routes/api');
const { stringify } = require('querystring');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

if (process.env.NODE_ENV === "production") {

    
    app.use(express.static("client/build"));
    const path = require('path')
 
    app.get("*", (req, res) => {
         res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
     });
 
   }
app.listen(port, () => {
    console.log('server is running on port:' + port);
})


