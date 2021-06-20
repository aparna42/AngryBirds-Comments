class Bird extends BaseClass {
  constructor(x,y){
    //Passing values to the parent class constructor
    super(x,y,50,50);
    this.image = loadImage("sprites/bird.png");
    //Loads the smoke image
    this.smokeImage = loadImage("sprites/smoke.png");
    //Creating an array to store the bird's trajectory across the screen
    this.trajectory =[];
  }

  display() {
    //this.body.position.x = mouseX;
    //this.body.position.y = mouseY;

    super.display();

    /*If the bird's velocity in the x direction is above 10, and its x position is past the slingshot (200),
    we store the bird's x and y position in an array called "position". This array is pushed into the trajectory 
    array, creating an array of arrays */ 
    if(this.body.velocity.x > 10 && this.body.position.x > 200){
      var position = [this.body.position.x, this.body.position.y];
      this.trajectory.push(position);
    }
   
    /*We iterate or traverse through each element in the trajectory array which contains all the bird's 
      x and y positions across the screen. Each pair of x and y positions is an individual array. 
      
      For example: this.trajectory can be [[1,100],[2,200], [3,300], .....]

      We need to access each x and y value within the this.trajectory array and display a smoke image there.
      => this.trajectory[i] refers to an individual array inside the big array
      => this.trajectory[i][0] refers to x position of an individual array
      => this.trajectory[i][1] refers to y position of an individual array

      Using these values, we print the smoke image trail.
      */
    for(var i=0; i<this.trajectory.length; i++){
      image(this.smokeImage, this.trajectory[i][0], this.trajectory[i][1]);
    }
  }
}
