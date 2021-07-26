const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Render = Matter.Render;

var myEngine, myWorld;
var ball1, ball2,ground; 
var rope1, rope2;

function setup() {
  createCanvas(400,400);

  myEngine = Engine.create();

  myWorld = myEngine.world;


  var render = Render.create({

    element: document.body,
    engine: myEngine,
    options:{
      width: 400,
      height: 400,
      wireframes: false,
    }
  });

  Render.run(render);

  var ball_options = {

    restitution: 0.85
  }

  
  ball1 = Bodies.circle(200, 160, 13, ball_options);
  World.add(myWorld, ball1);

  ball2 = Bodies.circle(200,270,13, ball_options);
  World.add(myWorld,ball2);

  ground = new Ground(200, 380, 400, 20);

  ellipseMode(RADIUS);
  rectMode(CENTER);

  rope1 = Constraint.create({

    pointA: {x: 200, y:20},
    bodyB: ball1,
    //pointB is the default point on the body of the ball1. 
    //x & y are not the point on the canvas. A point on the body. Offset
    //good to have value. 
    pointB: {x:0, y:0},

    length: 110,
    stiffness: 0.1,
  });
  rope2 = Constraint.create(
    {
      bodyA: ball1,
      pointA: {x:0, y:0},
      bodyB:ball2,
      pointB: {x:0,y:0},

      length:110,
      stiffness: 0.4

    
    }
  );


  World.add(myWorld, rope1);
  World.add(myWorld,rope2);
  
}

function draw() 
{
  background(51);

  text(mouseX + "," + mouseY, mouseX, mouseY);
  Engine.update(myEngine);

  ground.display();

  ellipse(ball1.position.x,ball1.position.y,13);
  ellipse(ball2.position.x,ball2.position.y,13);

  push();
  stroke("White");
  strokeWeight(2);
  line(rope1.pointA.x, rope1.pointA.y, ball1.position.x, ball1.position.y);
  line(ball1.position.x,ball1.position.y,ball2.position.x,ball2.position.y);
  pop(); 
}


function keyPressed()
{

    if(keyCode === RIGHT_ARROW)
    {
       Matter.Body.applyForce(ball1, {x:0, y:0}, {x:0.02, y:0});
    }
}