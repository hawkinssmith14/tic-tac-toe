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

function GameController() {
    const board = Gameboard(); 

    const players = [
        { name: "Player 1", token: "X" },
        { name: "Player 2", token: "0" }
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
        const moveSuccess = board.placeToken(row, col, activePlayer.token);
        
        if (moveSuccess) {
            const winner = board.checkWinner();

            if (winner) {
                board.printBoard();
                console.log(`${getActivePlayer().name} wins!`)
                return;
            }

            switchPlayerTurn();
            printNewRound();
        }
    };
    
    printNewRound();

    return { printNewRound, getActivePlayer, playRound };
}

const game = GameController();