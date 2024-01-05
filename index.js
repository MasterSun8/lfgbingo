const raids = document.getElementById('raids')
const title = document.getElementById('title')
const neutral = document.getElementById('neutral')
const get = window.location.search
console.log(get)
const params = new URLSearchParams(get)
var tiles = new Array()

async function getTiles(raid = "") {
    let bingo = await fetch("bingo.json")
    tiles = await bingo.json()
    return bingo
}

function makeBingo(raid = "") {
    let result = new Array()
    result.push(tiles['neutral'])
    if (raid) {
        result[0].push(...tiles[raid])
    }
    return result
}
function generateTable(result) {
    console.log(result)
    const tbl = document.createElement("table")
    const tblBody = document.createElement("tbody")
    for (let i = 0; i < 5; i++) {
        const row = document.createElement("tr")
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement("td")
            const cellText = document.createTextNode('')
            if (i == j && i == 2) {
                let x = Math.floor(Math.random() * tiles['free'].length)
                cellText.nodeValue = tiles['free'][x]
                cell.style.backgroundColor = '#9E009E'
            } else {
                let x = Math.floor(Math.random() * result.length)
                cellText.nodeValue = result.splice(x, 1)
            }
            cell.appendChild(cellText)
            row.appendChild(cell)
        }
        tblBody.appendChild(row)
    }

    tbl.appendChild(tblBody)
    document.body.appendChild(tbl)
    tbl.setAttribute("border", "2")
}

if (get) {
    raids.remove()
    neutral.remove()
}


if (params.has("raid") || params.get("neutral")) {
    console.log(params.get("raid"))

    let r = params.get("raid")
    title.innerHTML += `<br>${r}`

    getTiles().then(b => {
        let table = makeBingo(r)
        generateTable(table[0])
    })
}