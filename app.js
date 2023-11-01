//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const formidable = require('formidable');
const path = require('path');
const ejs = require("ejs");



const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req ,  file , cb )=>{
    cb(null, "Images")
  },
  filename:(req, file , cb ) => {
    console.log(file)
    cb(null, Date.now()  + path.extname(file.originalname))
  } 
})

const upload  = multer ({storage: storage  })



const homeStartingContent = "Welcome to our dermoscoic diagonsis website.";
const aboutContent = "Paragraph of About page.";
const contactContent = "Paragraph of contact us page.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let imageUser = [];

app.get("/", function(req,res){

res.render("home", {HomeContent : homeStartingContent });
});

app.post("/upload", upload.single("image") ,function(req,res){
  res.send("Image Uploaded")
});



app.get('/getImage', function (req, res) {
  console.log(req.query.filename)
   res.sendFile("D:/Downloads/ejs-challenge/Images/"+ req.query.filename);
});
 
// app.get("/result", function(req,res){
//   res.render("result", {Src : {srcimage}}); 
// });

app.get("/transmitter", function(req,res){
  res.render("transmitter");

  //  console.log(imageUser);
  // imageUser.pop;
  });

app.get("/about", function(req,res){
res.render("about", {AboutContent : aboutContent }); 
});

app.get("/contact", function(req,res){
res.render("contact", {contactContent : contactContent }); 
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
