const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {
        timerId: null,
        countDownTimerId: setInterval(countDown, 1000),
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 30
    },
};

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.values.countDownTimerId);
        clearInterval(state.values.timerId);
        alert("Game Over! Seu resultado foi: " + state.values.result);
    }
}

 /* quadrado aleatorio que vai escolher o inimigo*/

function randomSquare() {
    state.view.squares.forEach((square) => { 
    square.classList.remove("enemy"); /* dentro do square. delecionado, a lista de classes dele classList vai dar um remove, caso tenha, na classe enemy*/
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("click", () => {
            if(square.id === state.values.hitPosition) {
                state.values.result++ 
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
            };
        });
    })
}

function initalize() {
    moveEnemy();
    addListenerHitBox();
}

initalize()

