var dog, dogHappy, dogSad;
var db, foodS, foodStock;
var fedTime, lastFed, feed, addFood, foodObj;

function preload(){
    dogImg = loadImage("Dog.png");
    dogImg2 = loadImage("happydog.png");
}
function setup() {
  createCanvas(1349, 609);
  foodObj = new Food();

  db = firebase.database();
  dog = createSprite(800, 200, 10, 10);
  dog.addImage(dogImg);
  dog.scale = 0.2

  feed = createButton("FEED");
  feed.position(600, 30);
  feed.mousePressed(feedDog);

  addfood = createButton("ADD FOOD");
  addfood.position(700, 30);
  addfood.mousePressed(addFood);

foodStock = db.ref('Food');
foodStock.on("value", readStock);
}

function draw() {  
  background(120, 180, 104);
foodObj.display();

fedTime = db.ref('fedTime');
fedTime.on('value', function(data){
  lastFed = data.val();

 fill(137,36);
 stroke(255)
 textFont("harrington") ;
 textSize(30);
})
if(lastFed >=12){
  text("LAST FEED :" + lastFed % 12 + 'pm', 120, 40);
} else if(lastFed === 0){
  text("LAST FEED : 12 am", 120, 40);
}else {
  text("LAST FEED :"+ lastFed+'am', 120, 40);
}
  drawSprites();
  
} 
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS)
}
function feedDog(){
  dog.addImage(dogImg2)
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  db.ref('/').update({
    Food:foodObj.getFoodStock(), fedTime:hour()
  })
}
function addFood(){
  foodS++ ;
  db.ref('/').update({
    Food:foodS
  })
}