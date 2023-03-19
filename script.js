const startBtn = document.querySelector('#start');
const timeList = document.querySelector('#time-list');
const screens = document.querySelectorAll('.screen');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');

const lasttButtons = document.querySelector('.last-buttons');
const lastButton = document.querySelectorAll('#last-button');
const cheatBtn = document.querySelector('.cheat');
const changeTime = document.querySelector('.change-time');
const goOnFirst = document.querySelector('.go-on-first');

const firstButtons = document.querySelector('.first-buttons');

let score = 0;
let time = 0;
let repeatTime = 0



startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
    lastButtonsDisappear()
})


timeList.addEventListener('click', (event)=>{
    if(event.target.classList.contains('time-btn')){
        time = parseInt(event.target.dataset.time);
        repeatTime = parseInt(event.target.dataset.time);
        screens[1].classList.add('up');

        finishRemove();

        startGame();


        score = 0;


        lastButtonsDisappear()
    }
})

board.addEventListener('click', function(event){
    if(event.target.classList.contains('circle')){
        score++;
        event.target.remove();
        createRandomCircle();
    }
})



var idleInterval = null

function startGame(){
    
    clearInterval(idleInterval)

    idleInterval = setInterval(decreaseTime, 1000);
    setTime(time);
    createRandomCircle();
}


function decreaseTime(){
    if (time === 0){
        finishGame();
    }
    else
    {
        let current = --time;
        if(current < 10){
            current = `0${current}`
        }   
        setTime(current);
    }
}





function finishGame(){
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Счёт: <span class="primary">${score}</span></h1>`
    lasttButtonsAppear();
}




function setTime(value){
    timeEl.innerHTML = `00:${value}`;
}

function createRandomCircle(){
    const circle = document.createElement('div');
    circle.classList.add('circle');
    const size = getRandomNumber(10, 60);
    const {width, height} = board.getBoundingClientRect();

    const x = getRandomNumber(0, width-size);
    const y = getRandomNumber(0, height-size);

    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${x}px`;
    circle.style.left = `${y}px`;

    board.append(circle);
};

function getRandomNumber(min, max){
    return Math.round(Math.random() * (max - min) + min)
}



/* -------------- CHEAT ------------ */

let cheatInterval = null;

function winTheGame(){

    clearInterval(cheatInterval)

    cheatInterval = setInterval(() => {
        const circle = document.querySelector('.circle');
    
        if(circle){
            circle.click();
        }
    });
    
    setTimeout(() => {
        clearInterval(cheatInterval)
    }, 3000);

}


screens[2].addEventListener('click', function(event){
    if(event.target.classList.contains('cheat')){
        winTheGame();
    }
})

/* -------------- BUTTONS ------------ */

lasttButtons.addEventListener('click', function(event){
    if(event.target.classList.contains('change-time')){
        finishRemove();
        screens[1].classList.remove('up');
        time = 0;
        score = 0;
        lastButtonsDisappear()
    }
    else if (event.target.classList.contains('go-on-first')){
        lastButtonsDisappear()
        screens[1].classList.remove('up');
        screens[0].classList.remove('up');
    }
    else if (event.target.classList.contains('repeat')){
        repeatGame();
        lastButtonsDisappear()
    }
})


/* -------------- FIRST BUTTONS ------------ */

firstButtons.addEventListener('click', function(event){
    if(event.target.classList.contains('normal-theme')){
        for (let i = 0; i < screens.length; i++) {
            screens[i].classList.remove('anime');
        }
    }
    else if (event.target.classList.contains('anime-theme')){
        for (let i = 0; i < screens.length; i++) {
            screens[i].classList.add('anime');
        }
    }
})

/* -------------- ------------ ------------ */

function repeatGame(){
    time = repeatTime;
    score = 0;
    finishRemove();
    startGame()
}

function finishRemove(){
    timeEl.parentNode.classList.remove('hide');
    board.innerHTML = ``;
}


function lasttButtonsAppear(){
    for (let i = 0; i < lastButton.length; i++) {
        lastButton[i].classList.remove('hideOpacity');
    }
}


function lastButtonsDisappear(){
    for (let i = 0; i < lastButton.length; i++) {
        lastButton[i].classList.add('hideOpacity');
    }
}