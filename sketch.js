//Create variables here
var foodStock1,foodObj,lastFed, database,readState,changeState,bedroom_img,garden_img,washroom_img
var gameState,bath

function preload()
{
	//load images here
  dog=loadImage("images/dogImg.png")
  dog_happy=loadImage("images/dogImg1.png")
  bottleimage=loadImage("images/Milk.png")
  garden_img=loadImage("images/Garden.png")
  living_img=loadImage("images/LivingRoom.png")
  bedroom_img=loadImage("images/BedRoom.png")
  washroom_img=loadImage("images/WashRoom.png")
  lazy=loadImage("images/Lazy.png")
}

function setup() {


	createCanvas(800,800);

  database = firebase.database();  

  foodStockDB=database.ref('FoodStock')
  lastFedDB=database.ref('LastFed')
    
  foodStockDB.on("value",readStock)
  lastFedDB.on("value",readLastFed)

  readState=database.ref('gameState')
  readState.on("value",getGameState); 

  feed1=createButton('Add the food')
  feed1.position(500,100);
  feed1.mousePressed(addFoods)

  bath1=createButton('I need a bath')
  bath1.position(600,100)
  sleep1=createButton('I need a sleep')
  sleep1.position(700,100)
  play1=createButton('I need to play in a garden')
  play1.position(800,100)
  
  play2=createButton('I need to play ')
  play2.position(1000,100)
  
  dog2=createSprite(500,400,20,20);
  dog2.addImage(dog);
  dog.resize(100,100); 

  bath1.mousePressed(updateGameStateToBath);
  sleep1.mousePressed(updateGameStateToSleep);
  play1.mousePressed(updateGameStateToGarden)
  play2.mousePressed(updateGameStateToPlay);
}


function draw() {  
  background(0,0,83)
  foodObj = new Food(foodStock1, lastFed, bottleimage);
  foodObj.display()
  //writeStock(foodStock1)

  if(foodStock1==0){
    dog2.addImage(dog_happy)
    bottleimage.visible=false
  }
  else{
    dog2.addImage(lazy)
    lazy.resize(100,100)
    bottleimage.visible=true
  }

  if(gameState===1){
    dog2.addImage(dog_happy)
    dog2.scale=0.175
    dog.y=250
  }

  if(gameState===2){
    dog2.addImage(lazy)
    dog2.scale=0.175
    bottleimage.visible=false
    dog.y=250
  }  
  
  if(gameState===3){
    dog2.addImage(washroom_img)
    dog2.scale=2
    bottleimage.visible=false
  }
  
  if(gameState===4){
    dog2.addImage(bedroom_img)
    dog2.scale=2
    bottleimage.visible=false
  }

  if(gameState===5){
    dog2.addImage(garden_img)
    dog2.scale=1.5
    bottleimage.visible=false
  }
        
  if(gameState===6){
    dog2.addImage(living_img)
    dog2.scale=2
    bottleimage.visible=false
  }
  
 
  //add styles here

  textSize(15);  
 
  if(foodObj.lastFed>12){
    text("Last Feed:"+foodObj.lastFed%12+" PM",400,30)
  }
  else if(foodObj.lastFed==0){
    text("Last Feed :12 AM",400,30)
  }
  else if(foodObj.lastFed==12){
    text("Last Feed :12 PM",400,30)
  }
  else{
    text("Last Feed:"+foodObj.lastFed+" AM",400,30)
  }
  // textColor("gray");
  text("Remaining Stock="+""+foodObj.foodStock,200,30)
  drawSprites();

}

function readStock(data){  
  foodStock1=data.val();
}

function getGameState(data){
  gameState=data.val();
}
function writeStock(x){  
  database.ref('/').update({
    FoodStock:x
  })
}

function updateGameStateToBath(){   
  gameState =3; 
  database.ref('/').update({'gameState':gameState})
}

function updateGameStateToSleep(){   
  gameState =4; 
  database.ref('/').update({'gameState':gameState})
}

function updateGameStateToGarden(){   
  gameState =5; 
  database.ref('/').update({'gameState':gameState})
}

function updateGameStateToPlay(){   
  gameState =6; 
  database.ref('/').update({'gameState':gameState})
}


function readLastFed(data){
  lastFed=data.val();
}

function feedDog(){
  
  dog2.addImage(dog_happy);
  dog_happy.resize(100,100);
 // dog_happy.resize(100,100)

  if (foodObj.getFoodStock() > 1)
  {
    foodObj.updateFoodStock(foodObj.getFoodStock()-1)
    database.ref('/').update({
      FoodStock:foodObj.getFoodStock(),
      LastFed:hour()
    })
  }
}

function addFoods(){
  foodStock1++
  database.ref('/').update({
    FoodStock:foodStock1   
  }
  )}
  

  function update(state){
    database.ref('/').update({
      gameState:state   
    })
  }