class Start {
  constructor(width, height, appElement) {
    this.width = width;
    this.height = height;

    this.appElement = appElement;
  }

  init() {
    let startElement = document.createElement('div');

    startElement.style.height = this.height + 'px';
    startElement.style.width = this.width + 'px';
    startElement.style.margin = '0 auto';
    startElement.style.borderRadius = 10 + 'px';
    startElement.style.backgroundImage = 'url(./images/game_logo.png)';
    startElement.style.backgroundSize = '30% 60%';
    startElement.style.backgroundPosition = 'top center';
    startElement.style.backgroundRepeat = 'no-repeat';
    startElement.style.backgroundColor = 'gray';
    startElement.style.position = 'relative';

    let startButton = document.createElement('div');

    startButton.style.lineHeight = 50 + 'px';
    startButton.style.width = 200 + 'px';
    startButton.style.backgroundColor = '#d5d5d5';
    startButton.style.position = 'absolute';
    startButton.style.top = 300 + 'px';
    startButton.style.left = 400 + 'px';
    startButton.style.borderRadius = 10 + 'px';
    startButton.innerHTML = 'START GAME';
    startButton.style.textAlign = 'center';
    startButton.style.boxShadow = '0px 0px 10px black';

    startButton.onmouseover = () => {
      startButton.style.backgroundColor = 'gray';
      startButton.style.cursor = 'pointer';
    }
    startButton.onmouseout = () => {
      startButton.style.backgroundColor = '#d5d5d5';
    }
    startButton.onclick = () => {
      this.appElement.removeChild(startElement);
      this.appElement.appendChild(new GameConfig(width, height, this.appElement).init());
    }

    startElement.appendChild(startButton);

    return startElement;
  }
}