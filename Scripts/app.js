requirejs.config({
    baseUrl: "scripts"
})

define(["fileIO", "filters"], function (FileIO, Filters) {
    // App logic

    function applyFilter(command) {
        Filters[command](canvas);
    }

    loadFile.onchange = function () {
        FileIO.loadFile(this, canvas);
    };

    invertButton.onclick = function () {
        applyFilter("invert");
    };

    grayscaleButton.onclick = function () {
        applyFilter("grayscale");
    };

});
