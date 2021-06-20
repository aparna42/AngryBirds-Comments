class Ground {
    constructor(x,y,width,height) {
      //We write options to make the ground static
      var options = {
          isStatic: true
      }
      //When creating a rectangular body, we pass the x and y positions, width, height and options
      this.body = Bodies.rectangle(x,y,width,height,options);
      /*Assigning width and height to the properties this.width and this.height
        so they can be used outside the constructor in display() */
      this.width = width;
      this.height = height;
      World.add(world, this.body);
    }
    display(){
      //Storing the ground body's position
      var pos =this.body.position;
      rectMode(CENTER);
      fill("brown");
      //Displaying a rectangle using the position of the ground body and its width and height
      rect(pos.x, pos.y, this.width, this.height);
    }
  };
