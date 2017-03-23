/**
 * Created by r.dinca on 23/03/17.
 */

class Crawler {

    constructor(xStart, yStart) {

        this.qx = [];
        this.qy = [];

        this.xCurrentIndex = xStart;
        this.yCurrentIndex = yStart;

        this.goUp = this.goUp.bind(this);
        this.goDown = this.goDown.bind(this);
        this.goLeft = this.goLeft.bind(this);
        this.goRight = this.goRight.bind(this);

        this.canGoLeft = this.canGoLeft.bind(this);
        this.canGoRight = this.canGoRight.bind(this);
        this.canGoUp = this.canGoUp.bind(this);
        this.canGoDown = this.canGoDown.bind(this);

        this.isStashEmpty = this.isStashEmpty.bind(this);

        this.getAvailableDirections = this.getAvailableDirections.bind(this);

        this.drawNextRect = this.drawNextRect.bind(this);
    }

    drawNextRect(visited)
    {
        var availableDirections = this.getAvailableDirections(visited);

        if (availableDirections.length > 0)
        {
            var r = Math.floor( Math.random()*100)%availableDirections.length;

            availableDirections[r]();

            context.fillStyle="#992200";
            context.fillRect(this.xCurrentIndex*squareSize, this.yCurrentIndex*squareSize, squareSize, squareSize);

            visited[this.xCurrentIndex][this.yCurrentIndex] = true;

            this.pushToStash(this.xCurrentIndex, this.yCurrentIndex);
        }
        else
        {
            if (this.qx.length > 0)
            {
                context.fillStyle="#FF5500";
                context.fillRect(this.xCurrentIndex*squareSize, this.yCurrentIndex*squareSize, squareSize, squareSize);

                let p = this.popFromStash();

                this.xCurrentIndex = p.x;
                this.yCurrentIndex = p.y;

                context.fillRect(this.xCurrentIndex*squareSize, this.yCurrentIndex*squareSize, squareSize, squareSize);
            }

        }
    }

    isStashEmpty(){
        return (this.qx.length == 0);
    }

    getAvailableDirections(visited){
        var availableDirections = [];

        if (this.canGoLeft(visited)){
            availableDirections.push(this.goLeft);
        }

        if (this.canGoRight(visited)){
            availableDirections.push(this.goRight);
        }

        if (this.canGoUp(visited)){
            availableDirections.push(this.goUp);
        }

        if (this.canGoDown(visited)){
            availableDirections.push(this.goDown);
        }

        return availableDirections;
    }

    canGoDown(visited){
        var fine = false;
        if (this.yCurrentIndex < visited[0].length-1 && !visited[this.xCurrentIndex][this.yCurrentIndex+1])
        {
            fine = true;

            if(this.xCurrentIndex < visited.length-1)
            {
                if (visited[this.xCurrentIndex+1][this.yCurrentIndex+1])
                {
                    fine = false;
                }
            }

            if(this.xCurrentIndex > 0)
            {
                if (visited[this.xCurrentIndex-1][this.yCurrentIndex+1])
                {
                    fine = false;
                }
            }

            if(this.yCurrentIndex < visited[0].length-2 )
            {
                if (visited[this.xCurrentIndex][this.yCurrentIndex+2])
                {
                    fine = false;
                }
            }
        }
        return fine;
    }

    canGoUp(visited){
        var fine = false;
        if (this.yCurrentIndex > 0 && !visited[this.xCurrentIndex][this.yCurrentIndex-1])
        {
            fine = true;

            if(this.xCurrentIndex < visited.length-1)
            {
                if (visited[this.xCurrentIndex+1][this.yCurrentIndex-1])
                {
                    fine = false;
                }
            }

            if(this.xCurrentIndex > 0)
            {
                if (visited[this.xCurrentIndex-1][this.yCurrentIndex-1])
                {
                    fine = false;
                }
            }

            if(this.yCurrentIndex > 1)
            {
                if (visited[this.xCurrentIndex][this.yCurrentIndex-2])
                {
                    fine = false;
                }
            }
        }

        return fine;
    }

    canGoRight(visited){
        var fine = false;
        if (this.xCurrentIndex < visited.length-1 && !visited[this.xCurrentIndex+1][this.yCurrentIndex])
        {
            fine = true;

            if (this.yCurrentIndex > 0)
            {
                if (visited[this.xCurrentIndex+1][this.yCurrentIndex-1])
                {
                    fine = false;
                }
            }

            if (this.yCurrentIndex < visited[0].length-1)
            {
                if (visited[this.xCurrentIndex+1][this.yCurrentIndex+1])
                {
                    fine = false;
                }
            }

            if (this.xCurrentIndex < visited.length-2)
            {
                if (visited[this.xCurrentIndex+2][this.yCurrentIndex])
                {
                    fine = false;
                }
            }
        }

        return fine;
    }

    canGoLeft(visited){

        var fine = false;

        if(this.xCurrentIndex > 0 && !visited[this.xCurrentIndex-1][this.yCurrentIndex])
        {
            fine = true;

            if (this.yCurrentIndex > 0)
            {
                if (visited[this.xCurrentIndex-1][this.yCurrentIndex-1])
                {
                    fine = false;
                }
            }

            if (this.yCurrentIndex < visited[0].length-1)
            {
                if (visited[this.xCurrentIndex-1][this.yCurrentIndex+1])
                {
                    fine = false;
                }
            }

            if (this.xCurrentIndex > 1)
            {
                if (visited[this.xCurrentIndex-2][this.yCurrentIndex])
                {
                    fine = false;
                }
            }
        }

        return fine;
    }

    pushToStash(x, y) {
        this.qx.push(x);
        this.qy.push(y);
    }

    popFromStash() {
        return {
            x: this.qx.pop(),
            y: this.qy.pop()
        }
    }

    goUp() {
        this.yCurrentIndex--;
    }

    goDown() {
        this.yCurrentIndex++;
    }

    goLeft() {
        this.xCurrentIndex--;
    }

    goRight() {
        this.xCurrentIndex++;
    }
}