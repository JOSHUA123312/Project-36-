//Create variables here
var dog,happydog,dogImg
var database 
var foodS,foodStock
var feed,addFood
var fedTime,lastfed
var milk
var gameState=0
var gameS

function preload()
{
	//load images here
  happydog=loadImage("images/dogImg.png")
  dogImg=loadImage("images/dogImg1.png")
  bedRoom=loadImage("images/Bed Room.png")
  garden=loadImage("images/Garden.png")
  washRoom=loadImage("images/Wash Room.png")
}

function setup() {
  database=firebase.database();

	createCanvas(1000,500);

  milk=new Food()

  foodStock=database.ref('Food')
  foodStock.on("value",readStock)
    
  fedTime=database.ref('FeedTime')
fedTime.on("value",function(data){
  lastfed=data.val()
})

  gameState=database.ref('gameState')
  gameState.on("value",function(data){
    gameState=data.val();
  })

  dog=createSprite(800,300,10,10)
  dog.addImage(happydog)
  dog.scale=0.4

  feed=createButton("Feed the dog")
  feed.position(500,80)
  feed.mousePressed(feedDog)

  addFood=createButton("Add Food")
  addFood.position(380,80)
  addFood.mousePressed(addFoods)
  
}


function draw() {  
background(46,139,87)

currentTime=hour()
  if(currentTime==(lastfed+1)){
    update("Playing")
    milk.garden()
  }else if(currentTime==(lastfed+2)){
    update("Sleeping")
    milk.bedroom()
  }else if(currentTime>(lastfed+2) && currentTime<=(lastfed+4)){
    update("Bathing")
    milk.washroom()
  }else{
    update("Hungry")
    milk.display()
  }


  if(gameState!="Hungry"){
    feed.hide()
    addFood.hide()
    dog.remove()
  }else{
    feed.show()
    addFood.show()
    dog.addImage(happydog)
  }

  
  textSize(20)
  fill(255)
  text("Food Remaining:"+foodS,400,100)

  textStyle(BOLD)
  fill("black")
  text("Virtual Pet-3",410,50)

  fill(255,255,254)
  textSize(15)
  if(lastfed>=12){
    text("Last Feed: "+lastfed%12+"PM",410,80)
  }else if(lastfed==0){
    text("Last Feed: 12 AM",410,80)
  }else{
    text("Last Feed: "+lastfed+ "AM",410,80)
  }

  drawSprites();
  
}

function readStock(data){
  foodS=data.val()
  milk.updateFoodStock(foodS)
}



function feedDog(){
 dog.addImage(happydog)
  
  milk.updateFoodStock(milk.getFoodStock()-1)
  database.ref('/').update({
    Food:milk.getFoodStock(),
    FeedTime:hour(),
    
  })
}

function addFoods(){
  foodS++
 dog.addImage(dogImg)
  database.ref('/').update({
    Food:foodS
  })
}

function update(state){
  database.ref('/').update({
    gameState:state
  })
}