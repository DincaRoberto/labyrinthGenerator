



var context = null;


var crawlers;
var interval;


function loop(){

    var mustStop = true;
    for(var i=0;i<crawlers.length; i++){
        if (!crawlers[i].isStashEmpty()){
            crawlers[i].drawNextRect(Grid.visited);
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

    for (var i=0;i<Grid.x_NoOfSquares/3;i++){
        crawlers.push(new Crawler(i*3,0, getRandomColor()));
        crawlers.push(new Crawler(i*3,Grid.y_NoOfSquares-1, getRandomColor()));
    }

    for (var i=0;i<Grid.y_NoOfSquares/3;i++){
        crawlers.push(new Crawler(0,i*3, getRandomColor()));
        crawlers.push(new Crawler(Grid.x_NoOfSquares-1, i*3, getRandomColor()));
    }

    // crawlers.push(new Crawler(0,0, getRandomColor()));
    // crawlers.push(new Crawler(Grid.x_NoOfSquares-1,0, getRandomColor()));
    // crawlers.push(new Crawler(Grid.x_NoOfSquares-1,Grid.y_NoOfSquares-1, getRandomColor()));
    // crawlers.push(new Crawler(0,Grid.y_NoOfSquares-1, getRandomColor()));
    // crawlers.push(new Crawler(Math.floor((Grid.x_NoOfSquares+4)/2),Math.floor((Grid.y_NoOfSquares-4)/2), getRandomColor()));
    // crawlers.push(new Crawler(Math.floor((Grid.x_NoOfSquares-4)/2),Math.floor((Grid.y_NoOfSquares-4)/2), getRandomColor()));
    // crawlers.push(new Crawler(Math.floor((Grid.x_NoOfSquares-4)/2),Math.floor((Grid.y_NoOfSquares+4)/2), getRandomColor()));
    // crawlers.push(new Crawler(Math.floor((Grid.x_NoOfSquares+4)/2),Math.floor((Grid.y_NoOfSquares+4)/2), getRandomColor()));

    for(var i=0;i<crawlers.length; i++){
        crawlers[i].drawNextRect(Grid.visited);
    }


    interval = setInterval(loop, 1);
}

function getRandomColor() {
    return '#'+Math.floor(Math.random()*16777215).toString(16);
}


