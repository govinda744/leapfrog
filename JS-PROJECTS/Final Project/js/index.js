window.onload = function() {
    let apps = this.document.getElementsByClassName('app');

    height = 600;
    width = 1000;

    for(let i = 0; i < apps.length; i++) {
        apps.item(i).appendChild(new Start(width, height, apps.item(i)).init());
        // apps.item(i).appendChild(new EndScreen(this.width, this.height, apps.item(i)).init());
    }
}