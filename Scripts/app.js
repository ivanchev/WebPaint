requirejs.config({
    baseUrl: "scripts"
})

define(["fileIO", "filters", "transforms", 'cache/cache', 'zoom'], function (FileIO, Filters, Transforms, Cache, Zoom) {
    // App logic

    //#region Helpers

    function applyFilter(command) {
        Filters[command](canvas);
        Cache.store();
    }
    
    function applyTransform(command) {
        Transforms[command](canvas);
        Zoom.refreshZoomWrap();
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

    //#region Transforms
    
    flipHorizontalButton.onclick = function() {
        applyTransform("flipHorizontal");
    };

    flipVerticalButton.onclick = function() {
        applyTransform("flipVertical");
    };
    
    rotate90Button.onclick = function() {
        applyTransform("rotate90");
    };

    rotate180Button.onclick = function() {
        applyTransform("rotate180");
    };

    rotate270Button.onclick = function() {
        applyTransform("rotate270");
    };

    //#endregion


    //#region Cache

    undoButton.onclick = function () {
        Cache.undo();
        Zoom.refreshZoomWrap();
    };

    redoButton.onclick = function () {
        Cache.redo();
        Zoom.refreshZoomWrap();
    };

    resetButton.onclick = function () {
        Cache.reset();
        Zoom.refreshZoomWrap();
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
