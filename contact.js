var express = require('express');
var http = require('http');
var path = require('path');
var nodemailer = require('nodemailer');

var app = express();
var server = http.Server(app);
var port = 500;

app.set('port', port);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "pages/contact.html")));

//Routing
app.get("/", function(req, response)
{
    response.sendFile(path.join(__dirname, "pages/contact.html"))
})

app.post("/send_email", function(req, response)
{
    //Fetches info from form
    var first_name = req.body.first_name
    var last_name = req.body.last_name
    var to = "contact.decclan@gmail.com";
    var from = req.body.from;
    var subject = req.body.subject;
    var message = req.body.message;

    var transporter = nodemailer.createTransport(
        {
        service: 'gmail',
        auth: {
            user: "contact.decclan@gmail.com",
            pass: "pbet rywd mqyl cphk"
        }
    })

    var mailOptions = 
    {
        from: from,
        to: to,
        subject: subject,
        text: `First Name: ${first_name}\nLast Name: ${last_name}\nEmail: ${from}\n\nMessage:\n${message}`,
        html: `
            <p><strong>First Name:</strong> ${first_name}</p>
            <p><strong>Last Name:</strong> ${last_name}</p>
            <p><strong>Email:</strong> <a href="mailto:${from}">${from}</a></p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
        `
    }

    transporter.sendMail(mailOptions, function(error, info)
    {
        if (error){
            console.log('Error occurred: ' + error)
        } else {
            console.log("Email sent: " + info.response)
        }
        //returns to main page
        response.redirect("/")
    })

})

//Initialise Web Server
server.listen(port, function()
{
    console.log("Starting server on port: " + port)
})