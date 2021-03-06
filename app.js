//require express package
const express = require("express");

//initializing the express app
const app = express();

//require body-parser
const bodyParser =require("body-parser");

//using body-parser
app.use(bodyParser.urlencoded({extended : false}));

//using ejs rendering engine
app.set("view engine", "ejs");

/*setting a middleware directory storing images
after this a static folder is created and everything inside it is accessed from root URL*/
app.use(express.static("public"));


const randomData =[
    {title : "Terry Hasley", image : "/img/avril.jpg"}, //the images are linked using root URL since they are in an express static folder
    {title : "Sarah Hackabee", image : "/img/elemnts.png"},
    {title : "Ted Danson", image : "/img/mask.jpg"},
    {title : "Jane Eisenhower", image : "/img/pp.jpg"},
    {title : "Henrietta Levette", image : "/img/star.jpg"},
    {title : "Whoompy Goldberg", image : "/img/weed.jpg"}
]


//route to the home page
app.get("/", (req, res) => {
    res.render("home");
});

//routing the timeline
app.get("/timeline", (req, res) => {
    
    //rendering the timeline.ejs and passing data to it
    res.render("timeline" , {myData : randomData});
});

//routing the new post request for uploading a new post
app.get("/timeline/new", (req, res) => {
    res.render("newPost");
});

//route for posting
app.post("/timeline", (req, res) =>{
    //capturing user input
    let inputTitle = req.body.title;
    let inputImage = req.body.image;

    //adding the captured data to the array of posts
    randomData.push({title : inputTitle, image : inputImage});
    
    //rendering the timeline with new data
    res.redirect("/timeline");
});

//port for app to listen to
const port = "7080";
app.listen(port, () => {
    console.log(`server running on port ${port}.`)
});


