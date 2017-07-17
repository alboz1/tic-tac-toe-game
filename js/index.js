const game = {
	playersTurn: true,
	player: '',
	computer: '',
	pScore: 0,
	comScore: 0,

	eventListeners: function() {
		const gameGrid = document.querySelector('.game-grid');
		const chooseIcon = document.querySelector('.player-chose-wrapper');
		const newGameBtn = document.querySelector('.btn');

		gameGrid.addEventListener('click', (e) => {
			if (e.target.textContent !== '') return;

			if (this.playersTurn) {
				this.addXO(e.target, this.player);

				if (this.getWinner(this.player)) {
					this.pScore++;
					this.reset();
					this.updateScore();
					return;
				}
				this.playersTurn = false;

				setTimeout(() => {
					this.computersTurn();
				}, 250);
			}
		});

		chooseIcon.addEventListener('click', (e) => {
			const iconX = document.querySelector('#icon-x');
			const iconO = document.querySelector('#icon-o');

			if (e.target === iconO) {
				e.target.parentNode.parentNode.style.transform = 'translateY(-100%)';
				this.player = 'O';
				this.computer = 'X';
				this.reset();
			} else if (e.target === iconX) {
				e.target.parentNode.parentNode.style.transform = 'translateY(-100%)';
				this.player = 'X';
				this.computer = 'O';
				this.reset();
			}
		});

		newGameBtn.addEventListener('click', () => {
			const parent = chooseIcon.parentNode;
			parent.style.transform = 'translateY(0)';
			this.clearGrid();
			this.pScore = 0;
			this.comScore = 0;
			this.updateScore();
		});
	},

	addXO: function(btn, icon) {
		btn.textContent = icon;
	},

	computersTurn: function() {
		const squares = Array.prototype.slice.call(document.querySelectorAll('.square'));
		const emptyBtns = squares
			.filter(btn => btn.textContent === '')
			.map(btn => Number(btn.dataset.number));

		const min = Math.min(...emptyBtns);
		const max = Math.max(...emptyBtns);
		const num = Math.floor(Math.random() * (max - min) + min);
		const btn = document.querySelector(`.square[data-number="${num}"]`);

		if (emptyBtns.length === 0) return;

		if (btn.textContent !== '') {
			this.computersTurn();
		} else {
			this.addXO(btn, this.computer);
			this.playersTurn = true;
			if (this.getWinner(this.computer)) {
				this.comScore++;
				this.updateScore();
				this.reset();
			} else if (squares.every(square => square.textContent !== '')) {
				this.reset();
			}
		}
	},

	getWinner: function(winner) {
		const grid = [
			[0,1,2],
			[3,4,5],
			[6,7,8],
			[0,4,8],
			[0,3,6],
			[1,4,7],
			[2,5,8],
			[2,4,6]
		];
		return grid.some(posibilities => {
			const btns = posibilities.map(num => document.querySelector(`.square[data-number="${num}"]`));
			const [a, b, c] = btns;
			if (a.textContent === winner && b.textContent === winner && c.textContent === winner) {
				btns.forEach(btn => btn.style.color = '#29bc44');
				return true;
			} else {
				return false;
			}
		});
	},

	updateScore: function() {
		const playerScore = document.querySelector('#player-score');
		const computerScore = document.querySelector('#computer-score');

		playerScore.textContent = 'Player: ' + this.pScore;
		computerScore.textContent = 'Computer: ' + this.comScore;
	},

	clearGrid: function() {
		const btns = document.querySelectorAll('.square');
		btns.forEach(btn => {
			btn.style.color = '#fff';
			btn.textContent = '';
		});
	},

	reset: function() {
		this.playersTurn = false;

		setTimeout(() => {
			this.clearGrid();
		}, 600);
		setTimeout(() => {
			this.computersTurn();
		}, 1100);
	}
};
game.eventListeners();