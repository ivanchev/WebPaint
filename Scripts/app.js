requirejs.config({
    baseUrl: "scripts"
})

define(["fileIO"], function (FileIO) {
    // App logic

    loadFile.onchange = function () {
        FileIO.loadFile(this, canvas);
    };

});
