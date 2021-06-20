class Log extends BaseClass{
  constructor(x,y,height,angle){
    super(x,y,20,height,angle);
    this.image = loadImage("sprites/wood2.png");
    //Using the angle passed via the constructor, the angle of the log body is set
    Matter.Body.setAngle(this.body, angle);
  }
}