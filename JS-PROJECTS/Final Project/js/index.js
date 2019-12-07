window.onload = function() {
    let apps = this.document.getElementsByClassName('app');

    height = 600;
    width = 1000;

    for(let i = 0; i < apps.length; i++) {
        apps.item(i).appendChild(new GameContainer(width, height, apps.item(i)).init());
    }
}