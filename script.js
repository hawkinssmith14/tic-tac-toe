function Gameboard() {
    let rows = 3, cols = 3;
    let board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            board[i][j] = 0;
        }
    }

    // Showing the board in console
    const printBoard = () => {
        console.table(board);
    };
    
    // Placing a token 
    const placeToken = (row, col, player) => {
        // Check if spot if empty (still = 0)
        if (board[row][col] === 0) {
            board[row][col] = player;
            return true; // Move successful
        } else {
            console.log("Spot already taken!");
            return false; // Move failed 
        }
    };

    // Win condition
    const checkWinner = () => {
        // Check rows 
        // Check if the position is available (pos !== 0)
        // Check if the position token is equal to the next two position tokens in the row
        for (let i = 0; i < rows; i++) {
            if (board[i][0] !== 0 &&
                board[i][0] === board[i][1] && 
                board[i][1] === board[i][2]) {
                    return board[i][0];
                }
        }

        // Check columns 
        for (let j = 0; j < cols; j++) {
            if (board[0][j] !== 0 &&
                board[0][j] === board[1][j] && 
                board[1][j] === board[2][j]) {
                    return board[0][j];
                }
        }

        // Check diagonals 
        if (board[0][0] !== 0 && 
            board[0][0] === board[1][1] && 
            board[1][1] === board[2][2]) {
                return board[0][0]; 
        }
        
        if (board[0][2] !== 0 && 
            board[0][2] === board[1][1] && 
            board[1][1] === board[2][0]) {
                return board[0][2];
        }

        return null;
    };

    return { printBoard, placeToken, checkWinner };
}

const message = document.querySelector(".message");

function GameController(player1Name, player2Name) {
    const board = Gameboard(); 

    const players = [
        { name: player1Name, token: "X" },
        { name: player2Name, token: "O" }
    ];

    let activePlayer = players[0]; // Start with player 1

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const playRound = (row, col) => {
        const currentToken = activePlayer.token;
        const moveSuccess = board.placeToken(row, col, activePlayer.token);

        if (moveSuccess) {
            const winner = board.checkWinner();

            if (winner) {
                board.printBoard();
                console.log(`${getActivePlayer().name} wins!`)
                message.textContent = (`${getActivePlayer().name} wins!`);
                return { success: true, token: currentToken, winner: true };
            }

            switchPlayerTurn();
            printNewRound();
            message.textContent = `${getActivePlayer().name}'s turn`;
            return { success: true, token: currentToken, winner: false };
        }

        return { success: false};
    };

    
    printNewRound();

    return { printNewRound, getActivePlayer, playRound };
}

const container = document.querySelector(".container");

function startGame() {
    const player1Input = document.querySelector(".player-1");
    const player1Name = player1Input.value || "Player 1";
    const player2Input = document.querySelector(".player-2");
    const player2Name = player2Input.value || "Player 2";

    const game = GameController(player1Name, player2Name);

    // Disable start button and show whose turn it is
    startButton.disabled = true;
    message.textContent = `${player1Name}'s turn`;

    // Show the container
    container.classList.add("active");

    for (let i = 0; i < 9; i++) {
        const square = document.createElement("div");
        square.classList.add("square");

        const row = Math.floor(i / 3);
        const col = i % 3;

        square.dataset.row = row;
        square.dataset.col = col;

        square.addEventListener("click", () => {
            const result = game.playRound(row, col);
            if (result.success) square.textContent = result.token;
        });

        container.appendChild(square);
    }
}

const startButton = document.querySelector(".start");
startButton.addEventListener("click", () => {
    startGame();
});

function restartGame() {
    container.innerHTML = "";
    message.textContent = "";
    startButton.disabled = false;
    startGame();
}

const restartButton = document.querySelector(".restart");
restartButton.addEventListener("click", () => {
    restartGame();      
})