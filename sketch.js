var START = 0;
var PLAY = 1;
var END = 2;
var gamestate = 0;// start mode

var Ash,Ash_Running,ashimg,ash;
var pikachu,pikachu_running,pika,pikaimg;
var groundimg,backimg,ingrnd;
var hydrant,hydrantimg;
var restart,restartimg;
var start,startimg;

function preload(){

  Ash_Running = loadAnimation("Images/ash1.png","Images/ash2.png","Images/ash3.png","Images/ash4.png","Images/ash5.png","Images/ash6.png");
  
  pikachu_running = loadAnimation("Images/pika1.png","Images/pika2.png","Images/pika3.png","Images/pika4.png");
  
  groundimg = loadImage("Images/bg.png");
  pikaimg = loadAnimation("Images/pika2.png") 
  ashimg = loadAnimation("Images/ash5.png")
  hydrantimg = loadImage("Images/hydrant.png")
  restartimg = loadImage("Images/restart.png")
  startimg = loadImage("Images/start.png")
}

function setup() {
 createCanvas(600,250);
  
  backimg = createSprite(216,100,200,20);
  backimg.addImage(groundimg)
  backimg.scale = 0.4;
  
  Ash = createSprite(559,80,20,20);
  Ash.addAnimation("not running",ashimg);
  Ash.addAnimation("running",Ash_Running);
  Ash.scale = 0.9;
  Ash.setCollider("circle",-20,30,60);
  Ash.debug = false;
  
  pikachu = createSprite(150,140,20,20);
  pikachu.addAnimation("notrunnig",pikaimg);
pikachu.addAnimation("running",pikachu_running);
  
  ingrnd = createSprite(450,170,300,10);
  ingrnd.visible = false;
  
  hydrantGroup = createGroup();
  
  restart = createSprite(300,125,20,20);
  restart.addImage(restartimg);
  restart.scale = 0.2;
  
  start = createSprite(300,125,20,20);
  start.addImage(startimg);
  start.scale = 0.1;
}

function draw() {
  background("black");
  
  // in start mode
    if (gamestate === 0){
      
      restart.visible = false;
      start.visible = true;
      
      //changes gamestate into play mode
        if (keyDown("Enter") || mousePressedOver(start) || touches.Length > 0){
          gamestate = 1;
        }
      
    }  //end of gamestate 0
  
  
  //in play mode
    if (gamestate === 1){
      
    Ash.changeAnimation("running",Ash_Running);
    pikachu.changeAnimation("running",pikaimg);
      pikachu.velocityX = -2;
      
      //to escap from the obstacles
      if(keyDown("Up")||touches.Length > 0){
        Ash.velocityY = -18;
      }
      
      // gravity
      Ash.velocityY = Ash.velocityY + 0.8;
      
      //to make background move
      backimg.velocityX = 5;
      if(backimg.x > 385){
        backimg.x = backimg.width/8;
      }
      
      //spawn hydrant
      spawnHydrant();
      
      //steps to get into the gamestate === 2
      if(hydrantGroup.isTouching(Ash)){
        gamestate = 2;
      }
      restart.visible = false;
      start.visible = false;
    }//end of gamestate 1
  
      if(gamestate === 2){
      
        Ash.changeAnimation("not running",ashimg);
        pikachu.changeAnimation("notrunnig",pikaimg);
        pikachu.velocityX = 0;

        backimg.velocityX = 0;

        hydrantGroup.setLifetimeEach(-1);
        hydrantGroup.setVelocityXEach(0);
        //basic stops here
        
        //code starts
        restart.visible = true;
        start.visible = false;
        if(mousePressedOver(restart) || touches.Length > 0 || keyDown("r")){
            reset();
          }
      }
  
  //always collide by the invisibleground
    Ash.collide(ingrnd);

  drawSprites();
}

function reset(){
  gamestate = 0;
  restart.visible = false
  hydrantGroup.destroyEach();
  pikachu.x = 150;
}

function spawnHydrant() {
  if(frameCount % 100 === 0){
    var hydrant = createSprite(-1,130,20,20);
    hydrant.addImage(hydrantimg);
    hydrant.scale = 0.18;
    hydrant.lifetime = 150;
    hydrant.velocityX = 5
    hydrant.debug = false;
    hydrant.setCollider("circle",0,0,200);
    
    hydrantGroup.add(hydrant);
  }
}