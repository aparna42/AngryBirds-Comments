
//namespacing the modules in matter.js into a smaller name that is easier to write
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

//declaring global variables
var engine, world;
var box1, pig1, pig3;
var backgroundImg, platform;
var bird, slingshot;

//var gameState = "onSling";

//We set the default value of the variable bg as the path of image "bg1.png"
var bg = "sprites/bg1.png";
//We initialize the score as 0
var score = 0;

//We call the function getBackgroundImg() in function preload()
function preload() {
    getBackgroundImg();
}

function setup() {
    var canvas = createCanvas(1200, 400);
    //Creates a new engine
    engine = Engine.create();
    //Storing the engine's world which will contain all the bodies and constraints in the variable "world"
    world = engine.world;


    ground = new Ground(600, height, 1200, 20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700, 320, 70, 70);
    box2 = new Box(920, 320, 70, 70);
    pig1 = new Pig(810, 350);

   /* The constant PI here is a measure of angles
       PI radians = 180 degrees 
       => PI/2 radians = 90 degrees */
    log1 = new Log(810, 260, 300, PI / 2);

    box3 = new Box(700, 240, 70, 70);
    box4 = new Box(920, 240, 70, 70);
    pig3 = new Pig(810, 220);

    log3 = new Log(810, 180, 300, PI / 2);

    box5 = new Box(810, 160, 70, 70);
    log4 = new Log(760, 120, 150, PI / 7);
    log5 = new Log(870, 120, 150, -PI / 7);

    bird = new Bird(200, 50);

    //log6 = new Log(230,180,80, PI/2);
    
    //Creates a new constraint between the bird's body and the given x and y coordinates
    slingshot = new SlingShot(bird.body, { x: 200, y: 50 });
}

function draw() {

    // If an image exists and is loaded in backgroundImg, we display the content of this variable as the background image
    if (backgroundImg)
        background(backgroundImg);

    //noStroke: no outline for the text for score
    noStroke();
    textSize(35)
    fill("white")
    //Displaying score
    text("Score  " + score, width - 300, 50)
    
    //Updates the engine to move the simulation forward
    Engine.update(engine);
    
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    
    //Calling the score function for pig1 for every frame in the game -> the visibility change is activated only when the bird hits the pig 
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    
     //Calculating score for pig 3 - same thing as pig1
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();
}

//Makes the bird's body move along with the mouse only if the mouse is dragged
function mouseDragged() {
   // if (gameState !== "launched") {
        Matter.Body.setPosition(bird.body, { x: mouseX, y: mouseY });
   // }
}

//Makes the bird fly away from the slingshot when the mouse is released
function mouseReleased() {
    slingshot.fly();
    //gameState = "launched";
}

//Used to re-attach the bird to the catapult for a second shot
function keyPressed() {
    //If the space key is pressed and the bird is stationary (speed < 1), we re-attach it 
    if (keyCode === 32 && bird.body.speed < 1) {
        
     //Every time the bird is reset, we remove the extra smoke trails by clearing the bird.trajectory array    
     bird.trajectory = [];
        
     //When the space key is pressed, the bird is re-attached at the position specified below
     Matter.Body.setPosition(bird.body,{x:200, y:50});
     slingshot.attach(bird.body);
    }
}


//Creates an asynchronous function getBackgroundImg
async function getBackgroundImg() {
    //We use await to wait for the information to be retrieved from the API before the next instruction executes
    var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
    //We extract the json part from the PROMISE of information contained in the response from the API
    var responseJSON = await response.json();
    //We extract datetime from the json data in responseJSON
    var datetime = responseJSON.datetime;
    //We slice the hour part from datetime
    var hour = datetime.slice(11, 13);

    //Displaying the background based on the time of day
    //If the hour is between 6 and 19, we store the path of the day image in variable bg [6am - 7pm : Day & 8pm - 5am : Night]
    if (hour >= 06 && hour <= 19) {
        bg = "sprites/bg1.png";
    }
    //Otherwise we store the night image
    else {
        bg = "sprites/bg2.jpg";
    }
    //We load the path in bg to our variable backgroundImg
    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}

