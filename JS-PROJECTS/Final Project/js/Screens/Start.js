class Start {
  constructor(width, height, appElement) {
    this.width = width;
    this.height = height;

    this.appElement = appElement;
  }

  init() {
    this.startElement = document.createElement('div');

    this.startElement.style.height = this.height + 'px';
    this.startElement.style.width = this.width + 'px';
    this.startElement.style.margin = '0 auto';
    this.startElement.style.borderRadius = 10 + 'px';
    this.startElement.style.backgroundImage = 'url(./images/game_logo.png)';
    this.startElement.style.backgroundSize = '30% 60%';
    this.startElement.style.backgroundPosition = 'top center';
    this.startElement.style.backgroundRepeat = 'no-repeat';
    this.startElement.style.backgroundColor = 'gray';
    this.startElement.style.position = 'relative';

    this.startButton = document.createElement('div');

    this.startButton.style.lineHeight = 50 + 'px';
    this.startButton.style.width = 200 + 'px';
    this.startButton.style.backgroundColor = '#d5d5d5';
    this.startButton.style.position = 'absolute';
    this.startButton.style.top = 300 + 'px';
    this.startButton.style.left = 400 + 'px';
    this.startButton.style.borderRadius = 10 + 'px';
    this.startButton.innerHTML = 'START GAME';
    this.startButton.style.textAlign = 'center';
    this.startButton.style.boxShadow = '0px 0px 10px black';

    this.startButton.onmouseover = () => {
      this.startButton.style.backgroundColor = 'gray';
      this.startButton.style.cursor = 'pointer';
    }
    this.startButton.onmouseout = () => {
      this.startButton.style.backgroundColor = '#d5d5d5';
    }
    this.startButton.onclick = () => {
      this.appElement.removeChild(this.startElement);
      this.appElement.appendChild(new GameContainer(width, height, this.appElement).init());
    }

    this.startElement.appendChild(this.startButton);

    return this.startElement;
  }
}