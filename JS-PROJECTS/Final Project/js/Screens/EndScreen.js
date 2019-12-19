class EndScreen {
  constructor(width, height, callingClass, appElement, text) {
    this.height = height;
    this.width = width;

    this.text = text;

    this.callingClass = callingClass;
    this.appElement = appElement;
  }

  init() {
    this.endScreen = document.createElement('div');

    this.endScreen.style.height = this.height + 'px';
    this.endScreen.style.width = this.width + 'px';
    this.endScreen.style.margin = '0 auto';
    this.endScreen.style.position = 'relative';
    this.endScreen.style.boxShadow = '0px 0px 10px gray';
    this.endScreen.style.borderRadius = 10 + 'px';
    this.endScreen.style.backgroundColor = '#a9a9a9';

    this.gameOver = document.createElement('span');
    
    this.gameOver.style.margin = '0 auto';
    this.gameOver.innerHTML = this.text;
    this.gameOver.style.display = 'block';
    this.gameOver.style.lineHeight = 200 + 'px';
    this.gameOver.style.textAlign = 'center';
    this.gameOver.style.fontSize = 55 +'px';

    this.endScreen.appendChild(this.gameOver);

    this.finalScore = document.createElement('span');

    this.finalScore.style.margin = '0 auto';
    this.finalScore.innerHTML = 'Your Score is: ' +this.callingClass.score;
    this.finalScore.style.display = 'block';
    this.finalScore.style.lineHeight = 50 + 'px';
    this.finalScore.style.textAlign = 'center';
    this.finalScore.style.fontSize = 20 + 'px';

    this.endScreen.appendChild(this.finalScore);

    this.endButton = document.createElement('div');

    this.endButton.style.lineHeight = 50 + 'px';
    this.endButton.style.width = 200 + 'px';
    this.endButton.style.backgroundColor = '#d5d5d5';
    this.endButton.style.position = 'absolute';
    this.endButton.style.top = 300 + 'px';
    this.endButton.style.left = 400 + 'px';
    this.endButton.style.borderRadius = 10 + 'px';
    this.endButton.innerHTML = 'PLAY AGAIN';
    this.endButton.style.textAlign = 'center';
    this.endButton.style.boxShadow = '0px 0px 10px black';

    this.endButton.onmouseover = () => {
      this.endButton.style.backgroundColor = 'gray';
      this.endButton.style.cursor = 'pointer';
    }
    this.endButton.onmouseout = () => {
      this.endButton.style.backgroundColor = '#d5d5d5';
    }
    this.endButton.onclick = () => {
      this.appElement.removeChild(this.endScreen);
      this.appElement.appendChild(new GameConfig(this.width, this.height, this.appElement).init());
    }

    this.endScreen.appendChild(this.endButton);

    return this.endScreen;
  }
}