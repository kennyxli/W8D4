// DON'T TOUCH THIS CODE
if (typeof window === 'undefined'){
  var Piece = require("./piece");
}
// DON'T TOUCH THIS CODE

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid () {
  let row = new Array(8)
  for(let i = 0; i < row.length; i++) {
    row[i] = new Array(8)
  }

  row[3][4] = new Piece("black");
  row[4][3] = new Piece("black");
  row[3][3] = new Piece("white");
  row[4][4] = new Piece("white");
  return row
}

/**
 * Constructs a Board with a starting grid set up.
 */
function Board () {
  this.grid = _makeGrid();
}

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
  let x = pos[0];
  let y = pos[1];
  if (x < 0 || y < 0 || x > 7 || y > 7){
    return false
  }
  return true
};

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  let x = pos[0];
  let y = pos[1];
  if (!this.isValidPos(pos)){
    throw new Error('Not valid pos!');
  }
  if (this.grid[x][y] === ""){
    return undefined
  }
  else {
    return this.grid[x][y]  
  }

};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  let x = pos[0]
  let y = pos[1]
  
  if (this.grid[x][y]) 

  if (this.grid[x][y].color === color) {
    return true
  }
  return false
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {

    if (this.getPiece(pos) === undefined) {
      return false
    }
    return true
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns an empty array if it reaches the end of the board before finding another piece
 * of the same color.
 *
 * Returns empty array if it hits an empty position.
 *
 * Returns empty array if no pieces of the opposite color are found.
 */
Board.prototype._positionsToFlip = function(pos, color, dir, piecesToFlip){
  
  if (!piecesToFlip) {
    piecesToFlip = []
  }

  // variable for next postion pos = [pos[0] + dir[0], pos[1] + dir[1]] 

  // base cases: return []
  // hits its own color
  // reaches end of board (0 or 7)
  // reaches an empty position (=== "")

  // iterate throught the DIRS
  pos = [pos[0] + dir[0], pos[1] + dir[1]] 

  
    if (!this.isValidPos(pos) || !this.isOccupied(pos)){
      return []
    }
    else if(this.isMine(pos, color)){
      return piecesToFlip
    }
    else {
      piecesToFlip.push(pos)
      return this._positionsToFlip(pos, color, dir, piecesToFlip)
    }
    
};

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {
  
  if (this.isOccupied(pos)){
    return false
  }

 
  for(let i = 0; i < Board.DIRS.length; i++) {
    let dir = Board.DIRS[i]
      if (this._positionsToFlip(pos, color, dir).length > 0) {
        return true
      }
    }
    
  
  // Board.DIRS.forEach((dir) => {
  //   if (this._positionsToFlip(pos, color, dir).length > 0){
  //     return true
  //   }})

  return false
  
};

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
  if (this.validMove(pos, color) && this.isValidPos(pos)) {
    this.grid[pos[0]][pos[1]] = new Piece(color)

    for (let i = 0; i < Board.DIRS.length; i++) {
      let dir = Board.DIRS[i]
      let positions = this._positionsToFlip(pos, color, dir)
      positions.forEach( (position) => {
        this.grid[position[0]][position[1]].flip()
      })
      
    }
    // if (this._positionsToFlip(pos, color, dir).length > 0) {
    //   for (let j = 0; j < Board.DIRS.length; j++) {
        // positions[j].flip
      }
  else {
  throw new Error("Invalid move!")
  }
};
/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
  //iterate through grid. Check with validMove.
  let arr = [];
  for (let i = 0; i < this.grid.length; i++){
    for (let j = 0; j < this.grid.length; j++){
    pos = [i,j] 
      if (this.validMove(pos, color)){
        arr.push(pos)
      }
    }
  }
  return arr
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
  if (this.validMoves(color).length > 0){
    return true
  } 
  return false
};



/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
  if (!this.hasMove('white') && !this.hasMove('black')){
    return true
  }
  return false
};




/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
};


// DON'T TOUCH THIS CODE
if (typeof window === 'undefined'){
  module.exports = Board;
}
// DON'T TOUCH THIS CODE