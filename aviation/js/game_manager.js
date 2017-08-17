function GameManager(InputManager, Actuator, StorageManager) {
  this.inputManager   = new InputManager;
  this.storageManager = new StorageManager;
  this.actuator       = new Actuator;

  this.inputManager.on("mouseup", this.mouseup.bind(this));
   this.inputManager.on("touchend", this.touchend.bind(this));

  this.inputManager.on("restart", this.restart.bind(this));
  this.inputManager.on("keepPlaying", this.keepPlaying.bind(this));  
  
  this.version = 0.2;
  this.setup();
}

// Restart the game
GameManager.prototype.restart = function () {
  this.storageManager.clearGameState();
  this.actuator.continueGame(); // Clear the game won/lost message
  this.setup();
};

// Keep playing after winning (allows going over the last run)
GameManager.prototype.keepPlaying = function () {
  this.keepPlaying = true;
  this.actuator.continueGame(); // Clear the game won/lost message
};

// Return true if the game is lost, or has won and the user hasn't kept playing
GameManager.prototype.isGameTerminated = function () {
  if (this.over || (this.won && !this.keepPlaying)) {
    return true;
  } else {
    return false;
  }
};

// Set up the game
GameManager.prototype.setup = function () {
  var previousState = this.storageManager.getGameState();

  // Reload the game from a previous game if present
  if (previousState && (previousState.version === this.version)) {	
		this.wtype = previousState.wtype;
		this.world		 = new World(previousState,this.wtype);
    this.score       = previousState.score;
    this.over        = previousState.over;
    this.won         = previousState.won;
	this.pass		 = false;
	this.runnings    =  new Runnings(previousState); //previousState.runnings; 
    this.keepPlaying = previousState.keepPlaying;
  } else {
	this.wtype = 0;
	this.world		 = new World(0, this.wtype);
    this.score       = 0;
    this.over        = false;
    this.won         = false;
	this.pass		 = false;
	this.runnings    = new Runnings(); 
    this.keepPlaying = false;
  }

  // Update the actuator
  this.actuate();
};

// Sends the updated grid to the actuator
GameManager.prototype.actuate = function () {
  if (this.storageManager.getBestScore() < this.score) {
    this.storageManager.setBestScore(this.score);
  }
   // Clear the state when the game is over (game over only, not win)
  if (this.over) {
    this.storageManager.clearGameState();
  } else {
    this.storageManager.setGameState(this.serialize());
  }

  this.actuator.actuate(this.world, {
	wtype:		this.wtype,
    score:      this.score,
    over:       this.over,
    won:        this.won,
	pass:		this.pass,
	runnings: this.runnings,
    bestScore:  this.storageManager.getBestScore(),
    terminated: this.isGameTerminated()
  });
 
}; 
GameManager.prototype.checkMrRight  = function (gridindex) {

} 
// Represent the current game as an object
GameManager.prototype.serialize = function () {
  return { 
	wtype:		this.wtype,
	version:	this.version,
	world:		 this.world.serialize(this.wtype),
    score:       this.score,
    over:        this.over,
    won:         this.won,
	runnings: this.runnings.serialize(),
    keepPlaying: this.keepPlaying
  };
};
 
GameManager.prototype.mouseup = function (data)  {//checkMrRight
	this.checkMrRight(data);
}
 

GameManager.prototype.checkMrRight  = function (data) {
 	var datagrid = data.substr(4,1);
	if(this.world.candidatesgrid[0].gridindex == datagrid){//click the right one
		this.score++;
		var key = this.runnings.nextrun;
		if (this.score >= this.runnings.runinfos[key].score) {
			this.wtype ++;
			if(this.wtype >= this.world.livingscount){
				this.wtype = 0;
			}
			this.pass = this.runnings.getcurrentRun(this.score);
			this.runnings.serialize();			
		} 
		else{
			this.pass = false;
		}
		this.over = false;//init it in a new run
	} else {
		 this.over = true;
	} 

	this.actuate();	 

}

GameManager.prototype.touchend  = function (data) {
 	this.checkMrRight(data); 
 }
