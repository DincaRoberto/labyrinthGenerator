
var squareSize = 5;

var xNoOfSquares = 800/squareSize;
var yNoOfSquares = 600/squareSize;

var context = null;

var xCurrentIndex = 0;
var yCurrentIndex = 0;

var visited = [];
for (var i=0; i<xNoOfSquares; i++)
{
    var vline = [];
    for(var j=0; j<yNoOfSquares; j++)
    {
        vline.push(false);
    }
    
    visited.push(vline);
}

var qx = [];
var qy = [];

function goUp()
{
    yCurrentIndex--;
}

function goDown()
{
    yCurrentIndex++;
}

function goLeft()
{
    xCurrentIndex--;
}

function goRight()
{
    xCurrentIndex++;
}


function drawNextRect()
{
    var availableDirections = [];
    
    if(xCurrentIndex > 0 && !visited[xCurrentIndex-1][yCurrentIndex])
    {
        var fine = true;
        if (yCurrentIndex > 0)
        {
            if (visited[xCurrentIndex-1][yCurrentIndex-1])
            {
                fine = false;
            }
        }
        
        if (yCurrentIndex < yNoOfSquares-1)
        {
            if (visited[xCurrentIndex-1][yCurrentIndex+1])
            {
                fine = false;
            }
        }
        
        if (xCurrentIndex > 1)
        {
            if (visited[xCurrentIndex-2][yCurrentIndex])
            {
                fine = false;
            }
        }
      
        if (fine == true)
        {
            availableDirections.push(goLeft);
        }
    }
    
    if (xCurrentIndex < xNoOfSquares-1 && !visited[xCurrentIndex+1][yCurrentIndex])
    {
        var fine = true;
        
        if (yCurrentIndex > 0)
        {
            if (visited[xCurrentIndex+1][yCurrentIndex-1])
            {
                fine = false;
            }
        }
        
        if (yCurrentIndex < yNoOfSquares-1)
        {
            if (visited[xCurrentIndex+1][yCurrentIndex+1])
            {
                fine = false;
            }
        }
        
        if (xCurrentIndex < xNoOfSquares-2)
        {
            if (visited[xCurrentIndex+2][yCurrentIndex])
            {
                fine = false;
            }
        }
        
        if (fine == true)
        {
            availableDirections.push(goRight);
        }
    }
    
    if (yCurrentIndex > 0 && !visited[xCurrentIndex][yCurrentIndex-1])
    {
        var fine = true;
        
        if(xCurrentIndex < xNoOfSquares-1)
        {
            if (visited[xCurrentIndex+1][yCurrentIndex-1])
            {
                fine = false;
            }
        }
        
        if(xCurrentIndex > 0)
        {
            if (visited[xCurrentIndex-1][yCurrentIndex-1])
            {
                fine = false;
            }
        }
        
        if(yCurrentIndex > 1)
        {
            if (visited[xCurrentIndex][yCurrentIndex-2])
            {
                fine = false;
            }
        }
        
        
        if (fine == true)
        {
            availableDirections.push(goUp);
        }
        
    }
    
    if (yCurrentIndex < yNoOfSquares-1 && !visited[xCurrentIndex][yCurrentIndex+1])
    {
        var fine = true;
        
        if(xCurrentIndex < xNoOfSquares-1)
        {
            if (visited[xCurrentIndex+1][yCurrentIndex+1])
            {
                fine = false;
            }
        }
        
        if(xCurrentIndex > 0)
        {
            if (visited[xCurrentIndex-1][yCurrentIndex+1])
            {
                fine = false;
            }
        }
        
        if(yCurrentIndex < yNoOfSquares-2 )
        {
            if (visited[xCurrentIndex][yCurrentIndex+2])
            {
                fine = false;
            }
        }
        
        
        if (fine == true)
        {
            availableDirections.push(goDown);
        }
    }
    
    if (availableDirections.length > 0)
    {
        var r = Math.floor( Math.random()*100)%availableDirections.length;
         
        availableDirections[r]();
        
        context.fillStyle="#992200";
        context.fillRect(xCurrentIndex*squareSize, yCurrentIndex*squareSize, squareSize, squareSize);
        
        visited[xCurrentIndex][yCurrentIndex] = true;
        qx.push(xCurrentIndex);
        qy.push(yCurrentIndex);
        
        setTimeout(drawNextRect,  0);
        
    }
    else
    {
        if (qx.length > 0)
        {
            context.fillStyle="#FF5500";
            context.fillRect(xCurrentIndex*squareSize, yCurrentIndex*squareSize, squareSize, squareSize);
        
            xCurrentIndex = qx.pop();
            yCurrentIndex = qy.pop();
            
            context.fillRect(xCurrentIndex*squareSize, yCurrentIndex*squareSize, squareSize, squareSize);
            
            setTimeout(drawNextRect, 0);
        }
        
    }
}

window.onload = function(e){ 
    
    var a_canvas = document.getElementById("canvas");
    context = a_canvas.getContext("2d");
    
    context.fillStyle="#FF5500";

    drawNextRect();
}


