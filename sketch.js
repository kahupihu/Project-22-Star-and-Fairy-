var starImg, fairyImg, bgImg;
var fairy , fairyVoice;
var star, starBody;
var gs=0;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	starImg = loadImage("images/star.png");
	fairyImg = loadAnimation("images/fairyImage1.png","images/fairyImage2.png");
	bgImg = loadImage("images/starNight.png");
	fairyVoice = loadSound("sound/JoyMusic.mp3");

}

function setup() {
	createCanvas(800, 750);

	fairyVoice.play();

	fairy = createSprite(130, 520);
	fairy.addAnimation("fairyflying",fairyImg);  
	fairy.scale =0.25;
	fairy.setCollider("rectangle",500,0,100,100);

	star = createSprite(650,30);
	star.addImage(starImg);
	star.scale = 0.2;

	engine = Engine.create();
	world = engine.world;

	starBody = Bodies.circle(650 , 30 , 5 , {restitution:0.5, isStatic:true});
	World.add(world, starBody);
	
	Engine.run(engine);
}


function draw() {
  background(bgImg);

  if(gs===0){
	keyPressed();
	star.y=starBody.position.y;
	if(star.isTouching(fairy)){
	  Body.setStatic(starBody, true);
	  gs=1;
	}
  }

  if(gs===1){fill("red"); textSize(55); stroke(0); strokeWeight(5); text("Yay! You Won!",215,350); }
  drawSprites();

}

function keyPressed() {
	if(keyDown("right")){fairy.x=fairy.x+10;}
	if(keyDown("left")){fairy.x=fairy.x-10;}
	if(keyWentDown("down")){
		Body.setStatic(starBody, false);
	}
}
