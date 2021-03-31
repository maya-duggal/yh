var PLAY = 1;
var END = 0;
var gameState = PLAY;

var astronaughtImg;
var fireballImg;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;
var fireGroup;
var backgroundImg
var earthImg;

var jumpSound, collidedSound;

var gameOver;
var  backgroundImage;


function preload(){
  
  backgroundImage = loadImage("assets/space.png");
  jumpSound = loadSound("assets/sounds/jump.wav");
  collidedSound = loadSound("assets/sounds/collided.wav");
  astronaughtImg=loadImage("assets/astronaught.png");
  earthImg=loadImage("assets/earth.png");
  
  obstacle1 = loadImage("assets/asteroid2.png");
  obstacle2 = loadImage("assets/asteroid3.png");
  obstacle3 = loadImage("assets/asteroid.png");
  obstacle4 = loadImage("assets/asteroid4.png");
  
  gameOverImg = loadImage("assets/gameOver.png");
  fireballImg= loadImage("assets/fireball.png");

  invisibleLineImg=loadImage("assets/red.png")
  
}



function setup() {
  createCanvas(800, 600);

  background = createSprite(0,210,800,600);
  background.addImage(backgroundImage);
  background.scale = 2.5
  
  astronaught = createSprite(200,220,20,50);
  astronaught.addImage(astronaughtImg); 
  astronaught.scale = 0.1;

  earth = createSprite(-650,220,20,50);
  earth.addImage(earthImg); 
  earth.scale = 1;

  gameOver = createSprite(100, 30);
  gameOver.addImage(gameOverImg);
  
  invisibleLine1=createSprite(-400, 250, 0, 200);
  invisibleLine1.addImage(invisibleLineImg); 
  invisibleLine1.visible=false;

  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  obstacle1Group = new Group();
  obstacle2Group = new Group();
  obstacle3Group = new Group();
  obstacle4Group = new Group();
  fireGroup=new Group();
  
  score = 0;
}

function draw() {

    if (gameState===PLAY){

      background.velocityX = -3 

    if (background.x < 0){
      background.x = background.width/2;
    }

    astronaught.y = World.mouseY
  
    var select_obstacle = Math.round(random(1,4));
  
  if (World.frameCount % 70 == 0) {
    if (select_obstacle == 1) {
      Asteroid1();
    } else if (select_obstacle == 2) {
      Asteroid2();
    } else if (select_obstacle == 3) {
      Asteroid3();
    } else {
      Asteroid4();
    }
  }

      if (keyWentDown(RIGHT_ARROW)) {
        releaseFireball();
      }
      
      if (fireGroup.isTouching(obstacle1Group)){
        obstacle1Group.destroyEach();
        fireGroup.destroyEach();
        score=score+1
      }

        if (fireGroup.isTouching(obstacle2Group)){
        obstacle2Group.destroyEach();
        fireGroup.destroyEach();
            score=score+1
      }

        if (fireGroup.isTouching(obstacle3Group)){
        obstacle3Group.destroyEach();
        fireGroup.destroyEach();
            score=score+1
      }

        if (fireGroup.isTouching(obstacle4Group)){
        obstacle4Group.destroyEach();
        fireGroup.destroyEach();
            score=score+1
      }

      if(obstacle1Group.isTouching(astronaught)){
        gameState=END;
        }

      if(obstacle2Group.isTouching(astronaught)){
        gameState=END;
        }  
        
      if(obstacle3Group.isTouching(astronaught)){
        gameState=END;
        }
    
      if(obstacle4Group.isTouching(astronaught)){
        gameState=END;
           }   
           
      if(obstacle1Group.isTouching(invisibleLine1)){
         gameState=END;
         }
    
          if(obstacle2Group.isTouching(invisibleLine1)){
            gameState=END;
            }  
            
          if(obstacle3Group.isTouching(invisibleLine1)){
            gameState=END;
            }
        
          if(obstacle4Group.isTouching(invisibleLine1)){
            gameState=END;
               }           
     
      
    }
    else if (gameState === END) {
      gameOver.visible = true;
     
      fill("white");
     
      //set velcity of each game object to 0
    
      
      background.velocityX = 0; 
      obstacle1Group.velocityX = 0; 
      obstacle2Group.velocityX = 0; 
      obstacle3Group.velocityX = 0; 
      obstacle4Group.velocityX = 0; 
      fireGroup.velocityX=0;

      if(touches.length>0 || keyDown("SPACE")) {      
        reset();
        touches = []
      }
      
    
      obstacle1Group.setVelocityXEach(0);
      obstacle2Group.setVelocityXEach(0);
      obstacle3Group.setVelocityXEach(0);
      obstacle4Group.setVelocityXEach(0);
      fireGroup.setVelocityXEach(0);
      
      
     
      //set lifetime of the game objects so that they are never destroyed
      obstacle1Group.setLifetimeEach(-1);
      obstacle2Group.setLifetimeEach(-1);
      obstacle3Group.setLifetimeEach(-1);
      obstacle4Group.setLifetimeEach(-1);
      fireGroup.setLifetimeEach(-1);
      
     
    }
    
    
    drawSprites();
    fill("white")
    text("Score: "+ score, 730,30);
    fill("white")
    text("press the right arrow to release the fireballs and destroy the asteroids", 420,60);
    
  
}


function reset(){
  gameState = PLAY;
  gameOver.visible = false;

  
  obstacle1Group.destroyEach();
  obstacle2Group.destroyEach();
  obstacle3Group.destroyEach();
  obstacle4Group.destroyEach();

  fireGroup.destroyEach();

  score = 0;
  
}

function Asteroid2() {
  var  asteroid2= createSprite(600,Math.round(random(0, 500)), 10, 10);
  asteroid2.addImage(obstacle1);
  asteroid2.velocityX = -(6 + 10*score/100);
  asteroid2.lifetime = 190;
  asteroid2.scale = 0.15;
  obstacle2Group.add(asteroid2);

  return asteroid2
  
}

function Asteroid3() {
  var asteroid3 = createSprite(600,Math.round(random(0, 500)), 10, 10);
  asteroid3.addImage(obstacle2);
  asteroid3.velocityX = -(6 + 10*score/100);
  asteroid3.lifetime = 190;
  asteroid3.scale = 0.038;
  obstacle3Group.add(asteroid3);

  return asteroid3;
}

function Asteroid1() {
  var asteroid1 = createSprite(600,Math.round(random(0, 500)), 10, 10);
  asteroid1.addImage(obstacle3);
  asteroid1.velocityX =-(6 + 10*score/100);
  asteroid1.lifetime = 190;
  asteroid1.scale = 0.07;
  obstacle1Group.add(asteroid1);

  return asteroid1;   
}

function Asteroid4() {
  var asteroid4 = createSprite(600,Math.round(random(0, 500)), 10, 10);
  asteroid4.addImage(obstacle4);
  asteroid4.velocityX = -(6 + 10*score/100);
  asteroid4.lifetime = 190;
  asteroid4.scale = 0.07
  obstacle4Group.add(asteroid4);
  return asteroid4;
}

function releaseFireball() {
  var fireball= createSprite(100, 100, 60, 10);
  fireball.addImage(fireballImg);
  fireball.x = 260;
  fireball.y=astronaught.y;
  fireball.velocityX = 4;
  fireball.lifetime = 100;
  fireball.scale = 0.01; 
  fireGroup.add(fireball);
  return fireball;

}

