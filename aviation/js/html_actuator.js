function HTMLActuator() {
	this.scoreContainer = document.querySelector(".score-container");
	this.bestContainer = document.querySelector(".best-container");
	this.messageContainer = document.querySelector(".game-message");
	this.cmdContainer = document.querySelector("#mycmd");
	// this.sharingContainer = document.querySelector(".score-sharing");
 	this.grid0 = document.querySelector("#grid0");
	this.grid1 = document.querySelector("#grid1");
	this.grid2 = document.querySelector("#grid2");
	this.grid3 = document.querySelector("#grid3");

 }

HTMLActuator.prototype.actuate = function(world, metadata) {
	var self = this;

	window
			.requestAnimationFrame(function() {

				 //this should go to the init of each pass
				 self.cmdContainer.innerHTML = world.livings[metadata.wtype][world.theone];
						if(metadata.wtype<2){match =2;}
						else if(metadata.wtype===2){match =0;}
						else if(metadata.wtype===3){match =1; self.cmdContainer.innerHTML = world.livings[2][world.theone];}
					
					var gridlist = [self.grid0,self.grid1,self.grid2,self.grid3];

						
						
					for (var i = 0; i < 4; i++) {
						 gridlist[world.candidatesgrid[i].gridindex].innerHTML = world.livings[match][world.candidatesgrid[i].image]; 
					}
				 
				self.updateScore(metadata.score);
				self.updateBestScore(metadata.bestScore);

				var key = metadata.runnings.nextrun;
				if (metadata.terminated) {

					if (metadata.over) {
						self.message(false,
								metadata.runnings.runinfos[key - 1].fail); // You
						// lose
					} else if (metadata.won) {
						self.message(true,
								metadata.runnings.runinfos[key - 1].win); // You
																			// win
					}
				} else if (metadata.pass) {
					self.message(true, metadata.runnings.runinfos[key - 1].win); // You
																					// win
																					// a
					// pass and
					// keep
					// going
				}

			});
};

// Continues the game (both restart and keep playing)
HTMLActuator.prototype.continueGame = function() {
	if (typeof ga !== "undefined") {
		ga("send", "event", "game", "restart");
	}
	this.clearMessage();
};

HTMLActuator.prototype.clearContainer = function(container) {
	while (container.firstChild) {
		container.removeChild(container.firstChild);
	}
};

HTMLActuator.prototype.applyClasses = function(element, classes) {
	element.setAttribute("class", classes.join(" "));
};

HTMLActuator.prototype.updateScore = function(score) {
	this.clearContainer(this.scoreContainer);

	var difference = score - this.score;
	this.score = score;

	this.scoreContainer.textContent = this.score;

	if (difference > 0) {
		var addition = document.createElement("div");
		addition.classList.add("score-addition");
		addition.textContent = "+" + difference;

		this.scoreContainer.appendChild(addition);
	}
};

HTMLActuator.prototype.updateBestScore = function(bestScore) {
	this.bestContainer.textContent = bestScore;
};

HTMLActuator.prototype.message = function(won, runmsg) {
	var type = won ? "game-won" : "game-over";
	var message = runmsg;
	// var message = won ? "You win!" : "Game over!";
	if (typeof ga !== "undefined") {
		ga("send", "event", "game", "end", type, this.score);
	}

	this.messageContainer.classList.add(type);
	this.messageContainer.getElementsByTagName("p")[0].textContent = message;

	// this.clearContainer(this.sharingContainer);
	// this.sharingContainer.appendChild(this.scoreTweetButton());
	// twttr.widgets.load();
};

HTMLActuator.prototype.clearMessage = function() {
	// IE only takes one value to remove at a time.
	this.messageContainer.classList.remove("game-won");
	this.messageContainer.classList.remove("game-over");
};

HTMLActuator.prototype.scoreTweetButton = function() {
	var tweet = document.createElement("a");
	tweet.classList.add("twitter-share-button");
	tweet.setAttribute("href", "https://twitter.com/share");
	tweet.setAttribute("data-via", "sh");
	tweet.setAttribute("data-url", "http://oktopbest.com/aviation/iata-icao-quiz.html");
	tweet.setAttribute("data-counturl",
			"http://oktopbest.com/aviation/iata-icao-quiz.html");
	tweet.textContent = "Tweet";

	var text = "I scored " + this.score
			+ " points at OneFromFour edition, a game where you "
			+ "can learn knowledges about airline and airports";
	tweet.setAttribute("data-text", text);

	return tweet;
};
 
  
  
 