// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellet = 4;


// Define your ghosts here
var inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false,
};

var blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
};

var pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false,
};

var clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false,
};

// replace this comment with your four ghosts setup as objects
ghosts = ['Inky', 'Blinky', 'Pinky', 'Clyde']
// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives + '\n \nPower-Pellet: ' + powerPellet);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  console.log('(p) Eat Power Pellet');
  console.log ('(1) Eat Inky (edible)');
  console.log ('(2) Eat Blinky (inedible)');
  console.log ('(3) Eat Pinky (edible)');
  console.log ('(4) Eat Clyde (edible)');
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}

function eatGhost(ghost){
  if (ghost.edible === false) {
    console.log('\n' + ghost.name + ' the ghost ' + ghost.colour + ' killed Pac-Man');// concentate
    lives -= 1;
    gameOver();
  }
    if (ghost.edible === true) {
      console.log('\nPac-Man ate ' + ghost.name + ' the ghost ' + ghost.colour);
      score += 200;
    }
}

function eatPowerPellet () {
  score += 50;
  powerPellet -= 1;
  inky.edible = true;
  blinky.edible = true;
  pinky.edible = true;
  clyde.edible = true;
}
// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case 'p':
      eatPowerPellet();
    break;
    case '1':
      eatGhost(inky)
      break;
    case '2':
      eatGhost(blinky)
      break;
    case '3':
      eatGhost(pinky)
      break;
    case '4':
      eatGhost(clyde)
      break;
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

function gameOver (){
  if (lives === 0) {
    process.exit ()
  }

}

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
