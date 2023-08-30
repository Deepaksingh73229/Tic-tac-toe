const info = document.querySelector('.info');
const boxes = document.querySelectorAll('.box');
const btn = document.querySelector('.btn');

let player;
let grid;
let count = 0;

const winpos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function init(){

    player = 'X';

    count = 0;
    grid = ["","","","","","","","",""];
    info.innerText = `Current Player: ${player}`;
    btn.classList.remove('active');

    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = 'all';
        box.classList = `box box${index+1}`;
    })

}

init();

function swap_turn(){
    if(player == 'X'){
        player = '0';
    }
    else{
        player = 'X';
    }
    info.innerText = `Current Player: ${player}`;
}

function win_check(){
     
    let result = '';

    winpos.forEach((position) => {
        if((grid[position[0]] !== '' || grid[position[1]] !== '' || grid[position[2]] !== '')
            && (grid[position[0]] === grid[position[1]]) && (grid[position[1]] === grid[position[2]])){

            result = grid[position[0]];

            boxes.forEach((box) => {
                box.style.pointerEvents = 'none';
            })

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    count++;

    if(result !== ''){
        info.innerText = `${result}: Congratulation, You have won the Game`;
        btn.classList.add("active");
        return;
    }

    if(count === 9){
        info.innerText = `Game Tied!`;
        btn.classList.add('active');
    }
}

function gridclick(index){
    if(grid[index] === ""){
        grid[index] = player;
        boxes[index].innerText = player;

        boxes[index].style.pointerEvents = 'none';

        // count++;

        swap_turn();
        win_check();
    }
}

boxes.forEach((box, index ) => {
    box.addEventListener('click', () => {
        gridclick(index);
    })
});

btn.addEventListener('click', init);

