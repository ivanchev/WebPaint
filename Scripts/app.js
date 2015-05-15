requirejs.config({
    baseUrl: "scripts"
})

define(["fileIO", "filters", 'cache/cache'], function (FileIO, Filters, Cache) {
    // App logic

    //#region Helpers

    function applyFilter(command) {
        Filters[command](canvas);
        Cache.store();
    }

    function initCache() {
        Cache.init(canvas);
    }

    //#endregion


    //#region File IO

    loadFile.onchange = function () {
        FileIO.loadFile(this, canvas, initCache);
    };

    //#endregion

    //#region Filters

    invertButton.onclick = function () {
        applyFilter("invert");
    };

    grayscaleButton.onclick = function () {
        applyFilter("grayscale");
    };

    //#endregion


    //#region Cache

    undoButton.onclick = function () {
        Cache.undo();
    };

    redoButton.onclick = function () {
        Cache.redo();
    };

    resetButton.onclick = function () {
        Cache.reset();
    };

    //#endregion

});
