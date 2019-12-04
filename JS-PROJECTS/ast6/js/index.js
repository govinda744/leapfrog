window.onload = function() {
    var apps = document.getElementsByClassName('app');

    var height = 300;
    var width = 600;

    for (var i = 0; i < apps.length; i++) {
        apps.item(i).appendChild(new AnimationContainer(height, width, apps.item(i)).init());
    }
}