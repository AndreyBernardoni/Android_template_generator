const express = require('express');
const bodyParser = require('body-parser');

// Instance of pdf generator
const pdf = require("html-pdf");

// Instance of ejs
const ejs = require("async-ejs");

const app = express();

// Setting de configuration
const PORT = process.env.PORT || 3000;
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

// Route for the index page
app.get('/', (req, res) => {
    res.render('index');
});

// Route for the notebook term form
app.get('/notebook', (req, res) => {
    res.render('notebook');
});

// Route for the success page
app.get('/successful', (req, res) => {
    res.render('successful');
});

// Route for generate pdf
app.post('/generate', (req, res) => {

    // Getting the current date
    const date = new Date();
    const currentYear = date.getFullYear();
    const today = date.getDate();
    const currentMonth = date.getMonth() + 1;
    const currentDate = `${today}/${currentMonth}/${currentYear}`;

    // Transforming the data into UpperCase
    var machineId = req.body.machineId.toUpperCase();
    var sector = req.body.sector.toUpperCase();

    // Rendering the html template
    ejs.renderFile(
        "./templates/notebookTemplate.ejs", { userName: req.body.name, machineNumber: machineId, sector: sector, date: currentDate },
        (err, html) => {
            if (err) {
                console.log(err);
            } else {
                // Generating the pdf
                pdf.create(html, {}).toFile("./output/" + req.body.name + "_" + machineId + ".pdf", (err, res) => {
                    if (err) {
                        return console.log(err);
                    } else {
                        return console.log(res);
                    }
                });
            }
        }
    );
    // Redirecting to the success page
    res.redirect('/successful');
});