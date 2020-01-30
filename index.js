var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
let posY=225;
function drawCircle(x,y,r,color){
    ctx.fillStyle=color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI,true);
    ctx.closePath();
    ctx.fill();
}
function line(){
    let lineG=10;
    for(i=0;i<15;i++){

        ctx.fillStyle="white";
        ctx.fillRect(400,lineG,10,30);
        lineG+=40;
    
    }
    
    
}
function drawtext(text,x,y){
    ctx.fillStyle="white";
    ctx.font="75px fantasy";
    ctx.fillText(text,x,y);
}

function Paddle(x,y){
    ctx.fillStyle="white";
    ctx.fillRect(x,y,20,150);

}
let d;
let Player={
    y1:225,
    y2:225
};
let com={
    x:0,
    y:225,
    score:0
}
let hum={
    x:780,
    y:225,
    score:0
}
let ball={
    x:405,
    y:305,
    radius:20,
    velocityX:4,
    velocityY:4,
    speed:5,
    color:"red"


}
var currPlayer="human";
 
/* document.addEventListener('keydown',(e)=>{
    let k=e.keyCode;
   
if(k==38) d="up"
   
    else if(k==40) d="down"
}) */
document.addEventListener('mousemove',(e)=>{
 rect=canvas.getBoundingClientRect();
 hum.y=e.clientY-rect.top;});

   
/* if(k==38) d="up"
   
    else if(k==40) d="down"
})
 */
function collosion(b,p){
    ptop=p.y;
    pbottom=p.y+150;
    pleft=p.x;
    pright=p.x+20;
    btop=b.y-b.radius;
    bbottom=b.y+b.radius;
    bleft=b.x-b.radius;
    bright=b.x+b.radius;

    return bright>pleft&&btop<pbottom&&bleft<pright&&bbottom>ptop;

    
}
function reset(){
    ball.x=405;
    ball.y=305;
}

let player=225;
function draw(){
    ctx.fillStyle="black";
    ctx.fillRect(0,0,800,600);
    line();
    drawCircle(ball.x,ball.y,ball.radius,ball.color);
    ball.x+=ball.velocityX;
    ball.y+=ball.velocityY;
   
    if(ball.y+20>=600||ball.y-20<=0){
        
        ball.velocityY=-ball.velocityY
    }
     if(ball.x+20>=800||ball.x-20<=0){
        
        ball.velocityX=-ball.velocityX
    } 
     p=ball.x<385?com:hum;
    if(collosion(ball,p)){
        collidelpoint=(ball.y-(p.y+75));
        collidelpoint=collidelpoint/75;
        angled=(Math.PI/4)*collidelpoint;
        direction=(ball.x<385)?1:-1;
        ball.velocityX=direction*ball.speed*Math.cos(angled);
        ball.velocityY=direction*ball.speed*Math.sin(angled);
        ball.speed+=0.1;
    }
    
    drawtext(hum.score,300,80)
    drawtext(com.score,470,80)
    com.y+=ball.y-(com.y+75)
    /* if(d=="up") {p.y-=20; d="" }
    if(d=="down"){p.y+=20; d="" }
    if(p.y<=0){
        p.y=0;
    }
    if(p.y>=450){
        p.y=450;
    } */
    Paddle(com.x,com.y);
    Paddle(hum.x,hum.y);
    if(ball.x-ball.radius<=0){
        hum.score++;
        reset();
    }else if(ball.x+ball.radius>=800){
        com.score++;
        reset();
    }
 
    requestAnimationFrame(draw);
}
draw();

