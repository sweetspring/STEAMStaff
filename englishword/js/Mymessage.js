
		function MyMessage() {
			this.scoreContainer = document.querySelector(".score-container");
			this.bestContainer = document.querySelector(".best-container");
			this.messageContainer = document.querySelector(".game-message");
			this.score = 0;
		}
		MyMessage.prototype.clearMessage = function() {
			// IE only takes one value to remove at a time.
			this.messageContainer.classList.remove("game-won");
			this.messageContainer.classList.remove("game-over");
		};
		MyMessage.prototype.message = function(won) {
			var type = won ? "game-won" : "game-over";
			var message = won ? "已经过第一关了，下一关过几天再来玩吧" : "Game over!";

			if (typeof ga !== "undefined") {
				ga("send", "event", "game", "end", type, this.score);
			}

			this.messageContainer.classList.add(type);
			this.messageContainer.getElementsByTagName("p")[0].textContent = message;

		};
		MyMessage.prototype.updateScore = function(score) {
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

		MyMessage.prototype.updateBestScore = function(bestScore) {
			this.bestContainer.textContent = bestScore;
		};

		MyMessage.prototype.actuate = function(metadata) {
			var self = this;

			window.requestAnimationFrame(function() {
				self.clearContainer(self.tileContainer);

				self.updateScore(metadata.score);
				self.updateBestScore(metadata.bestScore);

				if (metadata.terminated) {
					if (metadata.over) {
						self.message(false); // You lose
					} else if (metadata.won) {
						self.message(true); // You win!
					}
				}

			});
		};

		MyMessage.prototype.continueGame = function() {
			if (typeof ga !== "undefined") {
				ga("send", "event", "game", "restart");
			}

			this.clearMessage();
		};