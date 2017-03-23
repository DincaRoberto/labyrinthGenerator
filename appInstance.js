

var squareSize = 2;

var x_NoOfSquares = 800/squareSize;
var y_NoOfSquares = 600/squareSize;

var context = null;

var visited = [];
for (var i=0; i<x_NoOfSquares; i++)
{
    var vline = [];
    for(var j=0; j<y_NoOfSquares; j++)
    {
        vline.push(false);
    }
    
    visited.push(vline);
}



var crawlers;
var interval;


function loop(){

    var mustStop = true;
    for(var i=0;i<crawlers.length; i++){
        if (!crawlers[i].isStashEmpty()){
            crawlers[i].drawNextRect(visited);
            mustStop = false;
        }

    }

    if (mustStop){
        clearInterval(interval);
        return;
    }
}

window.onload = function(e){ 
    
    var a_canvas = document.getElementById("canvas");
    context = a_canvas.getContext("2d");
    
    context.fillStyle="#FF5500";

    crawlers = []

    for (var i=0;i<x_NoOfSquares/3;i++){
        crawlers.push(new Crawler(i*3,0));
        crawlers.push(new Crawler(i*3,y_NoOfSquares-1));
    }

    for (var i=0;i<y_NoOfSquares/3;i++){
        crawlers.push(new Crawler(0,i*3));
        crawlers.push(new Crawler(x_NoOfSquares-1, i*3));
    }

    for(var i=0;i<crawlers.length; i++){
        crawlers[i].drawNextRect(visited);
    }


    interval = setInterval(loop, 20);
}


