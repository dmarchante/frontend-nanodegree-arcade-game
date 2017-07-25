//Set location for superclass
var Character = function(x, y) {
    this.x = x;
    this.y = y;
};

// Set x axis movement 
Character.prototype.moveX = function(unit) {
    if (!unit) {
        this.x++;
    } else {
        this.x *= unit;
    }
};

// Set y axis movement 
Character.prototype.moveY = function(unit) {
    if (!unit) {
        this.y++;
    } else {
        this.y *= unit;
    }
};

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Initial enemy location
    x = (Math.random() + 1) * 100;
    Character.call(this, x, y);
    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
};

// Re-define prototype attribute
Enemy.prototype = Object.create(Character.prototype);

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 500) {
        this.x = Math.random() - (Math.random() + 1) * 600;
    }

    // set collision parameters
    if (player.y > this.y - 60 && player.y < this.y + 60) {

        // horizontal bounding region
        if (player.x > this.x - 60 && player.x < this.x + 60) {

            // simulate player death
            player.startPositon();
        }
    }

    this.moveX();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Define player sub-class
var Player = function(x, y) {
    // Variables applied to instances
    Character.call(this, x, y);
    // The image/sprite for our enemies
    this.sprite = 'images/char-boy.png';
};

// Re-define prototype attribute
Player.prototype = Object.create(Character.prototype);

//Character.protoype.constructor = Character;
// Update the players's position
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.move = (this.move * dt);

};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    //external
    //Move x or y by change variables
    this.yPosition = 90;
    this.xPosition = 100;

    //Change x or y depending upon key as long as in defined boundary 
    if (key === 'up' && this.y > 30)
        this.y = this.y - this.yPosition;
    if (key === 'down' && this.y < 400)
        this.y = this.y + this.yPosition;
    if (key === 'left' && this.x > 0)
        this.x = this.x - this.xPosition;
    if (key === 'right' && this.x < 400)
        this.x = this.x + this.xPosition;

    if (this.y < 30)
        alert("You win");

};

Player.prototype.startPositon = function() {
    player.x = 200;
    player.y = 400;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(200, 400);
var enemy1 = new Enemy(-100, 230);
var enemy2 = new Enemy(100, 145);
var enemy3 = new Enemy(100, 60);
var allEnemies = [enemy1, enemy2, enemy3];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});