var ground,groundImage,backgroundImage,invisibleGround;
var hero,heroImage;
var zombie,zombie1,stupidZombieImage;
var ninjaZombie;
var bullet,bulletImage;
var gameOver,gameOverImage;
var restart,restartImage;
var deadHero;
var firstAid,firstAidImage;
var ninjaZombieGroup,stupidZombieGroup;
var hero_position="right";
var bulletGroup;
var gameState="Play";
var score=0;


function preload(){
 backgroundImage=loadImage("images/background.png");
 heroImage1=loadImage("images/shooter_1.png");
 heroImage2=loadImage("images/shooter_2.png");
 zombie1=loadImage("images/zombie_5.png");
 groundImage=loadImage("images/ground.png");
 bulletImage=loadImage("images/bullet.png");
 stupidZombieImage=loadImage("images/zombie_4.png");
 gameOverImage=loadImage("images/GameOver.png");
 restartImage=loadImage("images/restart.png");
 firstAidImage=loadImage("images/firstAid.png");
 deadHero=loadImage("images/smoke.png");

}


function setup() {
  createCanvas(windowWidth,windowHeight);

  invisibleGround=createSprite(width/2,height-10,width,70);

  ground=createSprite(width/2,height,width,2);
  ground.addImage(groundImage);
  //ground.x=width/2;
  //ground.velocityX=-5;

  hero=createSprite(100,height-100,100,100);
  hero.addImage(heroImage2);
  hero.scale=0.15;
  stupidZombieGroup= new Group();
  ninjaZombieGroup= new Group();
  bulletGroup=new Group();

 restart=createSprite(width/2,height/2);
 restart.addImage(restartImage);
 restart.visible=false;

 gameOver=createSprite(width/2,height/2-200);
 gameOver.addImage(gameOverImage);
 gameOver.visible=false;
}


function draw() {
 background(backgroundImage);
if(gameState==="Play"){
  if(keyDown("LEFT_ARROW")){
    hero.x=hero.x-5;
    hero.addImage(heroImage2);
    hero_position="left";
    
  }
  if(keyDown("RIGHT_ARROW")){
    hero.x=hero.x+5;
    hero.addImage(heroImage1);
    hero_position="right";
    
  }
  if(keyDown("SPACE")&&hero_position==="right"){
    bullet=createSprite(20,10,20,20);
    bullet.addImage(bulletImage);
    bullet.x=hero.x+117;
    bullet.y=hero.y-42;
    bullet.velocityX=+20;
    bulletGroup.add(bullet)
    bullet.lifetime=200;
    
  }
  if(keyDown("SPACE")&&hero_position==="left"){
    bullet=createSprite(20,10,20,20);
    bullet.addImage(bulletImage);
    bullet.x=hero.x-117;
    bullet.y=hero.y-42;
    bullet.velocityX=-20;
    bulletGroup.add(bullet)
    bullet.lifetime=200;
    
  }
  
  for(var i=0 ; i<stupidZombieGroup.length;i++){
    if(bulletGroup.isTouching(stupidZombieGroup.get(i))){
      score=score+5;
      stupidZombieGroup.get(i).destroy();
      bulletGroup.destroyEach();
    }
  }
  for(var i=0 ; i<ninjaZombieGroup.length;i++){
    if(bulletGroup.isTouching(ninjaZombieGroup.get(i))){
      score=score+50;
      ninjaZombieGroup.get(i).destroy();
      bulletGroup.destroyEach();
    }
  }
  if(stupidZombieGroup.isTouching(hero)){
    gameState="pause";
    if(hero.x>150){
      firstAid=createSprite(hero.x-120,hero.y);
      firstAid.addImage(firstAidImage);
      firstAid.scale=0.3;
    }
    else{
      firstAid=createSprite(hero.x+120,hero.y);
      firstAid.addImage(firstAidImage);
      firstAid.scale=0.3;

    }
    ninjaZombieGroup.destroyEach();
    stupidZombieGroup.destroyEach();
  }
  if(ninjaZombieGroup.isTouching(hero)){
    hero.addImage(deadHero);
    gameState="end";
  }
  spawnNinjaZombie();
  spawnStupidZombie();

}
else if(gameState==="pause"){
  firstAid.visible=true;
  if(confirm("first aid arrived ...i will be back ")){
    gameState="Play";
    hero.addImage(heroImage1);
    firstAid.visible=false;
  }

}
else if(gameState="end"){
  gameOver.visible=true;
  restart.visible=true;
  ninjaZombieGroup.destroyEach();
  stupidZombieGroup.destroyEach();
  if(mousePressedOver(restart)){
    reset();
  }
}



ninjaZombieGroup.collide(ground);
stupidZombieGroup.collide(ground);
 hero.collide(ground)
  
  drawSprites();
  textSize(50);
  fill("black");
  text("score"+score,30,50)
}
function spawnNinjaZombie(){
  if(frameCount%80===0){
    ninjaZombie=createSprite(random(80,width-50),-40,20,20);
    ninjaZombie.addImage(zombie1);
    ninjaZombie.velocityY=+4;
    ninjaZombieGroup.add(ninjaZombie);
    ninjaZombie.scale=0.2;

  }
}

function spawnStupidZombie(){
  if(frameCount%200===0){
    stupidZombie=createSprite(random(80,width-50),-40,20,20);
    stupidZombie.addImage(stupidZombieImage);
    stupidZombie.velocityY=+8;
    stupidZombie.scale=0.2;
    stupidZombieGroup.add(stupidZombie);
    

  }

}
 function reset(){
   gameState="Play";
   score=0;
   gameOver.visible=false;
   restart.visible=false;
   hero.addImage(heroImage_1);
 }