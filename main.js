const rows = 18;
const columns = 21;
var MoveCount = 0
let tellMove = new SpeechSynthesisUtterance()
var internalTimer
var secondTimer

document.getElementById('context').addEventListener('click', function (event) {
    //initialHold

    nextMove()
});

function paintHold(hold) {
    document.getElementById(hold).classList.add("circle");
}

function clearHold(hold) {
    document.getElementById(hold).classList.remove("circle");
}

function holdID(col, row) {
    return String.fromCharCode((65 + col)) + row
}

function nextMove() {

    // Starting position within the matrix
    let x = Math.floor(Math.random() * columns);
    // let y = Math.floor(Math.random() * rows);
    let y = 5;

    paintHold(holdID(x, y))

    tellMove.text = holdID(x, y)

    window.speechSynthesis.speak(tellMove)


    // Define possible movements (up, down, left, right)

    // const movements = [
    //     [-4, 4], [-3, 4], [-2, 4], [-1, 4], [0, 4], [1, 4], [2, 4], [3, 4], [4, 4],
    //     [-4, 3], [-3, 3], [-2, 3], [-1, 3], [0, 3], [1, 3], [2, 3], [3, 3], [4, 3],
    //     [-4, 2], [-3, 2], [-2, 2], [-1, 2], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2],
    //     [-4, 1], [-3, 1], [-2, 1], [-1, 1], [0, 1], [1, 1], [2, 1], [3, 1], [4, 1],
    //     [-4, 0], [-3, 0], [-2, 0], [-1, 0], [1, 0], [2, 0], [3, 0], [4, 0],
    //     [-4, -1], [-3, -1], [-2, -1], [-1, -1], [0, -1], [1, -1], [2, -1], [3, -1], [4, -1],
    //     [-4, -2], [-3, -2], [-2, -2], [-1, -2], [0, -2], [1, -2], [2, -2], [3, -2], [4, -2],
    //     [-4, -3], [-3, -3], [-2, -3], [-1, -3], [0, -3], [1, -3], [2, -3], [3, -3], [4, -3],
    //     [-4, -4], [-3, -4], [-2, -4], [-1, -4], [0, -4], [1, -4], [2, -4], [3, -4], [4, -4],
    // ]

    const movements = [

        [-3, 3], [-2, 3], [-1, 3], [0, 3], [1, 3], [2, 3], [3, 3],
        [-3, 2], [-2, 2], [-1, 2], [0, 2], [1, 2], [2, 2], [3, 2],
        [-3, 1], [-2, 1], [-1, 1], [0, 1], [1, 1], [2, 1], [3, 1],
        [-3, 0], [-2, 0], [-1, 0], [1, 0], [2, 0], [3, 0],
        [-3, -1], [-2, -1], [-1, -1], [0, -1], [1, -1], [2, -1], [3, -1],
        [-3, -2], [-2, -2], [-1, -2], [0, -2], [1, -2], [2, -2], [3, -2],
        [-3, -3], [-2, -3], [-1, -3], [0, -3], [1, -3], [2, -3], [3, -3],

    ]


    // Function to move after a delay
    function moveAfterDelay() {

        if (MoveCount >= 10) {
            console.log('walk end')
            return;
        }
        else {
            MoveCount++
        }

        clearHold(holdID(x, y))

        const [dx, dy] = movements[(Math.floor(Math.random() * movements.length))];

        x = (x + dx);
        y = (y + dy);

        if (x >= 22) { x = 21 }
        if (x <= 1) { x = 1 }
        if (y >= 18) { y = 18 }
        if (y <= 1) { y = 1 }

        if (MoveCount == 0) {
            y = 5
            MoveCount++
        }


        paintHold(holdID(x, y))

        console.log(MoveCount)

        tellMove.text = holdID(x, y)

        window.speechSynthesis.speak(tellMove)

        // Recursive call after a delay
        internalTimer = setTimeout(moveAfterDelay, 3000); // 3 seconds delay (3000 milliseconds)
    }

    // Start the movement after the initial delay
    secondTimer = setTimeout(moveAfterDelay, 3000); // Start after 3 seconds

}
