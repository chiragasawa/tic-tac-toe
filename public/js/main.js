
let mainBoard = [[10, 10, 10], [10, 10, 10], [10, 10, 10]]


const col = Array();
const allCol = Array(...(document.getElementsByClassName("table-col")))

Array(...document.getElementsByClassName("table-row")).forEach(ele => {
    col.push(Array(...ele.getElementsByClassName("table-col")));
})


const notify=document.getElementById("notice-board")

const playerMsg = document.getElementById("message");
const FIRST_PLAYER = "🦒";
const SECOND_PLAYER = "😊";

const PLAYER_ICONS = [FIRST_PLAYER, SECOND_PLAYER];
const PLAYER_MSG = ["Your turn", "Other's turn"]


let game = {
    noChances: 9,
    player: 1,
    state: 1
}
playerMsg.innerHTML=PLAYER_MSG[(game.player +1) % 2]

/**
 * 
 * @param {int} index - index in which find the elements.
 * @param {int} axis - axis along which we have to find elements | 0 -> row | 1 -> col | 2 ->dig
 * @returns {string} return string by joining all elements.
 */

function getEle(index, axis) {
    let i = 0, result = "";
    if (axis === 1) {
        for (i = 0; i < 3; i++) {
            console.log(col[i][index]);
            result += col[i][index].innerHTML;
        }
        return result;
    }
    else if (axis === 0) {
        for (i = 0; i < 3; i++) {
            console.log(col[index][i]);
            result += col[index][i].innerHTML;
        }
        return result;
    }
    else if (axis === 2) {
        for (i = 0; i < 3; i++) {
            console.log(col[i][i]);
            result += col[i][i].innerHTML;
        }
        return result;
    }
    else if (axis === 3) {
        for (i = 0; i < 3; i++) {
            console.log(col[i][2-i]);
            result += col[i][2-i].innerHTML;
        }
        return result;
    }

}

function matchString(str1, str2) {
    return str1 === str2;
}
function endGame(type,winner) {
    game.state=0;
    if(type=="win"){
        document.getElementById("card-title").innerHTML ="🎉 Congratulations 🎉"
        document.getElementById("card-message").innerHTML =`Winner : ${winner}`
    }
    else if(type=="draw"){
        document.getElementById("card-title").innerHTML = "DRAW"
        document.getElementById("card-message").innerHTML = `Keep it up`

    }
    notify.style.display="block";
    return ;
}
function isWin(loc, turn) {



    console.log(turn, PLAYER_ICONS[turn]);
    const idealStr = (PLAYER_ICONS[turn]).repeat(3);
    let actualStr;


    // checking for row
    actualStr = getEle(loc.row, 0)
    console.log(actualStr, idealStr);
    const rowCheckResult = matchString(actualStr, idealStr);
    if (rowCheckResult)  return endGame("win",PLAYER_ICONS[turn])



    // checking for col
    actualStr = getEle(loc.col, 1)
    console.log(actualStr, idealStr);
    const colCheckResult = matchString(actualStr, idealStr);
    if (colCheckResult) return endGame("win",PLAYER_ICONS[turn])


    // checking for dig
    if ((loc.row + loc.col) === 1 || (loc.row + loc.col) === 3 ) return

    actualStr = getEle(loc.row, 2)
    console.log(actualStr, idealStr);
    const ldigCheckResult = matchString(actualStr, idealStr);
    if (ldigCheckResult) return endGame("win",PLAYER_ICONS[turn])

    actualStr = getEle(loc.row, 3)
    console.log(actualStr, idealStr);
    const rdigCheckResult = matchString(actualStr, idealStr);
    if (rdigCheckResult) return endGame("win",PLAYER_ICONS[turn])

}
function locFinder(element) {
    let row = +element.getAttribute("data-row")
    let col = +element.getAttribute("data-col")
    return {
        row, col
    }
}
function noChances() {
    game.noChances--;
    if (!(game.noChances > 0)) {
        game.state = 0;
        return endGame("draw");
    }

}

function nextTurn(loc) {
    if (game.state && mainBoard[loc.row][loc.col]===10) {
        mainBoard[loc.row][loc.col]=game.player;
        if (game.player == 1) {
            game.player = 0;
            playerMsg.innerHTML = PLAYER_MSG[1];
        }
        else {
            game.player = 1;
            playerMsg.innerHTML = PLAYER_MSG[0];
        }
        col[loc.row][loc.col].innerHTML = PLAYER_ICONS[game.player];
        isWin(loc, game.player);
        noChances();
    }

}

allCol.forEach(element => {
    element.addEventListener("click", (event) => {
        let loc = locFinder(element);
        nextTurn(loc);
        console.log(game);
        console.log(loc)
    })
});

const restartBtn = document.getElementById("restart-btn").addEventListener("click", (e) => {
    game.noChances=9;
    game.player=1;
    game.state=1;
    notify.style.display="none";
    allCol.forEach(ele=>{
        ele.innerHTML="";
    })
    mainBoard = [[10, 10, 10],[10, 10, 10],[10,10,10]]
})

