class SlingShot {
    //We pass a body (bird) and a point (x:200, y:50) here
    constructor(body1, point) {
        //We set the options/properties for the constraint we are creating
        var options = {
            bodyA: body1,
            pointB: point,
            stiffness: 0.04,
            length: 10
        }
        this.sling1 = loadImage('sprites/sling1.png');
        this.sling2 = loadImage('sprites/sling2.png');
        this.sling3 = loadImage('sprites/sling3.png');

        //Creates the constraint
        this.sling = Constraint.create(options);
        //Assigns point to this.pointB so we can use it display()
        this.pointB = point;

        //Adds the constraint to the world
        World.add(world, this.sling);
    }

    //Attaches the bird back to the slingshot
    attach(body) {
        this.sling.bodyA = body;
    }

    //Releases the bird from the slingshot and makes it fly away
    fly() {
        this.sling.bodyA = null;
    }

    display() {
        image(this.sling1, 200, 20);
        image(this.sling2, 170, 20);
        if (this.sling.bodyA) {
            var pointA = this.sling.bodyA.position;
            var pointB = this.sling.pointB;
            //We can use push() before writing the settings for creating the lines
            push();
            //Stroke : used to give the line colour
            stroke(48, 22, 8);
            /* If the bird is behind the catapult, we need to make the rubber band thicker
            by increasing strokeWeight and then display the base of the catapult behind the bird*/
            if (pointA.x < 220) {
                //High strokeWeight
                strokeWeight(7);
                line(pointA.x - 20, pointA.y, pointB.x - 10, pointB.y);
                line(pointA.x - 20, pointA.y, pointB.x + 30, pointB.y - 3);
                image(this.sling3, pointA.x - 30, pointA.y - 10, 15, 30);
            }
            /* If the bird is in front of the catapult, we need to make the rubber band thinner
            by reducing strokeWeight and then display the base of the catapult in front of the bird*/
            else {

                //Low strokeWeight
                strokeWeight(3);
                line(pointA.x + 25, pointA.y, pointB.x - 10, pointB.y);
                line(pointA.x + 25, pointA.y, pointB.x + 30, pointB.y - 3);
                image(this.sling3, pointA.x + 25, pointA.y - 10, 15, 30);
            }

            //We should use pop to revert the settings to their original state
            pop();
        }
    }

}