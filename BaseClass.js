//This is the template or parent class for creating all the other classes except Ground.js
//It contains all the common properties and functions

class BaseClass{
    constructor(x, y, width, height, angle) {
        var options = {
            'restitution':0.8,
            'friction':1.0,
            'density':1.0
        }
        this.body = Bodies.rectangle(x, y, width, height, options);
        this.width = width;
        this.height = height;
        //We load a placeholder image here
        this.image = loadImage("sprites/base.png");
        World.add(world, this.body);
      }

      //This display function can be accessed by the child class objects 
      display(){
        var angle = this.body.angle;
        //Pushing in the settings to be applied on the image
        push();
        //Translating or moving the image to the given position 
        translate(this.body.position.x, this.body.position.y);
        //Rotating the image based on the angle provided
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0, 0, this.width, this.height);
        //Reverting to the original settings
        pop();
      }
}