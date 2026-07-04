const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");
const resetScoreBtn = document.getElementById("resetScore");

const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const drawScore = document.getElementById("draw");

let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

let xWins = 0;
let oWins = 0;
let draws = 0;

const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

cells.forEach(cell => {
    cell.addEventListener("click", cellClicked);
});

restartBtn.addEventListener("click", restartGame);
resetScoreBtn.addEventListener("click", resetScore);

function cellClicked(){

    const index = this.dataset.index;

    if(board[index] !== "" || !gameActive){
        return;
    }

    board[index] = currentPlayer;
    this.textContent = currentPlayer;
    this.classList.add(currentPlayer.toLowerCase());

    checkWinner();
}

function checkWinner(){

    let won = false;

    for(let condition of winConditions){

        const a = condition[0];
        const b = condition[1];
        const c = condition[2];

        if(board[a] === "" || board[b] === "" || board[c] === ""){
            continue;
        }

        if(board[a] === board[b] && board[b] === board[c]){

            won = true;

            cells[a].classList.add("winner");
            cells[b].classList.add("winner");
            cells[c].classList.add("winner");

            break;
        }
    }

    if(won){

        statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;

        if(currentPlayer === "X"){
            xWins++;
            scoreX.textContent = xWins;
        }else{
            oWins++;
            scoreO.textContent = oWins;
        }

        gameActive = false;
        return;
    }

    if(!board.includes("")){

        statusText.textContent = "🤝 It's a Draw!";
        draws++;
        drawScore.textContent = draws;
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function restartGame(){

    board = ["","","","","","","","",""];
    gameActive = true;
    currentPlayer = "X";

    statusText.textContent = "Player X's Turn";

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("x");
        cell.classList.remove("o");
        cell.classList.remove("winner");
    });

}

function resetScore(){

    xWins = 0;
    oWins = 0;
    draws = 0;

    scoreX.textContent = 0;
    scoreO.textContent = 0;
    drawScore.textContent = 0;

    restartGame();
}