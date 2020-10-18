var towerImage,tower;
var doorImage,door;
var climberImage,climber;
var ghostImage,ghost;
var climberGroup,invisibleGroup,doorGroup;
var InvisibleBlock;
var gameState="play";
function preload(){
  towerImage=loadImage("tower.png")
  doorImage=loadImage("door.png")
  climberImage=loadImage("climber.png")
  ghostImage=loadImage("ghost-standing.png")
}


function setup(){
  createCanvas(600,600)
  
  tower=createSprite(300,300)
  tower.addImage("tower",towerImage)
  tower.velocityY=1;
  
  ghost=createSprite(200,200,50,50)
  ghost.addImage("ghost",ghostImage)
  ghost.scale=0.3;
  
  doorGroup=new Group();
  invisibleGroup=new Group();
  climberGroup=new Group();
}

function draw(){
  background("black")
  
  if(gameState==="play"){

  if(keyDown("space")){
    ghost.velocityY=-6;
  }
  if(keyDown("right")){
    ghost.x=ghost.x+3;
  }
  if(keyDown("left")){
    ghost.x=ghost.x-3;
  }
  ghost.velocityY=ghost.velocityY+0.5;
  if(tower.y>400){
    tower.y=300;
  }
  
  spawndoor();
  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
     }
    if(invisibleGroup.isTouching(ghost)||ghost.y>600){
      ghost.destroy();
      gameState="end";
  }
  
  drawSprites();
}
  if(gameState==="end"){
    fill("Red");
    textSize(30);
    text("Game Over",230,230);
  }
}

function spawndoor(){
    //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    door = createSprite(200, -50);
    climber = createSprite(200,10);
    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
   
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
   
    door.addImage(doorImage);
    climber.addImage(climberImage);
   
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
   
    ghost.depth = door.depth;
    ghost.depth =ghost.depth+1;
   
    //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

   
    //add each door to the group
    doorGroup.add(door);
    invisibleBlock.debug = true;
    climberGroup.add(climber);
    invisibleGroup.add(invisibleBlock);
  }
}

