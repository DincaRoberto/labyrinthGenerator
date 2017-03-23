/**
 * Created by r.dinca on 23/03/17.
 */

class Grid {

}

Grid.squareSize = 2;

Grid.x_NoOfSquares = 800/Grid.squareSize;
Grid.y_NoOfSquares = 600/Grid.squareSize;

Grid.visited = [];

{
    for (let i=0; i<Grid.x_NoOfSquares; i++)
    {
        var vline = [];
        for(let j=0; j<Grid.y_NoOfSquares; j++)
        {
            vline.push(false);
        }

        Grid.visited.push(vline);
    }
}
