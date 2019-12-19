class GameConfig {

  maps = [];

  selectedLevel = 1;
  selectedPlayer = 1;

  levels = [];
  players = [];

  playerConfig = [
    {
      sx: 0,
      sy: 0,
      speed: 4,
      life: 3
    },
    {
      sx: 0,
      sy: 100,
      speed: 4,
      life: 6
    },
    {
      sx: 0,
      sy: 200,
      speed: 8,
      life: 3
    }
  ]

  enemyConfig = [
    {
      speed: 0.6,
      proximity: 200
    },
    {
      speed: 0.8,
      proximity: 500
    },
    {
      speed: 1,
      proximity: 700
    }
  ]

  selectedPlayerConfig = this.playerConfig[this.selectedPlayer - 1];
  selectedEnemyConfig = this.enemyConfig[this.selectedLevel - 1];
  currentLevelMap;

  constructor(width, height, appElement) {
    this.width = width;
    this.height = height;

    this.appElement = appElement;
  }

  init() {
    this.gameConfigElement = document.createElement('div');

    this.gameConfigElement.style.height = this.height + 'px';
    this.gameConfigElement.style.width = this.width + 'px';
    this.gameConfigElement.style.margin = '0 auto';
    this.gameConfigElement.style.position = 'relative';
    this.gameConfigElement.className = 'clear';
    this.gameConfigElement.style.borderRadius = 10 + 'px';
    this.gameConfigElement.style.backgroundColor = 'gray';
    this.gameConfigElement.style.position = 'relative';

    this.levelSelector = document.createElement('div');

    this.levelSelector.style.height = this.height + 'px';
    this.levelSelector.style.width = this.width / 2 + 'px';
    this.levelSelector.style.position = 'relative';
    this.levelSelector.style.float = 'left';
    this.levelSelector.style.borderRadius = 10 + 'px';
    this.levelSelector.style.boxShadow = '0px 0px 10px black';

    this.gameConfigElement.appendChild(this.levelSelector);

    this.playerSelector = document.createElement('div');

    this.playerSelector.style.height = this.height + 'px';
    this.playerSelector.style.width = this.width / 2 + 'px';
    this.levelSelector.style.position = 'relative';
    this.playerSelector.style.float = 'right';
    this.playerSelector.style.borderRadius = 10 + 'px';
    this.playerSelector.style.boxShadow = '0px 0px 10px black';

    this.getJsonData(this.setMapData.bind(this));
    this.gameConfigElement.appendChild(this.playerSelector);

    return this.gameConfigElement;
  }

  appendLevelSelector() {
    let top = 0;
    let left = 40;
    for (let i = 0; i < this.maps.length; i++) {
      this.top += 20;
      let level = document.createElement('div');
      this.levels.push(level);
      level.style.lineHeight = 100 + 'px';
      level.style.width = 400 + 'px';
      level.style.position = 'absolute';
      level.style.margin = '50px auto';
      level.style.borderRadius = 10 + 'px';
      level.style.boxShadow = '0px 0px 10px black';
      level.style.top = top + 'px';
      level.style.left = left + 'px';
      if (this.selectedLevel - 1 === i) {
        level.style.background = 'gray';
      } else {
        level.style.background = '#a9a9a9';
      }
      level.style.textAlign = 'center';

      level.innerHTML = 'LEVEL ' + (i + 1);

      level.onmouseover = () => {
        level.style.background = 'gray';
        level.style.cursor = 'pointer';
      }

      level.onmouseout = () => {
        if (this.selectedLevel - 1 === i) {
          level.style.background = 'gray';
        } else {
          level.style.background = '#a9a9a9'
        }
      }

      level.onclick = () => {
        this.levels[this.selectedLevel - 1].style.background = '#a9a9a9';
        this.selectedLevel = i + 1;
        this.selectedEnemyConfig = this.enemyConfig[i];
        this.currentLevelMap = this.maps[i];
      }

      this.levelSelector.appendChild(level);
      top += 120;
    }
  }

  getJsonData(callBack) {
    let request = new XMLHttpRequest();
    request.open('GET', './js/Levels/levels.json', true);
    request.send();
    request.onload = function () {
      if (request.status === 200) {
        let mapData = JSON.parse(request.responseText);
        callBack(mapData);
      }
    }
  }

  appendPlayerSelector() {
    let top = 0;
    let left = 680;
    for (let i = 0; i < this.maps.length; i++) {
      this.top += 20;
      let player = document.createElement('div');
      if (i === 0) {
        player.innerHTML = 'Player ' + (i + 1) + ':Regular';
      } else if (i === 1) {
        player.innerHTML = 'Player ' + (i + 1) + ':Double Health';
      } else if (i === 2) {
        player.innerHTML = 'Player ' + (i + 1) + ':Double Speed';
      }
      this.players.push(player);
      player.style.height = 150 + 'px';
      player.style.width = 150 + 'px';
      player.style.position = 'absolute';
      player.style.margin = '50px auto';
      player.style.borderRadius = 10 + 'px';
      player.style.boxShadow = '0px 0px 10px black';
      player.style.top = top + 'px';
      player.style.left = left + 'px';
      player.style.backgroundImage = 'url(./images/hero' + (i + 1) + '.png)';
      player.style.backgroundRepeat = 'no-repeat';
      player.style.backgroungSize = '100% 100%';
      player.style.backgroundPosition = 'center';

      if (this.selectedPlayer - 1 === i) {
        player.style.backgroundColor = 'gray';
        player.style.backgroundImage = 'url(./images/hero' + (i + 1) + '.png)';
        player.style.backgroundRepeat = 'no-repeat';
        player.style.backgroungSize = '100% 100%';
        player.style.backgroundPosition = 'center';
      } else {
        player.style.backgroundColor = '#a9a9a9';
        player.style.backgroundImage = 'url(./images/hero' + (i + 1) + '.png)';
        player.style.backgroundRepeat = 'no-repeat';
        player.style.backgroungSize = '100% 100%';
        player.style.backgroundPosition = 'center';
      }
      player.style.textAlign = 'center';

      player.onmouseover = () => {
        player.style.backgroundColor = 'gray';
        player.style.backgroundImage = 'url(./images/hero' + (i + 1) + '.png)';
        player.style.backgroundRepeat = 'no-repeat';
        player.style.backgroungSize = '100% 100%';
        player.style.backgroundPosition = 'center';
        player.style.cursor = 'pointer';
      }

      player.onmouseout = () => {
        if (this.selectedPlayer - 1 === i) {
          player.style.backgroundColor = 'gray';
          player.style.backgroundImage = 'url(./images/hero' + (i + 1) + '.png)';
          player.style.backgroundRepeat = 'no-repeat';
          player.style.backgroungSize = '100% 100%';
          player.style.backgroundPosition = 'center';
        } else {
          player.style.backgroundColor = '#a9a9a9';
          player.style.backgroundImage = 'url(./images/hero' + (i + 1) + '.png)';
          player.style.backgroundRepeat = 'no-repeat';
          player.style.backgroungSize = '100% 100%';
          player.style.backgroundPosition = 'center';
        }
      }

      player.onclick = () => {
        this.players[this.selectedPlayer - 1].style.background = '#a9a9a9';
        this.players[this.selectedPlayer - 1].style.backgroundImage = 'url(./images/hero' + (this.selectedPlayer) + '.png)';
        this.players[this.selectedPlayer - 1].style.backgroundRepeat = 'no-repeat';
        this.players[this.selectedPlayer - 1].style.backgroungSize = '100% 100%';
        this.players[this.selectedPlayer - 1].style.backgroundPosition = 'center';
        this.selectedPlayer = i + 1;
        this.selectedPlayerConfig = this.playerConfig[i];
      }

      this.playerSelector.appendChild(player);
      top += 170;
    }
  }

  appendStartButton() {
    this.startButton = document.createElement('div');

    this.startButton.style.lineHeight = 50 + 'px';
    this.startButton.style.width = 200 + 'px';
    this.startButton.style.backgroundColor = '#d5d5d5';
    this.startButton.style.position = 'absolute';
    this.startButton.style.top = 520 + 'px';
    this.startButton.style.left = 400 + 'px';
    this.startButton.style.borderRadius = 10 + 'px';
    this.startButton.innerHTML = 'BEGIN GAME';
    this.startButton.style.textAlign = 'center';
    this.startButton.style.boxShadow = '0px 0px 10px black';

    this.gameConfigElement.appendChild(this.startButton);

    this.startButton.onmouseover = () => {
      this.startButton.style.backgroundColor = 'green';
      this.startButton.style.cursor = 'pointer';
    }
    this.startButton.onmouseout = () => {
      this.startButton.style.backgroundColor = '#d5d5d5';
    }

    this.startButton.onclick = () => {
      this.appElement.removeChild(this.gameConfigElement);
      this.appElement.appendChild(new GameContainer(width, height, this.currentLevelMap, this.selectedLevel, this.selectedPlayerConfig, this.selectedEnemyConfig, this.appElement).init());
    }
  }

  setMapData(mapData) {
    let returnValue = [];
    this.maps = Object.entries(mapData);
    for (let i = 0; i < this.maps.length; i++) {
      for (let j = 0; j < this.maps[i].length; j++) {
        if (j === 1) {
          returnValue.push(this.maps[i][j]);
        }
      }
    }
    this.maps = returnValue;
    this.currentLevelMap = this.maps[this.selectedLevel - 1];
    this.appendLevelSelector();
    this.appendPlayerSelector();
    this.appendStartButton();
  }
}