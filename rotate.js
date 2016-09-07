/**
 * Created by ZXR on 2016/8/27.图片导航的旋转
 */
$(function(){
    var nav =$('#nav');
    var list=document.querySelectorAll('li');
    var navFlag= -1;
    /**
     * 点击最后导航封面
     * */
    $(list[list.length -1]).click(function(e){
        for(var i in list){
            var n= navFlag== -1 ?(i - list.length/2 )*15 : 0;
            $(list[i]).css({
                transform:'rotate( '+n+'deg)'
            })
        }

        navFlag =-1 * navFlag;

    });

    /**
     *点击其他选择页面，其他选择卡片回到原位
     * **/
   nav.find('li').each(function(k) {
       if (k == list.length -1) {
           $(this).css({transfrom: 'rotate(0deg)'})
       } else {

       $(this).click(function (e) {
           $(this).css({transform: 'rotate(0deg)'});
           for (var n = 0; n < list.length; n++) {
               if (n != k) {
                   var ndeg = n < k ? (n - k) * 15 : (n - k - 1) * 15 + 30;
                   $(list[n]).css({transform: 'rotate(' + ndeg + 'deg)'});
               }

           }
       })
   }
   });

/**
**canvas的绘制
* **/
var canvas=document.getElementById('canvas');
var cxt=canvas.getContext('2d');
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight +600;
var colors=['#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423'];
var balls=[];
var timer;
var on=true;
 function  random(min,max){
     return Math.round(Math.random(0,max-min) +min )

 }
    var  Ball=function(x1,y1){
        this.ball= {
            x:random(-5,5) + x1,
            y:random(-5,5) + y1,
            r:random(20,80),
            vx:Math.random(0,1) -0.5,
            vy:Math.random(0,1) -0.5,
            color:colors[Math.floor(Math.random()*10)]

        }
    };

    Ball.prototype.draw=function(){
        cxt.beginPath();
        cxt.arc(this.ball.x ,this.ball.y,this.ball.r,0,Math.PI *2);
        cxt.globalCompositeOperation='light';
        cxt.fillStyle=this.ball.color
        cxt.fill();

    }

    $(canvas).mousemove(function(e){
        for(var i=0;i<2;i++){
            var ball=new Ball(e.pageX , e.pageY );
            balls.push(ball);
            if(balls.length >300){balls.shift()}

        }
        drawBalls();
             if(on){
            clearInterval(timer);
            var timer=setInterval(drawBalls,50);
            on=false;
        }





    });
function  drawBalls(){
    cxt.clearRect(0,0,canvas.width,canvas.height);
    balls.forEach(function(ball,i){

        ball.ball.x += ball.ball.vx *8;
        ball.ball.y += ball.ball.vy *8;

        ball.ball.r *=0.94;
        if (ball.ball.r >= 1) {
            ball.draw();
        } else {
            balls.splice(i, 1);
       }

    });

    if(balls.length){
       clearInterval(timer);
    }
}


});