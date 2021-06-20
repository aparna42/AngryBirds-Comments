
//namespacing the modules in matter.js into a smaller name so that it is easier to write
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

//global variables
var engine, world;
var box1, pig1, pig3;
var backgroundImg, platform;
var bird, slingshot;

//var gameState = "onSling";

//We set the default path of the variable bg as bg1.png
var bg = "sprites/bg1.png";
//We initialize the score as 0
var score = 0;

//We call the function getBackgroundImg() in preload
function preload() {
    getBackgroundImg();
}

function setup() {
    var canvas = createCanvas(1200, 400);
    //Creates a new physics engine
    engine = Engine.create();
    //The engine's world will contain all the bodies and constraints
    world = engine.world;


    ground = new Ground(600, height, 1200, 20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700, 320, 70, 70);
    box2 = new Box(920, 320, 70, 70);
    pig1 = new Pig(810, 350);

    //PI radians = 180 degrees => PI/2 radians = 90 degrees
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
    slingshot = new SlingShot(bird.body, { x: 200, y: 50 });
}

function draw() {

    // If there is a value inside this variable, use the content of this variable as the background
    if (backgroundImg)
        background(backgroundImg);

    //noStroke: no outline for the text
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
    //Calculating score for pig 1
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
     //Calculating score for pig 3
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

//Makes the body move along with the mouse only if the mouse is dragged
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

//Used to reset the bird to the catapult
function keyPressed() {
    //If space key is pressed and the bird is stationary (speed < 1), we reset it 
    if (keyCode === 32 && bird.body.speed < 1) {
    //Every time the bird is reset, we remove the extra smoke trails by clearing the bird.trajectory array    
     bird.trajectory = [];
     //When the space key is pressed, the bird is reattached at the given position
     Matter.Body.setPosition(bird.body,{x:200, y:50});
     slingshot.attach(bird.body);
    }
}


//Creates an asynchronous function getBackgroundImg
async function getBackgroundImg() {
    //We use await to wait for the information to be retrieved from the API before the next instruction executes
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    //We extract the json part from the PROMISE contained in the response from the API
    var responseJSON = await response.json();
    //We extract datetime from the json values in responseJSON
    var datetime = responseJSON.datetime;
    //We slice the hour part from datetime
    var hour = datetime.slice(11, 13);


    //If the hour is between 6 and 19, we store the path of the day image in variable bg
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

