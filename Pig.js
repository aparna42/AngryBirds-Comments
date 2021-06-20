//class Pig is a child of BaseClass

class Pig extends BaseClass {
  constructor(x, y){
    //Passing values to the parent class constructor
    super(x,y,50,50);
    this.image = loadImage("sprites/enemy.png");
    //Initially, visibility property of each pig object to be maximum (255)
    this.Visiblity = 255;
  }

  //Used to display individual elemts on the screen
 display(){
   //If the pig's speed is under 3, it has not been hit by the bird
   if(this.body.speed < 3){
   //We display the pig by accessing the parent class display function
    super.display();
   }
   //Otherwise, we remove the physics engine pig body and replace it with an image which slowly fades away
   else{
     World.remove(world, this.body);
     push();
     //Decreasing visibility by 5
     this.Visiblity = this.Visiblity - 5;
     //Applying a tint over the pig image that makes it transparent
     tint(255,this.Visiblity);
     //Displaying an image in position of the pig object
     image(this.image, this.body.position.x, this.body.position.y, 50, 50);
     pop();
   }
  }

  //Created a function called score to calculate score on hitting pigs
  score(){
    //When the pigs are hit, their visibility keeps decreasing by 5 for each frame in the game

    //If the visibility is between 0 and a threshold value -1005, we increment the score variable
    if (this.Visiblity < 0 && this.Visiblity > -1005){
      score++;
    }
  }



};