window.onload = function() {
    var apps = document.getElementsByClassName('app');

    var height = 600;
    var width = 400;

    for (var i = 0; i < apps.length; i++) {
        apps.item(i).appendChild(new GameContainer(height, width, apps).init());
    }
}