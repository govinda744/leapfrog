window.onload = function() {
    var apps = document.getElementsByClassName('app');

    for (var i = 0; i < apps.length; i++) {
        apps.item(i).appendChild(new AnimationContainer(apps.item(i)).init());
    }
}