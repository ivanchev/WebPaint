requirejs.config({
    baseUrl: "scripts"
})

define(["fileIO", "filters", 'cache/cache', 'zoom'], function (FileIO, Filters, Cache, Zoom) {
    // App logic

    //#region Helpers

    function applyFilter(command) {
        Filters[command](canvas);
        Cache.store();
    }

    function init() {
        Cache.init(canvas);

        Zoom.init(canvas, zoomChanged);
    }

    function zoomChanged(zoomLevel) {
        zoomList.children[1].textContent = zoomLevel + "%";
    }

    //#endregion


    //#region File IO

    loadFile.onchange = function () {
        FileIO.loadFile(this, canvas, init);
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

    //#region Zoom

    zoomOutButton.onclick = function() {
        Zoom.stepZoom(-1);
    };

    zoomInButton.onclick = function() {
        Zoom.stepZoom(1);
    };

    zoomFitButton.onclick = function() {
        Zoom.fitZoom();
    };

    //#endregion

    init();

});
