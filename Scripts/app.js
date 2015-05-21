requirejs.config({
    baseUrl: "scripts"
})

define(["fileIO", "filters", "transforms", 'cache/cache', 'zoom', 'crop', 'colors', 'slider'], function (
    FileIO, Filters, Transforms, Cache, Zoom, Crop, Color, Slider) {
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

    function applyColor(command) {
        Slider.hide();

        Slider.show(canvas, function(x, imageData) {
            Color[command](canvas, imageData, x);
        }, function() {
            Cache.store();
        });
    }

    function init() {
        Slider.hide();

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
        Slider.hide();
        Cache.undo();
        Zoom.refreshZoomWrap();
    };

    redoButton.onclick = function () {
        Slider.hide();
        Cache.redo();
        Zoom.refreshZoomWrap();
    };

    resetButton.onclick = function () {
        Slider.hide();
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

    //#region Color

    brightnessButton.onclick = function() {
        applyColor("brightness");
    };
    
    contrastButton.onclick = function() {
        applyColor("contrast");
    };

    hueButton.onclick = function() {
        applyColor("hue");
    };

    //#endregion

    //#region Toolbar

    function changePanel(panel) {
        $(".buttonsListSecondary").hide();

        Slider.hide();

        $(panel).show();
    }

    transformButton.onclick = function() {
        changePanel(transformList);
    };

    filterButton.onclick = function() {
        changePanel(filterList);
    };

    colorButton.onclick = function() {
        changePanel(colorList);
    };

    cropButton.onclick = function() {
        $(".buttonsListSecondary").hide();

        Zoom.fitZoom();

        Crop.crop(canvas, Zoom.getZoomLevel(), function okCallback() {
            Zoom.refreshZoomWrap();

            Cache.store();
        }, function cancelCallback() {

        });
    };

    //#endregion

    init();

});
