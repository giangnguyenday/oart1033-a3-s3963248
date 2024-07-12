
let predator;
let prey = [];
let obstacles = [];
let sheep = [];
let behaviorSelect;
let img;
let dog1, dog2, dog3;
let fence, fence1;
let bg1, bg0;
let gamestate = 'title';
let button;
let bgmusic,dogbark;
let font;


function drawBarn(x, y) {

  for (let i = 0; i < 11; i++) {
    obstacles.push(new Obstacle(fence1, x + 200, y + i * 20));
    obstacles.push(new Obstacle(fence1, x - 200, y + i * 20));
    obstacles.push(new Obstacle(fence, x + i * 20, y + 200));
    obstacles.push(new Obstacle(fence, x - i * 20, y + 200));

  }
  for (let i = 3; i < 10; i++) {
    obstacles.push(new Obstacle(fence, x - i * 20, y));
    obstacles.push(new Obstacle(fence, x + i * 20, y));
  }
}

function preload() {
  img = loadImage('Sheep.png');
  dog1 = loadImage('Collie2.png');
  dog2 = loadImage('Shetland.png');
  dog3 = loadImage('German.png');
  fence = loadImage('Fence.png');
  fence1 = loadImage('Fence1.png')
  bg1 = loadImage('bg1.png');
  bg0 = loadImage('Introbg.png');
  bgmusic = loadSound('farmmusic1.mp3');
  dogbark = loadSound('dogbark.mp3');
  font = loadFont('ConcertOne-Regular.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  bgmusic.loop();
  //bgmusic.setVolume(0.8);
  
  behaviorSelect = createSelect();
  behaviorSelect.option('Collie');
  behaviorSelect.option('Shetland');
  behaviorSelect.option('German');
  behaviorSelect.position(20, 20);
  behaviorSelect.value('Collie');
  behaviorSelect.hide();

  predator = new Predator(dog1);

  drawBarn(windowWidth / 2, windowHeight / 2)


  for (let i = 0; i < random(10, 30); i++) {
    sheep.push(new Sheep(img));
  }
  
  button=createImg('assets/playbutton.png')
  button.position(windowWidth/2 -105, windowHeight/5);
  button.size(250,84);
  button.mousePressed(function(){
    button.hide();
    gamestate='playGame'
  })
  imageMode(CENTER);


}

function draw() {

  if (gamestate=='title') {title()
    
  } else if(gamestate=='playGame'){playGame()
    
  }
}

function title() {
  image(bg0,windowWidth / 2, windowHeight / 2, windowWidth, windowHeight);
  if((windowWidth/2-105<mouseX)&&(windowWidth/2+145>mouseX)
    &&(windowHeight/5-42<mouseY)&&(windowHeight/5+42>mouseY)){
      button.position(windowWidth/2-130, windowHeight/5-15);
      button.size(300, 100.8);}
   else{
    button.position(windowWidth/2 -105, windowHeight/5);    
    button.size(250, 84); }
  
}

function playGame() {
  noCursor();
  background('rgb(100,255,100)');
  image(bg1, windowWidth / 2, windowHeight / 2, windowWidth, windowHeight);

  
  textSize(25);
  textFont(font);
  fill('white');
  text('Move mouse to herd sheeps into the fence', windowWidth/2-215, 60);
  text('Press "X" to change dog, each dog has different range', windowWidth/2-300, 100);
  text('Click mouse to bark', windowWidth/2-105, 140);

  switch (behaviorSelect.value()) {
    case 'Collie':
      predator.switchDog(dog1)
      break;
    case 'Shetland':
      predator.switchDog(dog2)
      break;
    case 'German':
      predator.switchDog(dog3)
      break;
  }



  predator.display();
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].display();
  }

  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    predator.move(mouseX, mouseY);
  }

  for (let i = 0; i < sheep.length; i++) {
    sheep[i].render(predator, obstacles);
  }

}

function keyPressed() {
  if (keyCode === 88) {
    if (behaviorSelect.value() == 'Collie') {
      behaviorSelect.value('Shetland')
    } else if (behaviorSelect.value() == 'Shetland') {
      behaviorSelect.value('German')
    } else {
      behaviorSelect.value('Collie')
    }
  }
}

function mouseClicked() {
  dogbark.play()
}