"use strict";

/*
* Palyavalaszto
*  */

const palyavalaszto = document.querySelector("#palyavalaszto")
const palyavalasztoBtnGroup = palyavalaszto.querySelector("#palyavalaszto-btn-group")
const playerN = palyavalaszto.querySelector("#playerName")

palyavalasztoBtnGroup.addEventListener("click", renderJatekter)

/*
* Jatekter
*  */

const jatekter = document.querySelector("#jatekter")
const timer = jatekter.querySelector("#timer")
const diffi = jatekter.querySelector("#diffi")
const player = jatekter.querySelector("#player")
const game = jatekter.querySelector("#game")
const checkGame = jatekter.querySelector('#checkGame')
const solution = jatekter.querySelector("#solution")
const backto = jatekter.querySelector("#backto")
const save = jatekter.querySelector("#saveGame")
let createNew = jatekter.querySelector("#newGame")

checkGame.addEventListener('click', isGameOver)
backto.addEventListener("click", backtoPalyavalaszto)
save.addEventListener("click", saveGame)
createNew.addEventListener("click", createNewGame)

/*
* Variables
* */
let playerName, difficulty, startTime, elapsedTime
let table = []
let rowIndex, colIndex
let r, l, d, u, end
let savedTable, savedName, savedTime, savedDiff
let intervalMy

/*
* Initialize game
* */

function renderJatekter(e) {

    if (e.target.value !== 'saved') {
        playerName = playerN.value

        setInitialGame(e)
        startTime = Date.now()

        intervalMy = setInterval(() => {
            let endTime = Date.now()
            elapsedTime = Math.round((endTime - startTime) / 1000)

            if (elapsedTime < 60) {
                timer.innerText = elapsedTime + "s"
            } else {
                timer.innerText = Math.floor(elapsedTime / 60) + "m " + elapsedTime % 60 + "s"
            }

        }, 1000)

    } else {
        playerName = savedName
        difficulty = savedDiff
        elapsedTime = savedTime

        table = savedTable
        savedTable = null

        table.forEach(row => game.appendChild(row))
        table = Array.from(game.querySelectorAll(".row")).map((x) => x.querySelectorAll(".col"))

        startTime = Date.now()

        intervalMy = setInterval(() => {
            let end = Date.now()
            let elapsed = Math.round((end - startTime) / 1000) + elapsedTime

            if (elapsed < 60) {
                timer.innerText = elapsed + "s"
            } else {
                timer.innerText = Math.floor(elapsed / 60) + "m " + elapsed % 60 + "s"
            }

        }, 1000)

    }

    palyavalaszto.hidden = true
    jatekter.hidden = false
}

function setInitialGame(e) {
    const tableSize = e.target.value

    difficulty = e.target.id
    player.innerText = playerName
    diffi.innerText = difficulty

    for (let i = 0; i < tableSize; i++) {
        const row = document.createElement('div')
        row.classList.add("row")

        for (let j = 0; j < tableSize; j++) {
            const cell = document.createElement('div')

            cell.classList.add("col", "border", "d-flex", "align-items-center", "justify-content-center", "ratio", "ratio-1x1", "*-0")
            cell.id = `${i},${j}`
            cell.style.background = 'white'
            cell.style.color = "white"
            cell.style.transition = "background-color 1s"
            cell.addEventListener("click", setFields)

            row.appendChild(cell)
        }

        game.appendChild(row)
    }

    table = Array.from(game.querySelectorAll(".row")).map((x) => x.querySelectorAll(".col"))

    setBlackBoxes()
}

function setBlackBoxes() {
    if (difficulty === 'easy') {
        setBlackEasy()
    } else if (difficulty === 'medium') {
        setBlackMedium()
    } else {
        setBlackExtreme()
    }
}

function setBlackEasy() {
    table[0][3].style.background = "black"
    table[0][3].innerText = "1"

    table[1][1].style.background = "black"
    table[1][1].innerText = "0"
    table[1][5].style.background = "black"
    table[1][5].innerText = "2"

    table[3][0].style.background = "black"
    table[3][3].style.background = "black"
    table[3][6].style.background = "black"

    table[5][1].style.background = "black"
    table[5][5].style.background = "black"
    table[5][5].innerText = "2"

    table[6][3].style.background = "black"
    table[6][3].innerText = "3"
}

function setBlackMedium() {
    table[0][2].style.background = "black"
    table[0][2].innerText = "0"
    table[0][4].style.background = "black"

    table[2][0].style.background = "black"
    table[2][2].style.background = "black"
    table[2][4].style.background = "black"
    table[2][4].innerText = "3"
    table[2][6].style.background = "black"

    table[3][3].style.background = "black"
    table[3][3].innerText = "1"

    table[4][0].style.background = "black"
    table[4][0].innerText = "2"

    table[4][2].style.background = "black"
    table[4][4].style.background = "black"
    table[4][6].style.background = "black"

    table[6][2].style.background = "black"
    table[6][4].style.background = "black"
    table[6][4].innerText = "2"
}

function setBlackExtreme() {
    table[0][1].style.background = "black"

    table[1][5].style.background = "black"
    table[1][5].innerText = "3"
    table[1][7].style.background = "black"
    table[1][7].innerText = "2"

    table[1][9].style.background = "black"
    table[2][1].style.background = "black"
    table[2][1].innerText = "0"

    table[2][2].style.background = "black"
    table[2][7].style.background = "black"
    table[3][4].style.background = "black"

    table[4][1].style.background = "black"
    table[4][1].innerText = "1"
    table[4][4].style.background = "black"
    table[4][5].style.background = "black"
    table[4][5].innerText = "1"
    table[4][6].style.background = "black"

    table[5][3].style.background = "black"
    table[5][4].style.background = "black"
    table[5][5].style.background = "black"
    table[5][8].style.background = "black"
    table[5][8].innerText = "3"

    table[6][5].style.background = "black"

    table[7][2].style.background = "black"
    table[7][2].innerText = "1"
    table[7][7].style.background = "black"
    table[7][7].innerText = "0"
    table[7][8].style.background = "black"

    table[8][0].style.background = "black"
    table[8][0].innerText = "3"
    table[8][2].style.background = "black"
    table[8][4].style.background = "black"
    table[8][4].innerText = "0"


    table[9][8].style.background = "black"
    table[9][8].innerText = "0"
}

/*
* Game functions
*/

async function setFields(e) {
    const field = e.target

    if (field.style.background === 'black') return

    const indexes = (field.id).split(",")
    rowIndex = parseInt(indexes[0])
    colIndex = parseInt(indexes[1])

    if (field.innerText !== "💡") {
        field.innerText = "💡"
        field.style.background = "lightyellow"
        await onFields(100)
    } else if (field.innerText === "💡") {
        field.innerText = ""
    }

    await updateValues(0)
}

async function updateValues() {
    table.forEach(row => Array.from(row).forEach(col => col.style.background !== 'black' ? col.style.background = 'white' : col))

    for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < table.length; j++) {
            const col = table[i][j]

            const indexes = (col.id).split(",")
            rowIndex = parseInt(indexes[0])
            colIndex = parseInt(indexes[1])

            if (col.innerText === "💡") {
                doIntersect(col)
                await onFields()
            } else if (col.style.background === 'black') {
                doBlackOK(col)
            }
        }
    }
}

async function onFields(sleepTime = 0) {
    r = colIndex + 1
    l = colIndex - 1
    d = rowIndex + 1
    u = rowIndex - 1

    do {

        end = 0

        if (r < table.length && table[rowIndex][r].style.background !== 'black') {

            if (table[rowIndex][r].style.background !== 'red') {
                table[rowIndex][r].style.background = 'lightyellow'
            }

            r++
        } else {
            end++
        }

        if (l >= 0 && table.length && table[rowIndex][l].style.background !== 'black') {

            if (table[rowIndex][l].style.background !== 'red') {
                table[rowIndex][l].style.background = 'lightyellow'
            }

            l--
        } else {
            end++
        }

        if (d < table.length && table[d][colIndex].style.background !== 'black') {
            if (table[d][colIndex].style.background !== 'red') {
                table[d][colIndex].style.background = 'lightyellow'
            }

            d++
        } else {
            end++
        }

        if (u >= 0 && table[u][colIndex].style.background !== 'black') {

            if (table[u][colIndex].style.background !== 'red') {
                table[u][colIndex].style.background = 'lightyellow'
            }

            u--
        } else {
            end++
        }

        await sleep(sleepTime)

    } while (end < 4)
}

function doIntersect() {
    r = colIndex + 1
    l = colIndex - 1
    d = rowIndex + 1
    u = rowIndex - 1

    let isIt = false

    while (r < table.length && table[rowIndex][r].style.background !== 'black') {

        if (table[rowIndex][r].innerText === "💡") {
            table[rowIndex][r].style.background = 'red'
            isIt = true
        }

        r++

    }

    while (l >= 0 && table.length && table[rowIndex][l].style.background !== 'black') {

        if (table[rowIndex][l].innerText === "💡") {
            table[rowIndex][l].style.background = 'red'
            isIt = true
        }

        l--
    }

    while (d < table.length && table[d][colIndex].style.background !== 'black') {
        if (table[d][colIndex].innerText === "💡") {
            table[d][colIndex].style.background = 'red'
            isIt = true
        }

        d++
    }


    while (u >= 0 && table[u][colIndex].style.background !== 'black') {

        if (table[u][colIndex].innerText === "💡") {
            table[u][colIndex].style.background = 'red'
            isIt = true
        }

        u--
    }

    if (isIt) {
        table[rowIndex][colIndex].style.background = 'red'
    } else {
        table[rowIndex][colIndex].style.background = 'lightyellow'
    }

}

function doBlackOK(blackCol) {
    let near = 0
    let value = parseInt(blackCol.innerText)

    if (value === undefined || isNaN(value)) return true

    const indexes = (blackCol.id).split(",")
    rowIndex = parseInt(indexes[0])
    colIndex = parseInt(indexes[1])


    if (colIndex + 1 < table.length) {
        if (table[rowIndex][colIndex + 1].innerText === "💡") near++
    }

    if (0 <= colIndex - 1) {
        if (table[rowIndex][colIndex - 1].innerText === "💡") near++
    }

    if (rowIndex + 1 < table.length) {
        if (table[rowIndex + 1][colIndex].innerText === "💡") near++
    }

    if (0 <= rowIndex - 1) {
        if (table[rowIndex - 1][colIndex].innerText === "💡") near++
    }

    if (near === value) {
        blackCol.style.color = 'lime'
    } else {
        blackCol.style.color = 'white'
    }

    return near === value
}

function isGameOver() {

    solution.innerHTML = "Bad solution"
    solution.style.color = "red"

    for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < table.length; j++) {
            const col = table[i][j]
            if (col.style.background === 'white'
                || col.style.background === 'red'
                || !doBlackOK(col)
            ) {
                solution.hidden = false
                return
            }
        }
    }


    solution.innerHTML = "Good solution"
    solution.style.color = "green"
    solution.hidden = false

}

function createNewGame() {
    table.forEach(row => Array.from(row).forEach(function (col) {

        if (col.style.background !== 'black') {
            col.style.background = 'white'
        }

        if (col.innerText === "💡") {
            col.innerText = ""
        }

        col.style.color = 'white'
    }))
}

function saveGame() {
    savedTable = game.querySelectorAll(".row")
    savedName = playerName
    savedTime = elapsedTime
    savedDiff = difficulty
}

function backtoPalyavalaszto() {
    clearInterval(intervalMy)

    if (savedTable) {
        let btn = document.createElement("button")
        btn.classList.add("btn", "btn-secondary")
        btn.innerText = "Mentett"
        btn.value = "saved"

        palyavalasztoBtnGroup.appendChild(btn)
    }

    while (game.firstChild) {
        game.removeChild(game.firstChild);
    }

    table = null
    jatekter.hidden = true
    palyavalaszto.hidden = false

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
