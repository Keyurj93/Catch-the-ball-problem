

 startGame = () => {
    let startButton = document.getElementById('catchball-start-button');
    startButton.style.display = 'none';
    myGameArea.score = 0;
    myGameArea.chances = 10;
    myGameArea.start();
}

resetViews = () => {
    myGameArea.start();
}

const myGameArea = {
    score: 0,
    chances: 10,
    nextButton: document.getElementById('catchball-next-button'),
    startButton: document.getElementById('catchball-start-button'),
    start : () => {
        if(myGameArea.chances > 0) {
            myGameArea.renderBox('70%');
            myGameArea.renderBall('0%');
        } else {
            window.alert('game over your score is '+myGameArea.score);
            myGameArea.startButton.style.display = 'block';
            myGameArea.nextButton.style.display = 'none';
        }
    },
    renderBox: (ypos) => {
        let box = document.getElementById('catchball-box');
        box.style.position = 'absolute';
        const xpos = myGameArea.generateRandomXCoordinate();
        box.style.left = xpos;
        box.style.top = ypos;
        myGameArea.renderBall('0%');
    },
    generateRandomXCoordinate:() => {
        let xpos = '0px';
        xpos = Math.floor(Math.random() * 90);
        xpos = xpos.toString();
        return xpos + '%';
},
    renderBall : (ypos) => {
        let ball = document.getElementById('catchball-ball');
        ball.style.position = 'absolute';
        const xpos = myGameArea.generateRandomXCoordinate();
        ball.style.left = xpos;
        ball.style.top = ypos;
        myGameArea.confgureEvents();
    },
    confgureEvents : () => {
        let ball = document.getElementById('catchball-ball');
        ball.classList.remove('horizTranslate');
        ball.onmousedown = function(event) {
            console.log('mouse click');
            myGameArea.nextButton.style.display = 'none';
            let shiftX = event.clientX - ball.getBoundingClientRect().left;
            let shiftY = event.clientY - ball.getBoundingClientRect().top;
        
            ball.style.position = 'absolute';
            ball.style.zIndex = 1000;
        
            moveAt(event.pageX, event.pageY);
        
            function moveAt(pageX, pageY) {
              ball.style.left = pageX - shiftX + 'px';
              ball.style.top = pageY - shiftY + 'px';
            }
        
            function onMouseMove(event) {
                console.log('mouse move');
              moveAt(event.pageX, event.pageY);
        
              ball.hidden = true;
              let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
              ball.hidden = false;
        
              if (!elemBelow) return;
            }
        
            document.addEventListener('mousemove', onMouseMove);
        
            ball.onmouseup = function() {
                console.log('mouse up');
              document.removeEventListener('mousemove', onMouseMove);
              ball.onmouseup = null;
              ball.classList.add('horizTranslate');
              myGameArea.getResult();
            };
            ball.ondragstart = () => {
                return false;
              };
          };
        },
        getResult: () => {
            let ball = document.getElementById('catchball-ball');
            let box = document.getElementById('catchball-box');
            ball = ball.getBoundingClientRect();
            box = box.getBoundingClientRect();
            const ballRadius = ball.width/2;
            //in
            if(!(box.left - ball.left > ballRadius)) {
                myGameArea.score++;
            }
            myGameArea.chances--;
            myGameArea.nextButton.style.display = 'block';

        }

}

