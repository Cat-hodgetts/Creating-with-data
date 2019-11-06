const express = require('express');
//This tells the program to require express
const Datastore = require('nedb');
//This tells the program to require nedb

const app = express();
//This runs express
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Starting server at ${port}`);
});
//This block tells this file to run the process at port 3000 so it it hosted. 
app.use(express.static('public'));
//This shows the program where to look for file to run
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();
//This tells the program where to look for data and to load it 

app.post('/api', (request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json(data);

});
//This block requests the data and allows the data to be timestamped and put the data into a timecode and then into the database.


app.get('/api', (request, response) => {
    database.find({}, function(err, docs) {
        database.find({}).sort({ timestamp: 1 }).exec(function(err, docs) {
            response.json(docs);
        });

    });

});

//This block sorts the timestams so they appear in chronological order. 