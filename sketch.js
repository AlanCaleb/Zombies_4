var background,backgroundImg;
var cazador,cazadorImg;
var cazadorDispara;
var zombiesImg;
var zombiesScore = 0;
var cazadorScore = 3;
var balass = 50;
var zombiesGroup;
var life_1,life_2,life_3;
var life1,life2,life3;
var balasImg,balas,balasGroup;
var balasSound;
var gameState = "play";
var pocion,pocionImg;
var restart, restartImg;

function preload() {
  backgroundImg = loadImage("assets/bg.jpeg");
  cazadorImg = loadImage("assets/cazador_1.png");
  cazadorDispara = loadImage("assets/shooter_3.png");
  zombiesImg = loadImage("assets/zombie.png");
  life_1 = loadImage("assets/heart_1.png");
  life_2 = loadImage("assets/heart_2.png");
  life_3 = loadImage("assets/heart_3.png");
  balasImg = loadImage("assets/balas_prev_ui.png");
  balasSound = loadSound("assets/balas.mp3");
  pocionImg = loadImage("assets/pocion_vida_prev_ui.png");
  restartImg = loadImage("assets/reiniciar_prev_ui.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  background = createSprite(displayWidth/2+10,displayHeight/2);
  background.addImage(backgroundImg);
  background.scale = 1.1;

  cazador = createSprite(displayWidth-1150,displayHeight-300);
  cazador.addImage(cazadorImg);
  cazador.scale = 0.5;
  cazador.setCollider("rectangle",0,0,100,250);

  life1 = createSprite(displayWidth-50,40);
  life1.addImage(life_1);
  life1.scale = 0.5;
  
  life2 = createSprite(displayWidth-100,40);
  life2.addImage(life_2);
  life2.scale = 0.5;

  life3 = createSprite(displayWidth-150,40);
  life3.addImage(life_3);
  life3.scale = 0.5;

  restart = createSprite(displayWidth/2,displayHeight/2+65);
  restart.addImage(restartImg);
  restart.scale = 0.2;

  zombiesGroup = new Group();
  balasGroup = new Group();
  pocionesGroup = new Group();

}

function draw() {
  if(gameState === "play") {

  if(cazadorScore === 3) {
    life3.visible = true;
    life1.visible = false;
    life2.visible = false;
  }

  if(cazadorScore === 2) {
    life2.visible = true;
    life1.visible = false;
    life3.visible = false;
  }

  if(cazadorScore === 1) {
    life1.visible = true;
    life2.visible = false;
    life3.visible = false;
  }

  if(cazadorScore === 0) {
    gameState = "end";
  }

  if(zombiesScore === 30) {
    gameState = "ganar";
  }

  if(keyDown(UP_ARROW)||touches.length > 0) {
   cazador.y = cazador.y-30;
  }

  if(keyDown(DOWN_ARROW)||touches.length > 0) {
    cazador.y = cazador.y+30;
  }

  if(keyWentDown("space")) {
    cazador.addImage(cazadorImg);
  }

  else if(keyWentUp("space")) {
    balas = createSprite(displayWidth-1150,cazador.y-30);
    balas.addImage(balasImg);
    balas.velocityX = 5;
    balas.scale = 0.1;
    balasSound.play();
    balasGroup.add(balas);
    cazador.addImage(cazadorDispara);

    balass = balass -1;
  }

  if(zombiesGroup.isTouching(cazador)) {
    for(var i = 0; i < zombiesGroup.length; i++) {
      if(zombiesGroup[i].isTouching(cazador)) {
        cazadorScore = cazadorScore -1;
        zombiesGroup[i].destroy();
      }
    }
  }

  if(zombiesGroup.isTouching(balasGroup)) {
    for(var a = 0; a < zombiesGroup.length; a++) {
      if(zombiesGroup[a].isTouching(balasGroup)) {
        balasGroup.destroyEach();
        zombiesGroup[a].destroy();
        zombiesScore = zombiesScore +1;
      }
    }
  }  

  if(pocionesGroup.isTouching(cazador)) {
    cazadorScore = cazadorScore + 1
    pocionesGroup.destroyEach(); 
  }

  restart.visible = false;
}
  drawSprites();

  fill("white");
  textSize(20);
  text("BALAS: "+balass,displayWidth-150,displayHeight-650);
  text("Puntución: "+zombiesScore,displayWidth-150,displayHeight-550);
  enemies();
  pociones();


  if(gameState === "end") {
    //background("black");
    textSize(100);
    fill("white");
    text("¡Haz Perdido!",displayWidth-1000, displayHeight/2);
    zombiesGroup.destroyEach();
    pocionesGroup.destroyEach();
    cazador.destroy();
    life1.visible = false;
    restart.visible = true;

  if(mousePressedOver(restart)) {
    reset();
  }
}
  
  if(gameState === "ganar") {
    textSize(100);
    fill("white");
    text("¡Ganaste!",displayWidth-1000, displayHeight/2);
    zombiesGroup.destroyEach();
    cazador.destroy();
    pocionesGroup.destroyEach();
  }
}

function enemies() {
  if(frameCount % 60 === 0) {
    var zombies = createSprite(random(displayWidth+10,1000),random(100,500));
    zombies.addImage(zombiesImg);
    zombies.velocityX = -5;
    zombies.scale = 0.2;
    zombies.lifetime = 280;
    zombiesGroup.add(zombies);
  }
}

function pociones() {
  if(frameCount % 240 === 0) {
    pocion = createSprite(random(displayWidth+10,1000),random(100,500));
    pocion.addImage(pocionImg);
    pocion.velocityX = -7;
    pocion.scale = 0.08;
    pocion.lifetime = 280;
    pocionesGroup.add(pocion);
  }
}

function reset() {
  gameState = "play";
  cazadorScore = 3;
}